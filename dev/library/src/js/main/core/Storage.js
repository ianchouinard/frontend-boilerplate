
export class Storage {

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
