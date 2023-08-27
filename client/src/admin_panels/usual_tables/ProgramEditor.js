import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchAdditionalPrograms} from "../../http/admissionAPI";
import CreateProgram from "./CreateProgram";


const ProgramEditor = observer(() => {
    const {admission_store} = useContext(Context);
    const [chosenProgram, setChosenProgram] = useState({});
    const [programId, setProgramId] = useState(0);

    useEffect(() => {
        fetchAdditionalPrograms().then(data => {
            admission_store.setAdditionalPrograms(data.rows)
        })
    }, []);

    useEffect(() => {
        setChosenProgram(Array.from(admission_store.additionalPrograms.filter(program => program.id === programId))[0])
    }, [programId]);

    useEffect(() => {
        console.log(chosenProgram)
    }, [chosenProgram]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenProgram ? chosenProgram.name : "Выберите направление, данные которого вы хотите изменить"} onChange={e => {
                setProgramId(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="">Выберите направление, данные которого вы хотите изменить</option>
                {admission_store.additionalPrograms.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                ))}
            </select>

            {chosenProgram && chosenProgram.hasOwnProperty("name")  &&
                <CreateProgram program={chosenProgram} mode="edit"/>
            }
        </div>
    );
});


export default ProgramEditor;