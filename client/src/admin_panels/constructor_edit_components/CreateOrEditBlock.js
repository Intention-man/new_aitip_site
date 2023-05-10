import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import CreateOrEditLine from "./CreateOrEditLine";
import {createBlock, removeBlock, updateBlock} from "../../http/blockAPI";
import {publicRoutes} from "../../routes";
import "../../css/component_styles/Editor.css"
import LineDisplay from "../../components/display/LineDisplay";
import Block from "../../components/display/Block";
import {updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import {useEffect} from "react";
import Button from "../../components/Button"
import text from "../../local_assets/left-align.png"
import image from "../../local_assets/image.png"
import imageAdd from "../../local_assets/image-add.png"
import video from "../../local_assets/video.png"

const CreateOrEditBlock = observer(({block, mode}) => {

    // возвращаемые "наверх" значения
    const isEmpty = block.hasOwnProperty("fakeParam");
    const prevLinesIdList = isEmpty ? [] : block.lines.map(line => line.id)

    const [isNews, setIsNews] = useState(isEmpty ? false : block.isNews);
    const [header, setHeader] = useState(isEmpty ? "" : block.header);
    const [pageLink, setPageLink] = useState(isEmpty ? "" : block.pageLink);
    const [ordinal, setOrdinal] = useState(isEmpty ? -1 : block.ordinal);
    const [lines, setLines] = useState(isEmpty ? [] : block.lines.sort((line1, line2) => line1.lineOrdinal - line2.lineOrdinal));

    const [doUpdateUsages, setDoUpdateUsages] = useState(false);
    const [removedLineIndex, setRemovedLineIndex] = useState(-1);

    function chooseLineType(event) {
        const elements = document.querySelectorAll('.line_type');
        elements.forEach((element) => {
            element.classList.remove('type_active');
        });
        event.currentTarget.classList.add('type_active');
    }

    useEffect(() => {
        setIsNews(block.isNews)
        setHeader(block.header)
        setOrdinal(block.ordinal)
        setPageLink(block.pageLink)
        setLines(block.lines)
        if (mode === "edit") {
            document.getElementById('header').value = block.header
            document.getElementById('ordinal').value = block.ordinal
        }
    }, [block])


    const addLine = () => {
        setLines([...lines, {
            lineOrdinal: (lines.length > 0 ? lines.sort((a, b) => a.lineOrdinal - b.lineOrdinal).at(-1).lineOrdinal + 1 : 0),
            kind: 0,
            params: {},
            text: [""],
            filesNames: [],
            addressFileType: ""
        }])
    };

    const changeLine = (key, value, index) => {
        setLines(lines => lines.map(line => (line.lineOrdinal === index ? {...line, [key]: value} : line)))
    }

    const swapLines = (index1, index2) => {
        let newLineList = []
        for (const line of lines) {
            if (line.lineOrdinal !== index1 && line.lineOrdinal !== index2) {
                newLineList.push(line)
            } else {
                if (line.lineOrdinal === index1) {
                    newLineList.push({...line, lineOrdinal: index2})
                } else {
                    newLineList.push({...line, lineOrdinal: index1})
                }
            }
        }
        newLineList.sort((line1, line2) => line1.lineOrdinal - line2.lineOrdinal)
        setLines(newLineList)
    }

    const removeLine = (index) => {
        let removingLine = Array.from(lines.filter(line => line.lineOrdinal === index))[0];
        (removingLine.filesNames !== null) && removingLine.filesNames.forEach(photo => updateFileUsages(photo, -1));
        // setLines(prev => lines.filter(line => line.lineOrdinal !== index))
        let newLines = lines.filter(line => line.lineOrdinal !== index)
        setLines((prev) => newLines.map(line => ({
            ...line,
            ["lineOrdinal"]: newLines.indexOf(line)
        })))
        setRemovedLineIndex(index)
    }

    const saveBlock = async () => {
        const formData = new FormData()
        block.id && formData.append("id", block.id)
        formData.append("isNews", isNews)
        formData.append("header", header)
        formData.append("pageLink", pageLink)
        formData.append("ordinal", `${ordinal}`)
        formData.append("lines", JSON.stringify(lines))
        formData.append("prevLinesIdList", JSON.stringify(prevLinesIdList))
        mode === "edit" ? updateBlock(formData).then(data => {
        }) : createBlock(formData).then(data => {
        })
    };

    const getMaxLineOrdinal = () => {
        const index =  lines.reduce((a, b) => a.lineOrdinal > b.lineOrdinal ? a : b).lineOrdinal;
        return index
    }

    return (
        <div>
            <div className="block_settings">
                <div>
                    <p>Выберите страницу</p>
                    <label className="custom_select">
                        <select id="pageLink" value={pageLink} onChange={e => {
                            setPageLink(e.target.value)
                        }}>
                            <option value="" disabled="disabled">Выберите страницу</option>
                            {publicRoutes.map((publicRoute) => (
                                <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                            ))}
                        </select>
                        <svg>
                            <use xlinkHref="#select-arrow-down"></use>
                        </svg>
                    </label>
                </div>
                <div>
                    <p>Тип блока</p>
                    <label className="custom_select">
                        <select id="isNews" value={isNews} onChange={e => {
                            setIsNews(e.target.value === "true")
                        }}>
                            <option value="" disabled="disabled">Выберите тип блока</option>
                            <option value="true">Новостной</option>
                            <option value="false">Для страницы</option>
                        </select>
                        <svg>
                            <use xlinkHref="#select-arrow-down"></use>
                        </svg>
                    </label>
                </div>
                <div>
                    <p>Заголовок карточки</p>
                    <input
                        placeholder="Введите заголовок, он будет отображаться вверху карточки и на боковой панели содержания"
                        id="header" onChange={(e) => setHeader(e.target.value)}/>
                </div>
            </div>
            <div className="add_line_container">
                <p className="add_line_title">Добавить линию</p>
                <div className="line_type_container">
                    <div>
                        <p>Во всю ширину</p>
                        <div className="line_type" onClick={chooseLineType}>
                            <img src={text} alt=""/>
                            Текст
                        </div>
                        <div className="line_type" onClick={chooseLineType}>
                            <img src={image} alt=""/>
                            Изображение
                        </div>
                        <div className="line_type type_active" onClick={chooseLineType}>
                            <img src={imageAdd} alt=""/>
                            Слайдер изображений
                        </div>
                        <div className="line_type" onClick={chooseLineType}>
                            <img src={video} alt=""/>
                            Видео
                        </div>
                    </div>
                    <div>
                        <p>В две колонки</p>
                        <div className="line_type" onClick={chooseLineType}>
                            <img src={text} alt=""/>+<img src={image} alt=""/>
                            Текст + изображение
                        </div>
                        <div className="line_type" onClick={chooseLineType}>
                            <img src={text} alt=""/>+<img src={text} alt=""/>
                            Текст + текст
                        </div>
                        <div className="line_type type_active" onClick={chooseLineType}>
                            <img src={image} alt=""/>+<img src={image} alt=""/>
                            Изображение + изображение
                        </div>
                    </div>
                </div>
                <Button buttonName="Добавить новую линию" setChosenValue={addLine}/>

            <button onClick={addLine}>Добавить новую линию</button>
            <h2>Как выглядит блок</h2>
            {lines !== undefined && lines.length > 0 &&
                <Block
                    block={{
                        header: header,
                        lines: lines
                    }} // FIXME: ох, это ужасный костыль
                    useDatabase={false}
                />
            }
            <Button setChosenValue={() => {
                saveBlock().then(bool => {
                    setDoUpdateUsages(true)
                    alert("Блок успешно обновлен")
                    setTimeout(() => setDoUpdateUsages(false), 2000)
                })
            }} buttonName="Сохранить блок"/>
            {/*<button onClick={() => removeBlock(block.id)}>Удалить блок</button>*/}
            <svg className="sprites">
                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                </symbol>
            </svg>
        </div>
    )
});

export default CreateOrEditBlock;