import {makeAutoObservable} from "mobx";

export default class AdmissionStore {
    constructor() {

        this._directionsBachelor = []
        this._selectedDirectionBachelor = -1
        this._additionalPrograms = [
            // {
            //     id: 1,
            //     name: "Оценка стоимости предприятия (бизнеса)",
            //     price: 50000,
            //     supervisor: "Самсонов Р.А."
            // },
            // {
            //     id: 2,
            //     name: "Менеджмент в кадровой сфере",
            //     price: 45000,
            //     supervisor: "Петров А.И."
            // }
        ]
        this._selectedRetrainingProgram = 0
        this._selectedDevelopmentProgram = 0
        this.setSelectedDirectionBachelor = this.setSelectedDirectionBachelor.bind(this)

        makeAutoObservable(this)
    }

    setDirectionsBachelor(directionsBachelor) {
        this._directionsBachelor = directionsBachelor
    }

    setSelectedDirectionBachelor(selectedDirectionBachelor) {
        this._selectedDirectionBachelor = selectedDirectionBachelor
    }

    setAdditionalPrograms(additionalPrograms) {
        this._additionalPrograms = additionalPrograms
    }

    setSelectedRetrainingProgram(selectedRetrainingProgram) {
        this._selectedRetrainingProgram = selectedRetrainingProgram
    }

    setSelectedDevelopmentProgram(_selectedDevelopmentProgram) {
        this._selectedDevelopmentProgram = _selectedDevelopmentProgram
    }


    get directionsBachelor() {
        return this._directionsBachelor
    }

    get selectedDirectionBachelor() {
        return this._selectedDirectionBachelor
    }

    get additionalPrograms() {
        return this._additionalPrograms
    }

    get selectedRetrainingProgram() {
        return this._selectedRetrainingProgram
    }

    get selectedDevelopmentProgram() {
        return this._selectedDevelopmentProgram
    }

}