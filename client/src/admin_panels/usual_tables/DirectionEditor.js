import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchDirectionsBachelor, fetchOneDirectionBachelor} from "../../http/admissionAPI";
import CreateDirection from "./CreateDirection";


const StaffEditor = observer(() => {
    const {admission_store} = useContext(Context);
    const [chosenDirection, setChosenDirection] = useState({});

    useEffect(() => {
        fetchDirectionsBachelor().then(data => {
            admission_store.setDirectionsBachelor(data.rows)
        })
    }, []);

    useEffect(() => {
        fetchOneDirectionBachelor(admission_store.selectedDirectionBachelor).then(direction =>
            setChosenDirection(direction)
        )
    }, [admission_store.selectedDirectionBachelor]);

    useEffect(() => {
        console.log(chosenDirection)
    }, [chosenDirection]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenDirection ? chosenDirection.name : "Выберите направление, данные которого вы хотите изменить"} onChange={e => {
                admission_store.setSelectedDirectionBachelor(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="-1">Выберите направление, данные которого вы хотите изменить</option>
                {admission_store.directionsBachelor.map(direction => (
                    <option key={direction.id} value={direction.id}>{direction.name}</option>
                ))}
            </select>

            {chosenDirection && chosenDirection.hasOwnProperty("name")  &&
                <CreateDirection direction={chosenDirection} mode="edit"/>
            }
        </div>
    );
});


export default StaffEditor;