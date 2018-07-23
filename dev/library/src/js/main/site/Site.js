/*
    :: Site Specific javascript modules
*/
import { Test } from './Test';

export class Site {

    static main() {
        const test = new Test();
        test.test('Boilerplate');
    }

}
