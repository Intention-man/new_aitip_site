// Окно для добавления выборов и конкурсов и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {
    createElectionsAndContests,
    removeElectionsAndContests,
    updateElectionsAndContests
} from "../../http/electionsAndContestsAPI";
import "../../css/page_styles/AdminPanel.css"
import {useEffect} from "react";
import {updateFileUsages} from "../commonPanelsFunctions";
import {removePartner} from "../../http/partnersAPI";


const CreateElectionOrContest = observer(({eAC, mode}) => {
    const isEmpty = eAC.hasOwnProperty("fakeParam");

    const [name, setName] = useState( isEmpty ? "" : eAC.name)
    const [kind, setKind] = useState(isEmpty ? "" : eAC.kind);
    const [applicationsAcceptanceDateStart, setApplicationsAcceptanceDateStart] = useState(isEmpty ? "" : eAC.applicationsAcceptanceDateStart);
    const [applicationsAcceptanceDateEnd, setApplicationsAcceptanceDateEnd] = useState(isEmpty ? "" : eAC.applicationsAcceptanceDateEnd);
    const [applicationsAcceptancePlace, setApplicationsAcceptancePlace] = useState(isEmpty ? "" : eAC.applicationsAcceptancePlace);
    const [eventDate, setEventDate] = useState(isEmpty ? "" : eAC.eventDate);
    const [eventTime, setEventTime] = useState(isEmpty ? "" : eAC.eventTime);
    const [eventPlace, setEventPlace] = useState(isEmpty ? "" : eAC.eventPlace);


    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('kind').value = kind
            document.getElementById('applicationsAcceptanceDateStart').value = applicationsAcceptanceDateStart.substring(0, 10)
            document.getElementById('applicationsAcceptanceDateEnd').value = applicationsAcceptanceDateEnd.substring(0, 10)
            document.getElementById('applicationsAcceptancePlace').value = applicationsAcceptancePlace
            document.getElementById('eventDate').value = eventDate.substring(0, 10)
            document.getElementById('eventTime').value = eventTime
            document.getElementById('eventPlace').value = eventPlace
        }
    }, [])


    const saveElectionOrContest = () => {
        console.log(typeof applicationsAcceptanceDateStart)
        const formData = new FormData()
        eAC.id && formData.append("id", eAC.id)
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("applicationsAcceptanceDateStart", applicationsAcceptanceDateStart)
        formData.append("applicationsAcceptanceDateEnd", applicationsAcceptanceDateEnd)
        formData.append("applicationsAcceptancePlace", applicationsAcceptancePlace)
        formData.append("eventDate", eventDate)
        formData.append("eventTime", eventTime)
        formData.append("eventPlace", eventPlace);
        mode === "edit" ? updateElectionsAndContests(formData).then(() => alert("Успешно обновлено")) : createElectionsAndContests(formData).then(() => alert("Успешно добавлено"))
    }

    return (

                <div>
                    <div>
                        <label htmlFor="name" className="mini-info">Название/описание</label>
                        <textarea className="big-info" id="name"
                                  onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="kind">Тип</label>
                        <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                            <option id="Выборы">Выборы</option>
                            <option id="Конкурс">Конкурс</option>
                        </select>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="applicationsAcceptanceDateStart">Дата начала приема завлений</label>
                        <input type="date" id="applicationsAcceptanceDateStart" onChange={e => setApplicationsAcceptanceDateStart(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="applicationsAcceptanceDateEnd">Дата окончания приема завлений</label>
                        <input type="date" id="applicationsAcceptanceDateEnd" onChange={e => setApplicationsAcceptanceDateEnd(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="applicationsAcceptancePlace">Место приема заявлений</label>
                        <input type="text" id="applicationsAcceptancePlace" onChange={e => setApplicationsAcceptancePlace(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="eventDate">Дата проведения выборов/конкурса</label>
                        <input className="mini-info" type="date" id="eventDate" onChange={e => setEventDate(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="eventTime">Время проведения выборов/конкурса</label>
                        <input className="mini-info" type="time" id="eventTime" onChange={e => setEventTime(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="eventPlace">Место проведения выборов/конкурса</label>
                        <input type="text" id="eventPlace" onChange={e => setEventPlace(e.target.value)}/>
                    </div>

                        <Button className="buttom-add" variant="outline-success" onClick={() => {
                            saveElectionOrContest()
                        }}>
                            Сохранить выборы/конкурс
                        </Button>
                    <Button className="buttom-close" variant="outline-warning" onClick={() => window.location.reload()}>
                        Выйти без сохранения
                    </Button>
                    {mode === "edit" &&
                        <Button className="buttom-close" variant="outline-danger"
                                onClick={() => {

                                    removeElectionsAndContests(eAC.id).then(() => alert("Успешно удалено"))
                                }}>
                            Удалить выборы или конкурс
                        </Button>
                    }


                </div>
    );
});

export default CreateElectionOrContest;
