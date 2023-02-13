import {makeAutoObservable} from "mobx";


export default class BlockStore {
    constructor() {
        this._blocks = []
        this._selectedBlocks = []
        this._lines = []

        makeAutoObservable(this)
    }


    setBlocks(blocks) {
        this._blocks = blocks
    }

    setSelectedBlocks(selectedBlocks) {
        this._selectedBlocks = selectedBlocks
    }

    setLines(lines) {
        this._lines = lines
    }


    get blocks() {
        return this._blocks
    }

    get selectedBlocks() {
        return this._selectedBlocks
    }

    get lines() {
        return this._lines
    }

}