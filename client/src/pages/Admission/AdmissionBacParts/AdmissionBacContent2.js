import React, {useContext, useEffect, useMemo, useState} from 'react';
import Card from '../../../components/card/Card';
import "../../../css/page_styles/AdmissionBac.css"
import {fetchOneDirectionBachelor} from "../../../http/admissionAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const AdmissionBacContent2 = observer((props) => {
    const directions = ["Экономика", "Менеджмент", "Юриспруденция", "Государственное и муниципальное управление", "Туризм"]

    const specialties = ["директор и администратор предприятия",
        "консультант по управлению", "помощник руководителя", "менеджер по проекту",
        "менеджер по развитию", "бренд-менеджер", "инновационный менеджер",
        "менеджер интернет-проекта", "менеджер по качеству и персоналу"].sort((a, b) => a.length - b.length)

    const passing_points = [
        "Математика (27 баллов)",
        "Русский язык (36 баллов)",
        "Предмет по выбору поступающего: Обществознание (42 балла), Информатика и ИКТ (40 баллов), География (37 баллов), Иностранный язык (22 балла), История (32 балла)"]

    const costs = {"Очно-заочная": "48000", "Заочная": "47000"}

    const {admission_store} = useContext(Context)
    const [chosenDirection, setChosenDirection] = useState();


    useEffect(() => {
        fetchOneDirectionBachelor(admission_store.selectedDirections_bachelor).then(data => {
            setChosenDirection(data)
            console.log(typeof data, Object.keys(chosenDirection))
        })
    }, [admission_store.selectedDirections_bachelor])


    return (
        <Card
            width={12}
            imgPos="none"
            className="content2"
            ref={props.handleRef}
        >
            {/*<div> {admission_store.directions_bachelor.map((item) => (*/}
            {/*    <div>*/}
            {/*        {item.specialities}*/}
            {/*    </div>*/}
            {/*))} </div>*/}
            {/*<div>{admission_store.selectedDirections_bachelor}</div>*/}
            <h1 className="local_title">
                Выбери <span style={{color: "#076DB1"}}>направление</span>
            </h1>
            <ul className="tracks">
                {admission_store.directions_bachelor.map(d =>
                    <li key={d.id}>
                        <button
                            key={d.id}
                            onClick={() => {
                                admission_store.setSelectedDirections_bachelor(d.id)
                                console.log(d.id)
                            }}
                        >
                            {d.name}
                        </button>
                    </li>
                )}
            </ul>
            {chosenDirection ?
                <Card
                    width={12}
                    imgSrc={process.env.REACT_APP_API_URL + chosenDirection.img}
                    imgPos="right"
                    className="direction_inner_card"
                >
                    <h1>{chosenDirection.code} {chosenDirection.name}</h1>
                    <h3>Профиль: {chosenDirection.profile}</h3>
                    <p>{chosenDirection.profession_advantages}</p>
                </Card>
                :
                <div>Направление то выбрали?</div>
            }

            {chosenDirection ?
                <div className="direction_block">
                    <p className="extended_description">{chosenDirection.profession_description}</p>
                    <p className="title_who_can_you_become">Кем ты можешь стать:</p>
                    <ul className="specialties">
                        {Object.values(chosenDirection.specialities).map(el =>
                            <li className="specialty" key={el}>{el}</li>
                        )}
                    </ul>
                    <div className="points_and_2_documents">
                        <div className="passing_points" style={{borderColor: "#AD4820"}}>
                            <p className="local_title">
                                <span style={{color: "#AD4820"}}>Проходные баллы </span> 2021 года
                            </p>
                            <ol>
                                {passing_points.map(subject =>
                                    <li key={subject}>{subject} </li>)}
                            </ol>
                        </div>
                        <div className="passing_points" style={{borderColor: "#076DB1"}}>
                            <p className="local_title">
                                <span style={{color: "#076DB1"}}>Проходные баллы </span> 2021 года
                            </p>
                            <ol>
                                {passing_points.map(subject =>
                                    <li key={subject}>{subject} </li>)}
                            </ol>
                        </div>
                        <div className="_2_documents">
                            <div className="_1_of_first_2_documents">
                                <img className="document_icon" src={"../assets/document_icon.png"}/>
                                <p>Правила проведения вступительных испытаний</p>
                            </div>
                            <div className="_1_of_first_2_documents">
                                <img className="document_icon" src={"../assets/document_icon.png"}/>
                                <p>Расписание вступительных испытаний 2022</p>
                            </div>
                        </div>
                    </div>
                    <div className="cost_zone">
                        {
                            Object.keys(costs).map(form =>
                                <div className="cost" key={form}>
                                    <p className="cost_price">{costs[form]}</p>
                                    <p className="cost_form">{form}</p>
                                </div>)
                        }
                    </div>
                    <div className="last_document_of_content_2">
                        <img className="document_icon" src={"../assets/document_icon.png"}/>
                        <p>ПОЛОЖЕНИЕ о порядке предоставления льгот по оплате обучения в Алтайском институте труда и
                            права
                            (филиал) Образовательного учреждения профсоюзов высшего образования «Академия труда и
                            социальных
                            отношений»</p>
                    </div>
                    <button className="small_grey_link_to_block" style={{float: "right"}}>Перейти к разделу "Документы"
                    </button>
                </div>
                :
                <p>Направление выберите!)</p>
            }


        </Card>
    );
});

export default AdmissionBacContent2;
