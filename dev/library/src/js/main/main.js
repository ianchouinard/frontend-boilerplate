import { Site } from './site/Site';

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
