import { throttle } from '../utils';

export default function resizeInit(art, events) {
    const { option, player } = art;

    const resizeFn = throttle(() => {
        if (player.normal) {
            player.autoSize = option.autoSize;
        }
        player.aspectRatioReset = true;
        art.emit('resize', {
            width: player.width,
            height: player.height,
        });
    }, 500);

    events.proxy(window, ['orientationchange', 'resize'], () => {
        resizeFn();
    });
}
