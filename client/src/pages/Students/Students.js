import React, {useEffect, useState} from 'react';
import {fetchSchedules} from "../../http/scheduleAPI";
import ButtonList from "../../components/ButtonList";
import "../../css/page_styles/Students.css";
import {fetchLabs} from "../../http/labAPI";
import Card from "../../components/lines/Card";
import Carusel from "../../components/lines/Carusel";

const Students = () => {
    const [allSchedules, setAllSchedules] = useState([]);
    const [allLabs, setAllLabs] = useState([]);
    const [choosenLabName, setChoosenLabName] = useState({});
    const [choosenLab, setChoosenLab] = useState({});
    const forms = ["Бакалавриат", "Профессиональная переподготовка", "Курсы дополнительно профессионального образования"];

    useEffect(() => {
        fetchSchedules().then(data => {
                setAllSchedules(data.rows);
                console.log(data);
            }
        )
        fetchLabs().then(data => {
            setAllLabs(data.rows);
            console.log(data);
        })
    }, []);

    useEffect(() => {
        if(choosenLabName)
            setChoosenLab(allLabs[allLabs.findIndex(e => e.name === choosenLabName)])
    }, [choosenLabName])


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

            <div className="labs_container">
                <p className="local_title">Лаборатории</p>
                <p className="labs_comment">Образовательная, научно-исследовательская и практико-ориентированная профессиональная
                    деятельность в Алтайском институте труда и права также осуществляется на базе нескольких
                    лабораторий.</p>
                <ButtonList buttonList={allLabs.map(e => e.name)} setChosenValue={setChoosenLabName}/>
                {choosenLab && <Card imgSrc={process.env.REACT_APP_API_URL + choosenLab.cover} >
                    <p className="local_title">{choosenLab.name}</p>
                    <p>{choosenLab.text1}</p>
                </Card>}
                {choosenLab && <div className="supervisor">
                    <div>
                        {choosenLab.supervisor_name &&
                            <p style={{color: "#076db1", fontWeight: "bold"}}>Научный руководитель программы:</p>}
                        {choosenLab.supervisor_name &&
                            <p className="supervisor_name">{choosenLab.supervisor_name}</p>}
                        {choosenLab.supervisor_description &&
                            <p className="supervisor_description">{choosenLab.supervisor_description}</p>}
                    </div>
                    {choosenLab.supervisor_photo &&
                        <img width="300" height="300" src={process.env.REACT_APP_API_URL + choosenLab.supervisor_photo} alt="Чет не пошло как-то с картинкой..."/>}
                </div>}
                {choosenLab && <><p className="labs_comment">{choosenLab.text2}</p>
                <Carusel photos={choosenLab.carousel_photos_links} addressFileType="local"/>
                <p className="labs_comment" style={{paddingBottom: "30px"}}>{choosenLab.text3}</p></>}
            </div>
        </div>
    );
};

export default Students;