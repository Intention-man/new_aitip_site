// Окно для добавления выборов и конкурсов и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {createElectionsAndContests} from "../../http/electionsAndContestsAPI";


const CreateElectionOrContest = observer(({show, onHide}) => {

    const [name, setName] = useState( "")
    const [kind, setKind] = useState("Выборы");
    const [applicationsAcceptanceDateStart, setApplicationsAcceptanceDateStart] = useState("");
    const [applicationsAcceptanceDateEnd, setApplicationsAcceptanceDateEnd] = useState("");
    const [applicationsAcceptancePlace, setApplicationsAcceptancePlace] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventPlace, setEventPlace] = useState("");


    const addElectionOrContest = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("applicationsAcceptanceDateStart", applicationsAcceptanceDateStart)
        formData.append("applicationsAcceptanceDateEnd", applicationsAcceptanceDateEnd)
        formData.append("applicationsAcceptancePlace", applicationsAcceptancePlace)
        formData.append("eventDate", eventDate)
        formData.append("eventTime", eventTime)
        formData.append("eventPlace", eventPlace)
        createElectionsAndContests(formData).then(() => onHide())
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
                        <label className="mini-info" htmlFor="applicationsAcceptancePlace">Место приема заялвний</label>
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
                            addElectionOrContest()
                        }}>
                            Добавить выборы/конкурс
                        </Button>
                        <Button className="buttom-close" variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>

                </div>
    );
});

export default CreateElectionOrContest;
