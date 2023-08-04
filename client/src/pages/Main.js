import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Block from "../components/display/Block";

import book from "../local_assets/book.png";
import hat from "../local_assets/graduation.png";

//Выпускники
import Default from "../local_assets/logo-in-round.svg";
import {useNavigate} from "react-router";
import CommonPagesDisplay from "../components/display/CommonPagesDisplay";


// hand components

const NewsBlock = observer(() => {
    const {block_store} = useContext(Context);
    const navigate = useNavigate();

    const getNewsCover = (item) => {
        console.log(item.header)
        for (let line of block_store.lines.filter(line => line.blockId === item.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal)) {
            if ([2, 3, 4].includes(line.kind) && line.filesNames.length > 0) {
                if (line.addressFileType === "global") {
                    return line.filesNames[0]
                } else {
                    return process.env.REACT_APP_API_URL + line.filesNames[0]
                }
            }
        }
        return Default;
    }

    return (
        <Block header="Новости">
            <div className="news_container">
                {block_store.news && block_store.news.map(e =>
                    <a onClick={() => navigate("/article/" + e.id)}>
                        <img src={getNewsCover(e)} alt=""/>
                        <p>{e.header}</p>
                    </a>
                )}
            </div>
        </Block>
    )
})

const UpcomingEventsBlock = observer(() => {
    return (<Block style={{background: "#FFF", paddingLeft: "3%", borderRadius: "5px", paddingBottom: "20px"}}
                   header="Ближайшие события">
        {[{date: "20 апр", text: "Начало приёма документов"}, {
            date: "20 апр",
            text: "Начало приёма документов"
        }, {date: "20 апр", text: "Начало приёма документов"}].map((e, indx, arr) => <>
            <div className="event_container">
                <p className="event_date">{e.date}</p>
                <p className="event_text">{e.text}</p>
            </div>
            {indx !== arr.length - 1 &&
                <hr style={{width: "40%", marginLeft: "2%", border: "1px solid #000", opacity: "1"}}/>}
        </>)
        }
    </Block>)
})

const LearnMoreAboutUsBlock = observer(() => {
    return (<Block header="Узнать о нас больше">
        <div className="know_more_about">
            <a href="/personalities"><p style={{color: "#929396"}}>Педагоги и научные работники</p></a>
            <a href="/partners" style={{gridColumn: "2 / span 2", backgroundColor: "#e6b09f"}}>
                <p>Партнёры</p></a>
            <a href="/admission_bac" className="adm_bac">
                <p>Обучение на бакалавриате</p></a>
            <a href="/admission_add" className="adm_add"><p>Программы дополнительного профессионального
                образования</p></a>
            <a href="#" style={{gridColumn: "1 / span 3", backgroundColor: "#9fb7e6"}}>
                <p>Поступление</p></a>
            <a href="/history" className="history"><p style={{color: "#929396"}}>История института</p></a>
            <a href="/science" className="science"><p>Наука</p></a>
        </div>

        <div className="Block bachelor" style={{
            background: "URL(" + book + ") left bottom no-repeat, URL(" + hat + ") right top no-repeat, white",
            backgroundSize: "25% 45%, 40% 65%"
        }}>
            <h2 className="in_block_title">Поступление на бакалавриат</h2>
            <ul>
                <li>индивидуальный подход на основе современных методик</li>
                <li>преподаватели - ведущие ученые и практики Алтайского края</li>
                <li>акцент на качестве и содержании подготовки</li>
                <li>диплом о профессиональной переподготовке и удостоверение о повышении квалификации
                    (г.Москва)
                </li>
            </ul>
            <ul style={{paddingLeft: "25%"}}>
                <li>индивидуальный подход на основе современных методик</li>
                <li>преподаватели - ведущие ученые и практики Алтайского края</li>
                <li>акцент на качестве и содержании подготовки</li>
                <li>диплом о профессиональной переподготовке и удостоверение о повышении квалификации
                    (г.Москва)
                </li>
            </ul>
        </div>
    </Block>)
})

const Main = observer(() => {
    let blockList = {
        2: <NewsBlock/>,
        // 3: <UpcomingEventsBlock/>,
        4: <LearnMoreAboutUsBlock/>
    }
    const handMadeBlocksCount = 2
    return (
        <CommonPagesDisplay blockList={blockList} handMadeBlocksCount={handMadeBlocksCount}/>
    );
});

export default Main;