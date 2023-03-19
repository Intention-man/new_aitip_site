import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {fetchOneAdditionalProgram, } from "../../../http/admissionAPI";
import Card from "../../../components/lines/Card"
import {observer} from "mobx-react-lite";
import ButtonList from "../../../components/ButtonList";
import "../../../css/page_styles/Admission.css";



const AdmissionAddContent2 = observer(() => {
    const {admission_store} = useContext(Context)
    const [chosenRetrainingProgram, setChosenRetrainingProgram] = useState({});
    const [chosenRetrainingProgramName, setChosenRetrainingProgramName] = useState("");

    useEffect(() => {
        if (admission_store.selectedRetrainingProgram) {
            fetchOneAdditionalProgram(admission_store.selectedRetrainingProgram).then(data => {
                setChosenRetrainingProgram(data)
            })}
    }, [admission_store.selectedRetrainingProgram])

    useEffect(() => {
        if (chosenRetrainingProgramName) {
            admission_store.setSelectedRetrainingProgram(admission_store.additionalPrograms.filter(e => e.name === chosenRetrainingProgramName)[0].id)
        }
    }, [chosenRetrainingProgramName])


    return (
        <Card
            width={12}
            imgPos="none"
            className="admission-add-content2"
        >
            <h1 className="local_title">
                Программы профессиональной переподготовки
            </h1>
            <p className="extended_description">Освоение нового вида профессиональной деятельности и приобретение дополнительной
                квалификации. Сроки освоения программы переподготовки составляют от 250 часов.
                По результатам итоговой аттестации выдается диплом о профессиональной переподготовке
                Образовательного учреждения профсоюзов высшего образования "Академия труда и социальных
                отношений", г. Москва.</p>
            <ButtonList buttonList={admission_store.additionalPrograms.filter(program => program.kind === "Программа профессиональной переподготовки").map(e => e.name)} setChosenValue={setChosenRetrainingProgramName}/>
            {/*<ul className="tracks">*/}
            {/*    {admission_store.additionalPrograms.filter(program => program.kind === "Программа профессиональной переподготовки").map(d =>*/}
            {/*        <li key={"small_div_" + d.id}>*/}
            {/*            <button*/}
            {/*                key={d.id}*/}
            {/*                onClick={() => {*/}
            {/*                    admission_store.setSelectedRetrainingProgram(d.id)*/}
            {/*                    console.log(d.id)*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                {d.name}*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*    )}*/}
            {/*</ul>*/}
            {chosenRetrainingProgram.hasOwnProperty("name") &&
                // <div>
                //     <p>{chosenRetrainingProgram.description}</p>
                //     <img src={process.env.REACT_APP_API_URL + chosenRetrainingProgram.programImg}/>
                // </div>
                <Card
                width={12}
                imgSrc={process.env.REACT_APP_API_URL + chosenRetrainingProgram.programImg}
                imgPos="right"
                className="direction_inner_card"
                >
                <h1>{chosenRetrainingProgram.name}</h1><br/>
                {/*<h3 style={{width: "90%"}}>Профиль: {chosenDirection.profile}</h3>*/}
                <p>{chosenRetrainingProgram.description}</p>
                </Card>}
            <ol className="modules_container">
                <p className="modules_title">Программа переподготовки включает в себя следующие модули:</p>
                {chosenRetrainingProgram && chosenRetrainingProgram.modules && chosenRetrainingProgram.modules.map(e =>
                    <li>
                        {e}
                    </li>
                )}
            </ol>

            <div className="cost_zone">
                {chosenRetrainingProgram.hours && <div className="cost">
                    <p className="cost_price">{chosenRetrainingProgram.hours}</p>
                    <p className="cost_form">часов</p>
                </div>}
                {chosenRetrainingProgram.form &&
                    <div className="cost">
                        <p className="cost_price">{chosenRetrainingProgram.form}</p>
                        <p className="cost_form">форма обучения</p>
                    </div>}
                {chosenRetrainingProgram.cost &&
                <div className="cost">
                    <p className="cost_price">от {chosenRetrainingProgram.cost.toLocaleString()} руб.</p>
                    <p className="cost_form">стоимость</p>
                </div>}
            </div>
            <div className="supervisor">
                <div>
                {chosenRetrainingProgram.supervisorName &&
                    <p style={{color: "#076db1", fontWeight: "bold"}}>Научный руководитель программы:</p>}
                {chosenRetrainingProgram.supervisorName &&
                    <p className="supervisor_name">{chosenRetrainingProgram.supervisorName}</p>}
                {chosenRetrainingProgram.supervisorDescription &&
                    <p className="supervisor_description">{chosenRetrainingProgram.supervisorDescription}</p>}
                </div>
                {chosenRetrainingProgram.supervisorImg &&
                    <img width="300" height="300" src={"http://localhost:3000/"+chosenRetrainingProgram.supervisorImg} alt="Чет не пошло как-то с картинкой..."/>}
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

export default AdmissionAddContent2;