/*
    :: Core ST Front End boilerplate Javascript Build
*/
import { TextSizeChanger } from './TextSizeChanger';

export class StCore {

    static main(options) {
        if (options.initialize.TextResizer) {
            TextSizeChanger.main();
        }
    }

}
