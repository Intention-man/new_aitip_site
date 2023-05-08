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

    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('header').value = header
            document.getElementById('ordinal').value = ordinal
        }
    }, [])


    const addLine = () => {
        setLines([...lines, {
            lineOrdinal: lines.length,
            kind: 0,
            params: {},
            text: [""],
            filesNames: [],
            addressFileType: ""
        }])
    };

    const changeLine = (key, value, index) => {
        setLines(lines => lines.map(line => (lines.indexOf(line) === index ? {...line, [key]: value} : line)))
        // key === "text" && console.log(value)
        // console.log(key, value, index)
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

    const removeLine = (number) => {
        let removingLine = Array.from(lines.filter(line => line.lineOrdinal === number))[0];
        (removingLine.filesNames !== null) && removingLine.filesNames.forEach(photo => updateFileUsages(photo, -1));
        setLines(lines.filter(line => lines.indexOf(line) !== number).map(line => ({
            ...line,
            ["lineOrdinal"]: lines.indexOf(line)
        })))
        setRemovedLineIndex(number)
    }

    const saveBlock = async () => {
        const formData = new FormData()
        // console.log(lines)
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
            <input id="header" onChange={(e) => setHeader(e.target.value)}/>
            <select id="pageLink" value={pageLink} onChange={e => {
                setPageLink(e.target.value)
            }}>
                <option value="">Введите название страницы</option>
                {publicRoutes.map((publicRoute) => (
                    <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                ))}
            </select>
            <p>Введите номер блока на странице</p>
            <input id="ordinal" onChange={(e) => setOrdinal(Number(e.target.value))}/>
            {lines.length > 0 && lines.map(line => {
                // console.log(line.text)
                    return (
                        <div style={{margin: "10px", padding: "10px", border: "5px solid #8888FF"}}>
                            <CreateOrEditLine key={line.lineOrdinal} changeLine={changeLine} index={line.lineOrdinal}
                                              currentLine={line} doUpdateUsages={doUpdateUsages}
                                              removedLineIndex={removedLineIndex}/>
                            <LineDisplay line={line}/>
                            {line.lineOrdinal > 0 &&
                                <button onClick={() => swapLines(line.lineOrdinal - 1, line.lineOrdinal)}>Передвинуть линию
                                    на 1 выше</button>}
                            {(line.lineOrdinal + 1) < lines.length &&
                                <button onClick={() => swapLines(line.lineOrdinal, line.lineOrdinal + 1)}>Передвинуть линию
                                    на 1 ниже</button>}

                            <button onClick={() => removeLine(line.lineOrdinal)}>Удалить линию</button>
                        </div>
                    )
                }
            )}

            <button onClick={addLine}>Добавить новую линию</button>
            <h2>Как выглядит блок</h2>
            {lines.length > 0 &&
                <Block
                    block={{
                        header: header,
                        lines: lines
                    }} // FIXME: ох, это ужасный костыль
                    useDatabase={false}
                />
            }
            <button onClick={() => {
                saveBlock().then(bool => {
                    setDoUpdateUsages(true)
                    alert("Блок успешно обновлен")
                    setTimeout(() => setDoUpdateUsages(false), 2000)
                })
            }}>Сохранить блок</button>
            <button onClick={() => removeBlock(block.id)}>Удалить блок</button>
        </div>
    )
});

export default CreateOrEditBlock;