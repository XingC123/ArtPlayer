import { clamp, secondToTime, isMobile } from '../utils';
import { setCurrentTime } from '../control/progress';

function GetSlideAngle(dx, dy) {
    return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}

export default function gestureInit(art, events) {
    if (isMobile && !art.option.isLive) {
        const { $video, $progress } = art.template;

        let touchTarget = null;
        let isDroging = false;
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        let startVolume = 0;

        const onTouchStart = (event) => {
            if (event.touches.length === 1 && !art.isLock && !art.isFastForwarding) {
                if (touchTarget === $progress) {
                    setCurrentTime(art, event);
                }

                isDroging = true;
                const { pageX, pageY } = event.touches[0];
                startX = pageX;
                startY = pageY;
                startTime = art.currentTime;
                startVolume = art.volume;
            }
        };

        const onTouchMove = (event) => {
            if (event.touches.length === 1 && isDroging && art.duration && !art.isFastForwarding) {
                const { pageX, pageY } = event.touches[0];
                const direction = GetSlideDirection(startX, startY, pageX, pageY);
                const isHorizontal = [3, 4].includes(direction);
                const isVertical = [1, 2].includes(direction);
                const isLegal = (isHorizontal && !art.isRotate) || (isVertical && art.isRotate);
                const isLegalVolumeAction = /*isHorizontal && art.isRotate ||*/ isVertical && !art.isRotate;
                if (isLegal || isLegalVolumeAction) {
                    const ratioX = (0, _utils.clamp)((pageX - startX) / art.width, -1, 1);
                    const ratioY = (0, _utils.clamp)((pageY - startY) / art.height, -1, 1);

                    if (isLegal) {
                        const ratio = art.isRotate ? ratioY : ratioX;
                        const TOUCH_MOVE_RATIO = touchTarget === $video ? art.constructor.TOUCH_MOVE_RATIO : 1;
                        const currentTime = (0, _utils.clamp)(startTime + art.duration * ratio * TOUCH_MOVE_RATIO, 0, art.duration);
                        art.seek = currentTime;
                        art.emit("setBar", "played", (0, _utils.clamp)(currentTime / art.duration, 0, 1), event);
                        art.notice.show = `${(0, _utils.secondToTime)(currentTime)} / ${(0, _utils.secondToTime)(art.duration)}`;
                    } else {
                        const ratio = art.isRotate ? ratioX : ratioY;
                        const compensationRatio = 1.2;
                        const currentVolume = (0, _utils.clamp)(startVolume - 1 * ratio * compensationRatio, 0, 1);
                        art.volume = currentVolume;
                        art.notice.show = `音量: ${(currentVolume * 100) >> 0}%`;
                    }
                }
            }
        };

        const onTouchEnd = () => {
            if (isDroging) {
                startX = 0;
                startY = 0;
                startTime = 0;
                isDroging = false;
                touchTarget = null;
            }
        };

        events.proxy($progress, 'touchstart', (event) => {
            touchTarget = $progress;
            onTouchStart(event);
        });

        events.proxy($video, 'touchstart', (event) => {
            touchTarget = $video;
            onTouchStart(event);
        });

        events.proxy($video, 'touchmove', onTouchMove);
        events.proxy($progress, 'touchmove', onTouchMove);
        events.proxy(document, 'touchend', onTouchEnd);
    }
}
