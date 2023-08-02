import React, {useContext, useEffect, useState} from 'react';
import {fetchSchedules} from "../http/scheduleAPI";
import ButtonList from "../components/ButtonList";
import "../css/page_styles/Students.css";
import {fetchLabs} from "../http/labAPI";
import Card from "../components/lines/Card";
import Carusel from "../components/lines/Carusel";
import Block from "../components/display/Block";
import {Context} from "../index";
import {addConstructorBlocks} from "../additional_commands/commonPanelsFunctions";


const Schedule = () => {
    const [allSchedules, setAllSchedules] = useState([]);
    const [chosenSchedule, setChosenSchedule] = useState("");
    const forms = {"Бакалавриат":"Бакалавриат", "Дополнительное профессиональное образование":"ДПО"};

    useEffect(() => {
        fetchSchedules().then(data => {
                setAllSchedules(data.rows);
                setChosenSchedule(forms[Object.keys(forms)[0]]);
                console.log(data);
            }
        )
    }, []);

    return (
    <Block header="Расписание">
        <ButtonList buttonList={forms} setChosenValue={setChosenSchedule}/>
        <div className="schedules">
            {allSchedules && allSchedules.filter(e => e.kind === forms[chosenSchedule]).map(schedule =>
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
    </Block>
    )
}

const Laboratories = () => {
    const [allLabs, setAllLabs] = useState([]);
    const [chosenLabName, setChosenLabName] = useState({});
    const [chosenLab, setChosenLab] = useState({});


    useEffect(() => {
        fetchLabs().then(data => {
            setAllLabs(data.rows);
            console.log(data);
        })
    }, []);

    useEffect(() => {
        if(chosenLabName)
            setChosenLab(allLabs[allLabs.findIndex(e => e.name === chosenLabName)])
    }, [chosenLabName])

    return (
        <Block header="Лаборатории">
            <p className="labs_comment">Образовательная, научно-исследовательская и практико-ориентированная профессиональная
                деятельность в Алтайском институте труда и права также осуществляется на базе нескольких
                лабораторий.</p>
            <ButtonList buttonList={allLabs.map(e => e.name)} setChosenValue={setChosenLabName}/>
            {chosenLab && <Card imgSrc={process.env.REACT_APP_API_URL + chosenLab.cover} >
                <p className="local_title">{chosenLab.name}</p>
                <p>{chosenLab.text1}</p>
            </Card>}
            {chosenLab && <div className="supervisor">
                <div>
                    {chosenLab.supervisor_name &&
                        <p style={{color: "#076db1", fontWeight: "bold"}}>Научный руководитель программы:</p>}
                    {chosenLab.supervisor_name &&
                        <p className="supervisor_name">{chosenLab.supervisor_name}</p>}
                    {chosenLab.supervisor_description &&
                        <p className="supervisor_description">{chosenLab.supervisor_description}</p>}
                </div>
                {chosenLab.supervisor_photo &&
                    <img width="300" height="300" src={process.env.REACT_APP_API_URL + chosenLab.supervisor_photo} alt="Чет не пошло как-то с картинкой..."/>}
            </div>}
            {chosenLab && <><p className="labs_comment">{chosenLab.text2}</p>
                {chosenLab && chosenLab.carousel_photos_links && <Carusel photos={chosenLab.carousel_photos_links} addressFileType="local"/>}
                <p className="labs_comment" style={{paddingBottom: "30px"}}>{chosenLab.text3}</p></>}
        </Block>
    )
}


const Students = () => {
    const {block_store} = useContext(Context);
    const [blockList, setBlockList] = useState({
        1: <Schedule/>,
        2: <Laboratories/>
    });
    const handMadeBlocksCount = 2
    const myAddress = "/" + window.location.href.split("/")[3]
    addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)

    useEffect(() => {
        addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)
    }, [block_store.blocks, block_store.lines, handMadeBlocksCount]);

    console.log(blockList)
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
    )
};

export default Students;