import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchElectionsAndContests} from "../../http/electionsAndContestsAPI";
import CreateElectionOrContest from "./CreateElectionOrContest";


const ElectionsAndContestsEditor = observer(() => {
    const [electionsAndContests, setElectionsAndContests] = useState([]);
    const [chosenEAC, setChosenEAC] = useState({});


    useEffect(() => {
        fetchElectionsAndContests().then(data => {
            setElectionsAndContests(data.rows)
        })
    }, [])

    useEffect(() => {
        console.log(chosenEAC)
    }, [chosenEAC]);




    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenEAC ? chosenEAC.name : "Выберите выборы или конкурс, данные которого вы хотите изменить"} onChange={e => {
                setChosenEAC(Array.from(electionsAndContests.filter(event => event.id === Number(e.target.value)))[0])
                console.log(e.target.value)
            }}>
                <option value="">Выберите выборы или конкурс, данные которого вы хотите изменить</option>
                {electionsAndContests.map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                ))}
            </select>
            {chosenEAC && chosenEAC.hasOwnProperty("name")  &&
                <CreateElectionOrContest eAC={chosenEAC} mode="edit"/>
            }
        </div>
    );
});


export default ElectionsAndContestsEditor;