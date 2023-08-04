import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CreateSchedule from "./CreateSchedule";
import {fetchSchedules} from "../../http/scheduleAPI";


const ScheduleEditor = observer(() => {
    const [chosenSchedule, setChosenSchedule] = useState({});
    const [scheduleId, setScheduleId] = useState(0);
    const [allSchedules, setAllSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules().then(data => {
            setAllSchedules(data.rows)
        })
    }, []);

    useEffect(() => {
        setChosenSchedule(Array.from(allSchedules.filter(schedule => schedule.id === scheduleId))[0])
        // console.log(staff_store.staff.filter(staffer => staffer.id === staff_store.selectedStaffer))
    }, [scheduleId]);

    useEffect(() => {
        console.log(chosenSchedule)
    }, [chosenSchedule]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenSchedule ? chosenSchedule.name : "Выберите расписание, которое вы хотите изменить"} onChange={e => {
                setScheduleId(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="">Выберите расписание, данные которого вы хотите изменить</option>
                {allSchedules.map(schedule => (
                    <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
                ))}
            </select>

            {chosenSchedule &&
                <CreateSchedule schedule={chosenSchedule} mode="edit"/>
            }
        </div>
    );
});


export default ScheduleEditor;