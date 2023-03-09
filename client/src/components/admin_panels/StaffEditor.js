import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import CreateStaff from "./CreateStaff";
import {fetchStaff} from "../../http/staffAPI";


const StaffEditor = observer(() => {
    const {staff_store} = useContext(Context);
    const [chosenStaffer, setChosenStaffer] = useState({});

    useEffect(() => {
        fetchStaff().then(data => {
                staff_store.setStaff(data.rows)
                staff_store.setTotalCount(data.count)
            })
    }, []);

    useEffect(() => {
        setChosenStaffer(Array.from(staff_store.staff.filter(staffer => staffer.id === staff_store.selectedStaffer))[0])
        // console.log(staff_store.staff.filter(staffer => staffer.id === staff_store.selectedStaffer))
    }, [staff_store.selectedStaffer]);

    useEffect(() => {
     console.log(chosenStaffer)   
    }, [chosenStaffer]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenStaffer ? chosenStaffer.name : "Выберите сотрудника, данные которого вы хотите изменить"} onChange={e => {
                staff_store.setSelectedStaffer(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="">Выберите сотрудника, данные которого вы хотите изменить</option>
                {staff_store.staff.map(staffer => (
                    <option key={staffer.id} value={staffer.id}>{staffer.name}</option>
                ))}
            </select>

            {chosenStaffer &&
                <CreateStaff staffer={chosenStaffer} mode="edit"/>
            }
        </div>
    );
});


export default StaffEditor;