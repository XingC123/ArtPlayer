import { errorHandle } from './utils';

export default class Hotkey {
    constructor(art) {
        this.keys = {};

        const {
            option,
            player,
            events: { proxy },
        } = art;

        if (option.hotkey) {
            art.once('ready', () => {
                this.add(27, () => {
                    if (art.fullscreenWeb) {
                        art.fullscreenWeb = false;
                    }
                });

                this.add(32, () => {
                    art.toggle();
                });

                this.add(37, () => {
                    art.backward = 5;
                });

                this.add(38, () => {
                    art.volume += 0.1;
                });

                this.add(39, () => {
                    art.forward = 5;
                });

                this.add(40, () => {
                    art.volume -= 0.1;
                });

                proxy(window, 'keydown', (event) => {
                    if (art.isFocus) {
                        const tag = document.activeElement.tagName.toUpperCase();
                        const editable = document.activeElement.getAttribute('contenteditable');
                        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                            const events = this.keys[event.keyCode];
                            if (events) {
                                event.preventDefault();
                                events.forEach((fn) => fn.call(art, event));
                                art.emit('hotkey', event);
                            }
                        }
                    }
                });
            });
        }
    }

    add(key, event) {
        errorHandle(typeof key === 'number', 'The Hotkey.add() first parameter is not a number');
        errorHandle(typeof event === 'function', 'The Hotkey.add() second parameter is not a function');
        if (this.keys[key]) {
            this.keys[key].push(event);
        } else {
            this.keys[key] = [event];
        }
        return this;
    }
}
