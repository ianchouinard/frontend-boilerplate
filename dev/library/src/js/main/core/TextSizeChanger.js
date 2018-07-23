/*
    :: ADA Text Resizer
    --------------------
    The html gets a base font size of 62.5% to set a 1:10 font ratio
        EX: font-size: 20px; = font-size: 2rem;
    On increase or decrease, the html will get different classes

*/
import { Storage } from './Storage';
const _storageKey = 'text_sizer_value';

export class TextSizeChanger {

    static main() {
        $('.text-size-button.increase').on('click', (e) => {
            e.preventDefault();
            this.increaseFontSize();
        });
        $('.text-size-button.decrease').on('click', (e) => {
            e.preventDefault();
            this.decreaseFontSize();
        });

        this.getSetting();
    }

    static increaseFontSize() {
        const html = $(('html'));

        if(html.hasClass("text-large")) {
            html.removeClass("text-large");
            html.addClass("text-larger");
            this.saveSetting("text-larger");
        }
        else {
            if(html.hasClass("text-larger")) {
                html.removeClass("text-larger");
                html.addClass("text-largest");
                this.saveSetting("text-largest");
            }
            else {
                if(!html.hasClass("text-largest")) {
                    html.addClass("text-large");
                    this.saveSetting("text-large");
                }
            }
        }
    }

    static decreaseFontSize() {
        const html = $(('html'));

        if(html.hasClass("text-large")) {
            html.removeClass("text-large");
            localStorage.removeItem(_storageKey);
        }
        else {
            if(html.hasClass("text-larger")) {
                html.removeClass("text-larger");
                html.addClass("text-large");
                this.saveSetting("text-large");
            }
            else {
                if(html.hasClass("text-largest")) {
                    html.removeClass("text-largest");
                    html.addClass("text-larger");
                    this.saveSetting("text-larger");
                }
            }
        }
    }

    /*
        :: Helpers
    */
    static saveSetting(selector) {
        Storage.storeItem(_storageKey, selector);
    }

    static getSetting(key) {
        let stored = Storage.getItem(_storageKey);
        if (stored) {
            $(('html')).addClass(stored);
        }
    }

}
