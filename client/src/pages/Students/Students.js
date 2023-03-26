import React, {useEffect, useState} from 'react';
import {fetchSchedules} from "../../http/scheduleAPI";

const Students = () => {
    const [allSchedules, setAllSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules().then(data =>
            setAllSchedules(data.rows)
        )
    }, []);


    return (
        <div>
            {allSchedules && allSchedules.map(schedule =>
                <div>
                    <p>{schedule.name}</p>
                    <p>Группа: {schedule.group}</p>
                    <a href={process.env.REACT_APP_API_URL + schedule.fileLink}
                       download target="_blank">Скачать документ</a>
                </div>
            )}
        </div>
    );
};

export default Students;