import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BlockContainer from "../components/display/BlockContainer";
import Block from "../components/display/Block";
import Carusel from "../components/lines/Carusel";

import book from "../local_assets/book.png";
import hat from "../local_assets/graduation.png";
//Выпускники
import grad0 from "../local_assets/Content_2.png";
import grad1 from "../local_assets/Content_3.png";
import grad2 from "../local_assets/Content_5.png";
import grad3 from "../local_assets/Content_6.png";
import grad4 from "../local_assets/Content_7.png";
import Default from "../local_assets/logo-in-round.svg";


// hand components

const NewsBlock = () => {
    const {block_store} = useContext(Context);
    // const [news, setNews] = useState([])
    // useEffect(() => {
    //     setNews(block_store.news)
    //
    // }, [block_store.news])

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
        // <Block header="Новости">
        //     <div className="news_container">
        //         {news && news.slice().sort((e1, e2) => e2.id - e1.id).map(e =>
        //             <a href="#"><img src={getNewsCover(e)} alt=""/>
        //                 <p>{e.header}</p>
        //             </a>
        //         )}
        //     </div>
        // </Block>
        <Block header="Новости">
            <div className="news_container">
                {block_store.news && block_store.news.sort((e1, e2) => e2.id - e1.id).map(e =>
                    <a href="#">
                        <img src={getNewsCover(e)} alt=""/>
                        <p>{e.header}</p>
                    </a>
                )}
            </div>
        </Block>

    )
}

const UpcomingEventsBlock = () => {
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
}

const LearnMoreAboutUsBlock = () => {
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
}

const Main = observer(() => {
    const {block_store} = useContext(Context);
    const [blockList, setBlockList] = useState({
        2: <NewsBlock/>,
        3: <UpcomingEventsBlock/>,
        4: <LearnMoreAboutUsBlock/>
    });
    const myAddress = "/" + window.location.href.split("/")[3]


    useEffect(() => {
        console.log(block_store.news);
        let pageConstructorBlocks = Array.from(block_store.blocks.filter(block => block.pageLink === myAddress).sort((block1, block2) => block1.ordinal - block2.ordinal))

        for (let i = 1; pageConstructorBlocks.length > 0; i++) {
            if (!blockList.hasOwnProperty(i)) {
                // shift() - удаляет 0-ой элемент из массива и возвращает его
                const first = pageConstructorBlocks.shift()
                setBlockList(prev => ({...prev, [i]: first}))
                // blockList[i] = pageConstructorBlocks.shift()
            } else {
                console.log(blockList[i])
            }
        }
        // console.log(blockList)
        // setBlockList(prev => blockList)
    }, [block_store.blocks, block_store.lines]);

    console.log(blockList)
    return (
        <>
            {Object.values(blockList).map((block, index) => {
                if (block.hasOwnProperty("id")) {
                    return <Block key={index} block={block}/>
                } else {
                    return <>{block}</>
                }
            })}
        </>

           // // {/* /* {<Block className="news_container" linkName="Новости">
           //      {news && news.slice().sort((e1, e2) => e2.id - e1.id).map(e =>
           //          <a href="#"><img src={getNewsCover(e)} alt=""/>
           //              <p>{e.header}</p>
           //          </a>
           //      )}
           //  </Block>} */
/*{ 

            /* {<h1 style={{color: "var(--aitip_blue)", fontSize: "calc(var(--normal-font_size) * 1.5)"}}>Алтайский
                институт труда и права</h1>
            <Block style={{background: "#FFF"}}>
                <Carusel color="#AD4820" photos={["im57.png"]} ratio={16 / 9}/>
            </Block>
            <h2 className="block_title">Новости</h2>
            <div className="news_container" linkName="Новости">
                {news && news.slice().sort((e1, e2) => e2.id - e1.id).map(e =>
                    <a href="#"><img src={getNewsCover(e)} alt=""/>
                        <p>{e.header}</p>
                    </a>
                )}
            </div>
            <div style={{background: "#FFF", paddingLeft: "3%", borderRadius: "5px", paddingBottom: "20px"}}
                    linkName="Ближайшие события">
                <h2 className="in_block_title">Ближайшие события</h2>
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
            </div>
            <div style={{marginBottom: "20px"}} linkName="Узнать о нас больше">
                <h2 className="block_title">Узнать о нас больше</h2>
                <div className="know_more_about">
                    <a href="/personalities"><p style={{color: "#929396"}}>Педагоги и научные работники</p></a>
                    <a href="/partners" style={{gridColumn: "2 / span 2", backgroundColor: "#e6b09f"}}>
                        <p>Партнёры</p></a>
                    <a href="/admision_bac" className="adm_bac">
                        <p>Обучение на бакалавриате</p></a>
                    <a href="/admision_add" className="adm_add"><p>Программы дополнительного профессионального
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
            </div>
            <div className="Block graduates" linkName="Наши выпускники">
                <h2 className="in_block_title" style={{textAlign: 'center'}}>Наши выпускники</h2>
                <p>Студентам Алтайского института труда и права, окончившим курс обучения и успешно прошедшим
                    государственную итоговую аттестацию, выдается диплом государственного образца ОУП
                    ВО«Академия труда и социальных отношений» (г. Москва). Выпускники Алтайского института труда
                    И права успешно занимаются организационно-управленческой, консультативной, аналитической,
                    научно-исследовательской, производственной и педагогической работой в коммерческих и
                    некоммерческих организациях, а также на государственной и муниципальной службе.</p>
                <Carusel color="#AD4820" photos={[grad0, grad1, grad2, grad3, grad4]} addressFileType="global"
                            ratio={30 / 9}/> }*/
            // {/* </div> */}
    );
});

export default Main;