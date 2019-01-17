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
