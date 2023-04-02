import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {fetchOneAdditionalProgram, } from "../../../http/admissionAPI";
import Card from "../../../components/lines/Card"
import {observer} from "mobx-react-lite";
import ButtonList from "../../../components/ButtonList";


const AdmissionAddContent3 = observer(() => {
    const {admission_store} = useContext(Context)
    const [chosenDevelopmentProgram, setChosenDevelopmentProgram] = useState({});
    const [chosenDevelopmentProgramName, setChosenDevelopmentProgramName] = useState("");

    useEffect(() => {
        if (admission_store.selectedDevelopmentProgram) {
            fetchOneAdditionalProgram(admission_store.selectedDevelopmentProgram).then(data => {
                setChosenDevelopmentProgram(data)
            })}
    }, [admission_store.selectedDevelopmentProgram])

    useEffect(() => {
        if (chosenDevelopmentProgramName) {
            admission_store.setSelectedDevelopmentProgram(admission_store.additionalPrograms.filter(e => e.name === chosenDevelopmentProgramName)[0].id)
        }
    }, [chosenDevelopmentProgramName])


    return (
        <Card
            width={12}
            imgPos="none"
            className="admission-add-content2"
        >
            <h1 className="local_title">
                Программы повышения квалификации
            </h1>
            <p className="extended_description">Соверешнетсование И получение новой
                компетенции, необходиоми профессиональной деятельности, a также повышение профессионального уровня B рамках имеющейся квалификации. Продолжительность курсов повышения квалификации от 16 часов.
                По результатам итоговой аттестации выдается диплом 0 повышении квалификации Образовательного учреждения профсоюзов высшего образования "Академия труда и социальных отношений", г. Москва.</p>
            <ButtonList buttonList={admission_store.additionalPrograms.filter(program => program.kind === "Программа повышения квалификации").map(e => e.name)} setChosenValue={setChosenDevelopmentProgramName}/>
            {chosenDevelopmentProgram.hasOwnProperty("name") &&
                <Card
                    width={12}
                    imgSrc={process.env.REACT_APP_API_URL + chosenDevelopmentProgram.programImg}
                    imgPos="left"
                    className="direction_inner_card"
                >
                    <h1>{chosenDevelopmentProgram.name}</h1><br/>
                    {/*<h3 style={{width: "90%"}}>Профиль: {chosenDirection.profile}</h3>*/}
                    <p>{chosenDevelopmentProgram.description}</p>
                </Card>}
            <ol className="modules_container">
                <p className="modules_title">Программа повышения квалификации включает в себя следующие модули:</p>
                {chosenDevelopmentProgram && chosenDevelopmentProgram.modules && chosenDevelopmentProgram.modules.map(e =>
                    <li>
                        {e}
                    </li>
                )}
            </ol>

            <div className="cost_zone">
                {chosenDevelopmentProgram.hours && <div className="cost">
                    <p className="cost_price">{chosenDevelopmentProgram.hours}</p>
                    <p className="cost_form">часов</p>
                </div>}
                {chosenDevelopmentProgram.form &&
                    <div className="cost">
                        <p className="cost_price">{chosenDevelopmentProgram.form}</p>
                        <p className="cost_form">форма обучения</p>
                    </div>}
                {chosenDevelopmentProgram.cost &&
                    <div className="cost">
                        <p className="cost_price">от {chosenDevelopmentProgram.cost.toLocaleString()} руб.</p>
                        <p className="cost_form">стоимость</p>
                    </div>}
            </div>
            <div className="supervisor">
                <div>
                    {chosenDevelopmentProgram.supervisorName &&
                        <p style={{color: "#076db1", fontWeight: "bold"}}>Научный руководитель программы:</p>}
                    {chosenDevelopmentProgram.supervisorName &&
                        <p className="supervisor_name">{chosenDevelopmentProgram.supervisorName}</p>}
                    {chosenDevelopmentProgram.supervisorDescription &&
                        <p className="supervisor_description">{chosenDevelopmentProgram.supervisorDescription}</p>}
                </div>
                {chosenDevelopmentProgram.supervisorImg &&
                    <img width="300" height="300" src={process.env.REACT_APP_API_URL + chosenDevelopmentProgram.supervisorImg} alt="Чет не пошло как-то с картинкой..."/>}
            </div>
            <div className="direction_block" style={{marginTop: "30px"}}>
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
            </div>




        </Card>
    );
});

export default AdmissionAddContent3;
