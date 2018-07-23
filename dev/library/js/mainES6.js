class Storage {

    /*
        :: Local Storage
    */
    static storeItem(key, val) {
        if (this.localStorageIsSupported()) {
            localStorage.setItem(key, val);
        }
    }

    static getItem(key) {
        if (this.localStorageIsSupported()) {
            return localStorage.getItem(key);
        }
    }

    /*
        :: Cookies
    */
    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        const expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /*
        :: Helpers
    */
    static localStorageIsSupported() {
        let testKey = 'test', storage = window.sessionStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

}

/*
    :: ADA Text Resizer
    --------------------
    The html gets a base font size of 62.5% to set a 1:10 font ratio
        EX: font-size: 20px; = font-size: 2rem;
    On increase or decrease, the html will get different classes

*/
const _storageKey = 'text_sizer_value';

class TextSizeChanger {

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

/*
    :: Core ST Front End boilerplate Javascript Build
*/
class StCore {

    static main(options) {
        if (options.initialize.TextResizer) {
            TextSizeChanger.main();
        }
    }

}

class Test {

    constructor() {
        this.tst = 'A test from: ';
    }

    test(sitename) {
        console.log(`${this.tst}${sitename}`);
    }

}

/*
    :: Site Specific javascript modules
*/
class Site {

    static main() {
        const test = new Test();
        test.test('Boilerplate');
    }

}

const MainScripts = (() => {

    /*
        :: Initialize core st boilerplate modules
    */
    StCore.main({
        initialize: {
            TextResizer: true
        }
    });
    /*
        :: Initialize website/project specific modules
    */
    Site.main();
    /*
        :: Initialize third party plugins
    */
    // SVG <use> polyfill for IE and Edge
    if (typeof svg4everybody == 'function') {
        svg4everybody();
    }

})();
