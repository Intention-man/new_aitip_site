import React, {useContext, useEffect, useState} from 'react';
import {fetchAdditionalPrograms, fetchOneAdditionalProgram} from "../../http/admissionAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Card from "../../components/lines/Card";
import ButtonList from "../../components/ButtonList";
import Block from "../../components/display/Block";
import {addConstructorBlocks} from "../../additional_commands/commonPanelsFunctions";
import "../../css/page_styles/Admission.css";



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
        <Block header="Программы профессиональной переподготовки">
            <p className="extended_description">Освоение нового вида профессиональной деятельности и приобретение дополнительной
                квалификации. Сроки освоения программы переподготовки составляют от 250 часов.
                По результатам итоговой аттестации выдается диплом о профессиональной переподготовке
                Образовательного учреждения профсоюзов высшего образования "Академия труда и социальных
                отношений", г. Москва.</p>
            <ButtonList buttonList={admission_store.additionalPrograms.filter(program => program.kind === "Программа профессиональной переподготовки").map(e => e.name)} setChosenValue={setChosenRetrainingProgramName}/>

            {chosenRetrainingProgram.hasOwnProperty("name") &&
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
        </Block>
    );
});

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
        <Block header="Программы повышения квалификации">
            <p className="extended_description">Совершенствование И получение новой
                компетенции, необходимой профессиональной деятельности, a также повышение профессионального уровня B рамках имеющейся квалификации. Продолжительность курсов повышения квалификации от 16 часов.
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
        </Block>
    );
});

const AdmissionAdd = observer(() => {
    const {admission_store} = useContext(Context)
    const {block_store} = useContext(Context);

    const [blockList, setBlockList] = useState({
        2: <AdmissionAddContent2/>,
        3: <AdmissionAddContent3/>
    });

    const handMadeBlocksCount = 2
    const myAddress = "/" + window.location.href.split("/")[3]

    useEffect(() => {
        fetchAdditionalPrograms().then(data => {
            admission_store.setAdditionalPrograms(data.rows)
            console.log(admission_store.additionalPrograms)
        })
    }, [])

    useEffect(() => {
        addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)
    }, [block_store.blocks, block_store.lines]);

    return (
        <>
            {Object.values(blockList).map((block, index) => {
                if (block.hasOwnProperty("id")) {
                    return <Block key={index} block={block} header={block.header}/>
                } else {
                    return <>{block}</>
                }
            })}
        </>
    );
});

export default AdmissionAdd;