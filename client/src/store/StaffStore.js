import {makeAutoObservable} from "mobx";

export default class StaffStore {
    constructor() {
        this._staff = []
            // {id: 2, name: "Самсонов", post: "Директор", img: "aitip_logo.png"},
            // {id: 3, name: "Ковалева", post: "Главный бухгалтер", img: "aitip_logo.png"},
            // {id: 4, name: "Самсонов", post: "Директор", img: "aitip_logo.png"},
            // {id: 5, name: "Ковалева", post: "Главный бухгалтер", img: "aitip_logo.png"},
            // {id: 6, name: "Самсонов", post: "Директор", img: "aitip_logo.png"},
            // {id: 7, name: "Ковалева", post: "Главный бухгалтер", img: "aitip_logo.png"}
        this._selectedStaffer = ""

        this._page = 1
        this._totalCount = 0
        this._limit = 10

        makeAutoObservable(this)
    }

    setStaff(staff) {
        this._staff = staff
    }

    setSelectedStaffer(selectedStaffer) {
        this._selectedStaffer = selectedStaffer
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    get staff() {
        return this._staff
    }

    get selectedStaffer() {
        return this._selectedStaffer
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}