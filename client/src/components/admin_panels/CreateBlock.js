// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import CreateLine from "./CreateLine";
import MDEditor from "@uiw/react-md-editor";
import Card from "../card/Card";
import Carusel from "../Carusel";
import {createBlock} from "../../http/blockAPI";
import {publicRoutes} from "../../routes";
import "../../css/component_styles/Editor.css"


const CreateBlock = observer(() => {

    // возвращаемые "наверх" значения
    const [isNews, setIsNews] = useState("");
    const [header, setHeader] = useState("");
    const [pageLink, setPageLink] = useState("");
    const [ordinal, setOrdinal] = useState(-1);
    const [lines, setLines] = useState([]);


    const addLine = () => {
        setLines([...lines, {
            lineOrdinal: lines.length,
            kind: 0,
            params: [],
            text: "",
            filesNames: [],
            addressFileType: ""
        }])
    };

    const changeLine = (key, value, index) => {
        console.log(lines.map(line => (lines.indexOf(line) === index ? {...line, [key]: value} : line)))
        setLines(lines => lines.map(line => (lines.indexOf(line) === index ? {...line, [key]: value} : line)))
    }

    const removeLine = (number) => {
        console.log(lines.filter(line => lines.indexOf(line) !== number).map(line => ({...line, ["lineOrdinal"]: lines.indexOf(line)})))
        setLines(lines.filter(line => lines.indexOf(line) !== number).map(line => ({...line, ["lineOrdinal"]: lines.indexOf(line)})))
    }

    const addBlock = () => {
        const formData = new FormData()
        formData.append("isNews", isNews)
        formData.append("header", header)
        formData.append("pageLink", pageLink)
        formData.append("ordinal", `${ordinal}`)
        formData.append("lines", JSON.stringify(lines))
        createBlock(formData).then(data => console.log(data))
    };

    return (
        <div>
            <select id="isNews" value={isNews} onChange={e => {
                setIsNews(e.target.value === "true")
            }}>
                <option value="">Выберите тип блока</option>
                <option value="true">Новостной</option>
                <option value="false">Для страницы</option>
            </select>
            <p>Введите заголовок блока</p>
            <input onChange={(e) => setHeader(e.target.value)}/>
            <select id="pageLink" value={pageLink} onChange={e => {
                setPageLink(e.target.value)
            }}>
                <option value="">Введите название страницы</option>
                {publicRoutes.map((publicRoute) => (
                    <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                ))}
            </select>
            <p>Введите номер блока на странице</p>
            <input onChange={(e) => setOrdinal(Number(e.target.value))}/>


            {lines.length > 0 && lines.map(line =>
                <div style={{margin: "100px", padding: "100px", border: "5px solid #8888FF"}}>
                    <CreateLine key={line.lineOrdinal} changeLine={changeLine} index={line.lineOrdinal} line={line}/>
                    <button onClick={() => removeLine(line.lineOrdinal)}>Удалить линию</button>
                </div>
            )}

            <button onClick={addLine}>Добавить новую линию</button>

            <h2>Как выглядит блок</h2>
            {lines.length > 0 &&
                lines.map(line => {
                        console.log(line)
                        return (
                            <div key={lines.indexOf(line)}>
                                {(line.kind === 1 && line.text.length > 0) &&
                                    <MDEditor.Markdown source={line.text} style={{whiteSpace: 'pre-wrap'}}/>
                                }

                                {(line.kind === 2 && (line.filesNames.length > 0)) && (line.addressFileType === "global" ?
                                        <img style={{width: "60%"}} src={line.filesNames[0]}/> :
                                        <img style={{width: "60%"}} src={process.env.REACT_APP_API_URL + line.filesNames[0]}/>
                                )
                                }

                                {(line.kind === 3 && (line.filesNames.length > 0) && (line.addressFileType.length > 0)) &&
                                    <Card
                                        imgType={line.params[0]}
                                        imgSrc={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]}
                                        imgPos={line.params[1]}>
                                        <MDEditor.Markdown source={line.text} style={{whiteSpace: 'pre-wrap'}}/>
                                    </Card>

                                }

                                {(line.kind === 4 && (line.filesNames.length > 0) && (line.addressFileType.length > 0)) &&
                                    <Carusel photos={line.filesNames} adressFileType={line.addressFileType}></Carusel>
                                }

                                {(line.kind === 5 && (line.filesNames.length > 0)) &&
                                    <iframe width="560" height="315"
                                            src={"https://www.youtube.com/embed/" + line.filesNames[0].split("/")[3]}
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen></iframe>
                                }

                                {(line.kind === 6 && (line.filesNames.length > 0)) &&
                                    <div>
                                        <a href={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]} download target="_blank">Скачать документ</a>
                                    </div>
                                }
                            </div>
                        )
                    }
                )
            }
            <button onClick={addBlock}>Сохранить блок в БД</button>
        </div>

    )
});

export default CreateBlock;