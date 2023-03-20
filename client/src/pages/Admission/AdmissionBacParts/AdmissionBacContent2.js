import React, {useContext, useEffect, useState} from 'react';
import Card from '../../../components/lines/Card';
import "../../../css/page_styles/Admission.css";
import {fetchOneDirectionBachelor} from "../../../http/admissionAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import ButtonList from "../../../components/ButtonList";

const AdmissionBacContent2 = observer(() => {
    // const directions = ["Экономика", "Менеджмент", "Юриспруденция", "Государственное и муниципальное управление", "Туризм"]
    //
    // const specialties = ["директор и администратор предприятия",
    //     "консультант по управлению", "помощник руководителя", "менеджер по проекту",
    //     "менеджер по развитию", "бренд-менеджер", "инновационный менеджер",
    //     "менеджер интернет-проекта", "менеджер по качеству и персоналу"].sort((a, b) => a.length - b.length)

    // const passing_points = [
    //     "Математика (27 баллов)",
    //     "Русский язык (36 баллов)",
    //     "Предмет по выбору поступающего: Обществознание (42 балла), Информатика и ИКТ (40 баллов), География (37 баллов), Иностранный язык (22 балла), История (32 балла)"]


    const {admission_store} = useContext(Context)
    const [chosenDirection, setChosenDirection] = useState({});
    const [buttonList, setButtonList] = useState([]);
    const [chosenDirectionName, setChosenDirectionName] = useState("");

    useEffect(() => {
        if(chosenDirectionName) {
            console.log(chosenDirectionName)
            fetchOneDirectionBachelor(Array.from(admission_store.directionsBachelor.filter(e => e.name === chosenDirectionName))[0].id).then(data => {
                setChosenDirection(data);
            })
            console.log(chosenDirection)
        }
    }, [chosenDirectionName])


    useEffect(() => {
        admission_store.directionsBachelor.forEach(direction => setButtonList([...buttonList, {name: direction.name, value: direction.id}]))
        admission_store.directionsBachelor && admission_store.directionsBachelor[0] && setChosenDirectionName(admission_store.directionsBachelor[0].name)
    }, [admission_store.directionsBachelor]);


    return (
        <Card
            width={12}
            imgPos="none"
            className="admission-bac-content2"
        >
            <h1 className="local_title">
                Выберите <span style={{color: "#076DB1"}}>направление</span>
            </h1>
            {/*<ul className="tracks">*/}
                <ButtonList buttonList={admission_store.directionsBachelor.map(e => e.name)} setChosenValue={setChosenDirectionName}/>
                {/*{admission_store.directionsBachelor && forms[windowVisible]}*/}
                {/*{admission_store.directionsBachelor.map(d =>*/}
                {/*    <li key={"small_div_" + d.id}>*/}
                {/*        <button*/}
                {/*            key={d.id}*/}
                {/*            onClick={() => {*/}
                {/*                console.log(this)*/}
                {/*                admission_store.setSelectedDirectionBachelor(d.id)*/}
                {/*                console.log(d.id)*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            {d.name}*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*)}*/}
            {/*</ul>*/}
            {/*{buttonList.length > 0 && <ButtonList buttonList={buttonList}></ButtonList>}*/}
            {chosenDirection.hasOwnProperty("name") &&
                <Card
                    width={12}
                    imgSrc={process.env.REACT_APP_API_URL + chosenDirection.img}
                    imgPos="right"
                    className="direction_inner_card"
                >
                    <h1>{chosenDirection.code} {chosenDirection.name}</h1>
                    <h3 style={{width: "90%"}}>Профиль: {chosenDirection.profile}</h3>
                    <p>{chosenDirection.profession_advantages}</p>
                </Card>}

            {chosenDirection.hasOwnProperty("name") &&
                <div className="direction_block">
                    <p className="extended_description">{chosenDirection.profession_description}</p>
                    <p className="title_who_can_you_become">Кем ты можешь стать:</p>
                    <ul className="specialties">
                        {(chosenDirection.specialities + "").split(";").sort((a, b) => b.length - a.length).map(el =>
                            <li className="specialty" key={el}>{el}</li>
                        )}
                    </ul>
                    <div className="points_and_2_documents">
                        <div className="passing_points" style={{borderColor: "#AD4820"}}>
                            <p className="local_title">
                                        <span style={{color: "#AD4820"}}>Минимальные проходные баллы
                                        </span> для поступающих по результатам ЕГЭ
                            </p>
                             <table style={{width:"100%"}}>
                                <tbody>
                                    {chosenDirection && chosenDirection.tests && chosenDirection.tests.filter(test => test.admissionByEGE === true).map(test =>{
                                        return <tr key={test.subject}><td>{test.subject}</td><td style={{width: "30%"}}><span style={{color: "#AD4820", fontWeight: "bold"}}>{test.minPoints}</span> балл{(5 > test.minPoints%10 > 0) ? "а" : "ов"}</td></tr>;})}
                                </tbody>
                            </table>
                        </div>
                        <div className="passing_points" style={{borderColor: "#076DB1"}}>
                            <p className="local_title">
                                <span style={{color: "#076DB1"}}>Минимальные проходные баллы </span> для поступающих на
                                базе профессионального образования
                            </p>
                            <table style={{width:"100%"}}>
                                <tbody>
                                {chosenDirection && chosenDirection.tests && chosenDirection.tests.filter(test => test.admissionByEGE === false).map(test =>{
                                    return <tr key={test.subject}><td>{test.subject}</td><td><span style={{color: "#076DB1", fontWeight: "bold"}}>{test.minPoints}</span> балл{(5 > test.minPoints%10 > 0) ? "а" : "ов"}</td></tr>;})}
                                </tbody>
                            </table>
                        </div>
                        <div className="_2_documents">
                            <div className="_1_of_first_2_documents">
                                <img className="document_icon" src={"../assets/document_icon.png"}
                                     alt="Чет не пошло как-то с картинкой..."/>
                                <p>Правила проведения вступительных испытаний</p>
                            </div>
                            <div className="_1_of_first_2_documents">
                                <img className="document_icon" src={"../assets/document_icon.png"}
                                     alt="Чет не пошло как-то с картинкой..."/>
                                <p>Расписание вступительных испытаний 2022</p>
                            </div>
                        </div>
                    </div>
                    <div className="cost_zone">
                        <div className="cost">
                            <p className="cost_price">{chosenDirection.full_and_part_time_form_price.toLocaleString()}</p>
                            <p className="cost_form">Очно-заочная</p>
                        </div>
                        <div className="cost">
                            <p className="cost_price">{chosenDirection.extramural_form_price.toLocaleString()}</p>
                            <p className="cost_form">Заочная</p>
                        </div>
                    </div>
                    <div className="last_document_of_content_2">
                        <img className="document_icon" src={"../assets/document_icon.png"}
                             alt="Чет не пошло как-то с картинкой..."/>
                        <p>ПОЛОЖЕНИЕ о порядке предоставления льгот по оплате обучения в Алтайском институте труда и
                            права
                            (филиал) Образовательного учреждения профсоюзов высшего образования «Академия труда и
                            социальных
                            отношений»</p>
                    </div>
                    <button className="small_grey_link_to_block" style={{float: "right"}}>Перейти к разделу "Документы"
                    </button>
                </div>}
        </Card>

    );
});

export default AdmissionBacContent2;
