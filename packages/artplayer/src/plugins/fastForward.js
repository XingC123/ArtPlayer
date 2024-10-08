import { hasClass, addClass, removeClass } from '../utils';

export default function fastForward(art) {
    const {
        constructor,
        proxy,
        template: { $player, $video },
    } = art;

    let timer = null;
    let isPress = false;
    let lastPlaybackRate = 1;

    const onStart = (event) => {
        if (event.touches.length === 1 && art.playing && !art.isLock) {
            timer = setTimeout(() => {
                let curTime = Date.now();
                let timeDiff = curTime - art.lastSwipeTime;
                if (timeDiff < constructor.FAST_FORWARD_TIME) {
                    return
                }

                isPress = true;
                lastPlaybackRate = art.playbackRate;
                art.playbackRate = constructor.FAST_FORWARD_VALUE;
                art.isFastForwarding = true;
                addClass($player, 'art-fast-forward');
            }, constructor.FAST_FORWARD_TIME);
        }
    };

    const onStop = () => {
        clearTimeout(timer);
        if (isPress) {
            isPress = false;
            art.playbackRate = lastPlaybackRate;
            art.isFastForwarding = false;
            removeClass($player, 'art-fast-forward');
        }
    };

    proxy($video, 'touchstart', onStart);
    // proxy(document, 'touchmove', onStop);
    proxy(document, 'touchend', onStop);

    return {
        name: 'fastForward',
        get state() {
            return hasClass($player, 'art-fast-forward');
        },
    };
}
