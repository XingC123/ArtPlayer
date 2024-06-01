import screenfull from '../libs/screenfull';
import { addClass, removeClass, def, get } from '../utils';

export default function fullscreenMix(art) {
    const {
        i18n,
        notice,
        template: { $video, $player },
    } = art;

    const nativeScreenfull = (art) => {
        screenfull.on('change', () => {
            art.emit('fullscreen', screenfull.isFullscreen);
        });

        screenfull.on('error', (event) => {
            art.emit('fullscreenError', event);
        });

        def(art, 'fullscreen', {
            get() {
                return screenfull.isFullscreen;
            },
            async set(value) {
                if (value) {
                    art.state = 'fullscreen';
                    await screenfull.request($player);
                    addClass($player, 'art-fullscreen');
                } else {
                    await screenfull.exit();
                    removeClass($player, 'art-fullscreen');
                }
                art.emit('resize');
            },
        });
    };

    const webkitScreenfull = (art) => {
        art.proxy(document, 'webkitfullscreenchange', () => {
            art.emit('fullscreen', art.fullscreen);
            art.emit('resize');
        });

        def(art, 'fullscreen', {
            get() {
                return document.fullscreenElement === $video;
            },
            set(value) {
                if (value) {
                    art.state = 'fullscreen';
                    $video.webkitEnterFullscreen();
                } else {
                    $video.webkitExitFullscreen();
                }
            },
        });
    };

    art.once('video:loadedmetadata', () => {
        if (screenfull.isEnabled) {
            nativeScreenfull(art);
        } else if ($video.webkitSupportsFullscreen) {
            webkitScreenfull(art);
        } else {
            def(art, 'fullscreen', {
                get() {
                    return false;
                },
                set() {
                    notice.show = i18n.get('Fullscreen Not Supported');
                },
            });
        }

        // Asynchronous setting
        def(art, 'fullscreen', get(art, 'fullscreen'));
    });
}
