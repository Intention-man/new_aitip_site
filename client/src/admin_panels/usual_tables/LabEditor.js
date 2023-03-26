import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {fetchLabs} from "../../http/labAPI";
import CreateLab from "./CreateLab";


const LabEditor = observer(() => {
    const [labs, setLabs] = useState([]);
    const [chosenLab, setChosenLab] = useState({});
    const [labId, setLabId] = useState(0);

    useEffect(() => {
        fetchLabs().then(data => {
            setLabs(data.rows)
        })
    }, []);

    useEffect(() => {
        setChosenLab(Array.from(labs.filter(lab => lab.id === labId))[0])
    }, [labId]);

    useEffect(() => {
        console.log(chosenLab)
    }, [chosenLab]);


    return (
        <div>
            {/*Выбор лаборатории*/}
            <select value={chosenLab ? chosenLab.name : "Выберите партнера, данные которого вы хотите изменить"} onChange={e => {
                setLabId(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="">Выберите лабораторию, данные о которой вы хотите изменить</option>
                {labs.map(lab => (
                    <option key={lab.id} value={lab.id}>{lab.name}</option>
                ))}
            </select>

            {chosenLab && chosenLab.hasOwnProperty("name")  &&
                <CreateLab lab={chosenLab} mode="edit"/>
            }
        </div>
    );
});


export default LabEditor;