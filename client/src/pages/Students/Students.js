import React, {useEffect, useState} from 'react';
import {fetchSchedules} from "../../http/scheduleAPI";
import ButtonList from "../../components/ButtonList";
import "../../css/page_styles/Students.css";

const Students = () => {
    const [allSchedules, setAllSchedules] = useState([]);
    const forms = ["Очно - заочная форма обучения", "Зачётно - экзаменационная сессия студентов очно - заочной формы обучения", "Курсы дополнительно профессионального образования", "Заочная форма обучения"];

    useEffect(() => {
        fetchSchedules().then(data => {
                setAllSchedules(data.rows);
                console.log(data);
            }
        )
    }, []);


    return (
        <div>
            <p className="content_title">Студентам</p>
            <div className="schedule_container">
                <p className="local_title">Расписание занятий</p>
                <ButtonList buttonList={forms}/>
                <div className="schedules">
                {allSchedules && allSchedules.map(schedule =>
                    <a href={process.env.REACT_APP_API_URL + schedule.fileLink}
                       download target="_blank">
                        <div>
                            <img className="document_icon" src={"../assets/document_icon.png"}
                                 alt="Чет не пошло как-то с картинкой..."/>
                            <div>
                                {/*<p>{schedule.name}</p>*/}
                                <p className="group">{schedule.group}</p>
                                <p>расписание занятий</p>
                            </div>
                        </div>
                        <p className="updated_at">Изменено: {new Date(schedule.updatedAt).toLocaleDateString()+" "+new Date(schedule.updatedAt).toLocaleTimeString().match(/\d+:\d+/)[0]}</p>
                    </a>
                )}
                </div>
            </div>
        </div>
    );
};

export default Students;