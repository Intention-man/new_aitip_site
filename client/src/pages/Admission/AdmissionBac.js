import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {fetchDirectionsBachelor, fetchOneDirectionBachelor} from "../../http/admissionAPI";
import Block from '../../components/display/Block';
import ButtonList from "../../components/ButtonList";
import "../../css/main.css"
import "../../css/page_styles/Admission.css";
import Card from "../../components/lines/Card";
import {addConstructorBlocks} from "../../additional_commands/commonPanelsFunctions";


const AdmissionBacContent2 = observer(() => {
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
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirectionsBachelor(data.rows)
        ).then(() => {
            admission_store.directionsBachelor.forEach(direction => setButtonList([...buttonList, {name: direction.name, value: direction.id}]))
            admission_store.directionsBachelor && admission_store.directionsBachelor[0] && setChosenDirectionName(admission_store.directionsBachelor[0].name)
        })
    }, []);


    return (
        <Block header="Направления">
            <h1 className="local_title">
                Выберите <span style={{color: "#076DB1"}}>направление</span>
            </h1>
            <ButtonList buttonList={admission_store.directionsBachelor.map(e => e.name)} setChosenValue={setChosenDirectionName}/>
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
                                        <span style={{color: "#AD4820"}}>Минимальные проходные баллы</span> для поступающих по результатам ЕГЭ
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
                                     alt="Изображение"/>
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
        </Block>
    );
});


const AdmissionBac = observer(() => {
    const {block_store} = useContext(Context);

    const [blockList, setBlockList] = useState({
        2: <AdmissionBacContent2/>
    });

    const handMadeBlocksCount = 1
    const myAddress = "/" + window.location.href.split("/")[3]
    addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)


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
})

export default AdmissionBac;