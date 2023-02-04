import {makeAutoObservable} from "mobx";


export default class BlockStore {
    constructor() {
        this._blocks = []
        this._lines = []

        makeAutoObservable(this)
    }


    setBlocks(blocks) {
        this._blocks = blocks
    }

    setLines(lines) {
        this._lines = lines
    }


    get blocks() {
        return this._blocks
    }

    get lines() {
        return this._lines
    }

}