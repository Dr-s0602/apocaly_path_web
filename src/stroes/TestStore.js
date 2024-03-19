/* maskAutoObservable 사용 스토어 */
import {makeAutoObservable} from "mobx";

class TestStore{
    testNum = 0;

    constructor() {
        makeAutoObservable(this);
    }

    addNum(){
        this.testNum ++
    }
    decNum(){
        this.testNum--
    }
}

const testStore = new TestStore();

export default testStore;