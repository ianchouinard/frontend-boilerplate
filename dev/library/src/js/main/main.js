import { StCore } from './core/Core';
import { Site } from './site/Site';

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
