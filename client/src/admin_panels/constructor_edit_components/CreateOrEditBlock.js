import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CreateOrEditLine from "./CreateOrEditLine";
import {createBlock, removeBlock, updateBlock} from "../../http/blockAPI";
import {publicRoutes} from "../../routes";
import "../../css/component_styles/Editor.css"
import Block from "../../components/display/Block";
import {refetchAllContent, updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import Button from "../../components/Button"
import text from "../../local_assets/left-align.png"
import image from "../../local_assets/image.png"
import imageAdd from "../../local_assets/image-add.png"
import video from "../../local_assets/video.png"
import doc_pic from "../../local_assets/document-text.png"
import arrow from "../../local_assets/icons/arrow-up.svg"
import trash from "../../local_assets/icons/delete.svg"
import {Context} from '../..';
import LineDisplay from "../../components/display/LineDisplay";


const CreateOrEditBlock = observer(({block, mode}) => {

    const {block_store} = useContext(Context);

    // возвращаемые "наверх" значения
    const isEmpty = block.hasOwnProperty("fakeParam");
    const prevLinesIdList = isEmpty ? [] : block.lines.map(line => line.id)

    const [isNews, setIsNews] = useState(isEmpty ? false : block.isNews);
    const [header, setHeader] = useState(isEmpty ? "" : block.header);
    const [pageLink, setPageLink] = useState(isEmpty ? "" : block.pageLink);
    const [ordinal, setOrdinal] = useState(mode !== "edit" ? -1 : block.ordinal);
    const [lines, setLines] = useState(isEmpty ? [] : block.lines.sort((line1, line2) => line1.lineOrdinal - line2.lineOrdinal));

    const [doUpdateUsages, setDoUpdateUsages] = useState(false);
    const [removedLineIndex, setRemovedLineIndex] = useState(-1);
    const [lineKind, setLineKind] = useState(0);
    const [saveMessage, setSaveMessage] = useState("");


    useEffect(() => {
        if (!isEmpty) {
            setIsNews(block.isNews)
            setHeader(block.header)
            setOrdinal(block.ordinal)
            setPageLink(block.pageLink !== null ? block.pageLink : "")
            setLines(block.lines !== undefined ? block.lines : [])
            document.getElementById('header').value = block.header
        }
        if (checkSameLineOrdinal()) {
            setLines(lines.map(line => ({...line, "lineOrdinal": lines.indexOf(line)})))
        }
    }, [block])

    useEffect(() => {
        saveMessage.length > 0 && alert(saveMessage)
    }, [saveMessage])


    useEffect(() => {
        if (pageLink !== ""){
            setOrdinal(Array.from(block_store.blocks.filter(block => block.pageLink === pageLink).sort((block1, block2) => block2.ordinal - block1.ordinal))[0].ordinal + 1)
        }
    }, [pageLink])


    const addLine = () => {
        if (lineKind > 0) {
            setLines([...lines, {
                lineOrdinal: (lines.length > 0 ? lines.sort((a, b) => a.lineOrdinal - b.lineOrdinal).at(-1).lineOrdinal + 1 : 0),
                kind: lineKind,
                params: {},
                text: [""],
                filesNames: [],
                addressFileType: ""
            }])
        }
    }

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
        if (isDataValid()) {
            const formData = new FormData()
            block.id && mode === "edit" && formData.append("id", block.id)
            formData.append("isNews", isNews)
            formData.append("header", header);
            !isNews ? formData.append("pageLink", pageLink) : formData.append("pageLink", "/news");
            if (!isNews) {
                if (ordinal) {
                    formData.append("ordinal", `${ordinal}`);
                } else {
                    formData.append("ordinal", `${getNewOrdinal()}`)
                }
            }
            formData.append("lines", JSON.stringify(lines))
            formData.append("prevLinesIdList", JSON.stringify(prevLinesIdList))

            mode === "edit" ?
                updateBlock(formData).then(data => {
                    if (data && data.hasOwnProperty("id")) {
                        refetchAllContent(block_store)
                        setDoUpdateUsages(true)
                        setSaveMessage("Блок успешно обновлен")
                        setTimeout(() => setDoUpdateUsages(false), 2000)
                    } else {
                        setSaveMessage("Произошла ошибка на сервере")
                    }
                })
                :
                createBlock(formData).then(data => {
                    console.log(0)
                    if (data && data.hasOwnProperty("id")) {
                        refetchAllContent(block_store)
                        setDoUpdateUsages(true)
                        setSaveMessage("Блок успешно обновлен")
                        setTimeout(() => setDoUpdateUsages(false), 2000)
                    } else {
                        setSaveMessage("Произошла ошибка на сервере")
                    }
                });
        } else {
            setSaveMessage("Заполнены не все обязательные поля")
        }
    };

    const getMaxLineOrdinal = () => {
        return lines.reduce((a, b) => a.lineOrdinal > b.lineOrdinal ? a : b).lineOrdinal
    }

    const getNewOrdinal = () => {
        let obj = block_store.blocks.filter(block => block.pageLink === pageLink).sort((a, b) => a.ordinal - b.ordinal).at(-1)
        return obj ? obj.ordinal + 1 : 1;
    }

    const chooseLineType = (event) => {
        const elements = document.querySelectorAll('.line_type');
        elements.forEach((element) => {
            element.classList.remove('type_active');
        });
        event.currentTarget.classList.add('type_active');
        setLineKind(+event.currentTarget.getAttribute('kind'));
    }

    const checkSameLineOrdinal = () => {
        const set = new Set();
        for (let i = 0; i < lines.length; i++) {
            const value = lines[i]["lineOrdinal"];
            if (set.has(value)) {
                // Найдено дублирующееся значение
                return true;
            }
            set.add(value);
        }
        // Нет дублирующихся значений
        return false;
    }

    useEffect(() => {
        console.log(header);
    }, [header])

    const isDataValid = () => {
        console.log(lines.length > 0, lines)
        return (isNews !== null && pageLink && header && lines && pageLink.length > 0 && header.trim().length > 0 && lines.length > 0)
    }


    return (
        <div>
            <div className="block_settings">
                {!isNews &&
                    <div>
                        <p>Выберите страницу</p>
                        <label className="custom_select">
                            <select id="pageLink" value={pageLink} onChange={e => {
                                setPageLink(e.target.value)
                            }}>
                                <option value="" disabled="disabled">Выберите страницу</option>
                                {publicRoutes.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0)).map((publicRoute) => (
                                    <option key={publicRoute.name}
                                            value={publicRoute.path}>{publicRoute.name}</option>
                                ))}
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                    </div>
                }
                <div>
                    <p>Тип блока</p>
                    <label className="custom_select">
                        <select id="isNews" value={isNews} onChange={e => {
                            if (e.target.value === "")
                                setIsNews(undefined)
                            else
                                setIsNews(e.target.value === "true")
                        }}>
                            <option value="">Выберите тип блока</option>
                            <option value="true">Новостной</option>
                            <option value="false">Для страницы</option>
                        </select>
                        <svg>
                            <use xlinkHref="#select-arrow-down"></use>
                        </svg>
                    </label>
                </div>
                <div>
                    <p>Заголовок блока</p>
                    <input
                        placeholder={!isNews ? "Введите заголовок, он будет отображаться вверху карточки и на боковой панели содержания" : "Введите заголовок новости"}
                        id="header" onChange={(e) => setHeader(e.target.value)}/>
                </div>
            </div>
            <div className="add_line_container">
                <p className="add_line_title">Добавить линию</p>
                <div className="line_type_container">
                    <div className="line_type" onClick={chooseLineType} kind='1'>
                        <img src={text} alt=""/>
                        Текст
                    </div>
                    <div className="line_type" onClick={chooseLineType} kind='2'>
                        <img src={image} alt=""/>
                        Изображение
                    </div>
                    <div className="line_type" onClick={chooseLineType} kind='4'>
                        <img src={imageAdd} alt=""/>
                        Слайдер изображений
                    </div>
                    <div className="line_type" onClick={chooseLineType} kind='5'>
                        <img src={video} alt=""/>
                        Видео
                    </div>
                    <div className="line_type" onClick={chooseLineType} kind='3'>
                        <img src={text} alt=""/>+<img src={image} alt=""/>
                        Текст + изображение
                    </div>
                    <div className="line_type" onClick={chooseLineType} kind='6'>
                        <img src={doc_pic} alt=""/>
                        Документ
                    </div>

                </div>
                <Button buttonName="Добавить новую линию" setChosenValue={addLine}/>

            </div>
            {lines && lines.length > 0 && lines.map(line => {
                    return (
                        <div>
                            <CreateOrEditLine key={line.lineOrdinal} changeLine={changeLine} index={line.lineOrdinal}
                                              currentLine={line} doUpdateUsages={doUpdateUsages}
                                              removedLineIndex={removedLineIndex}/>
                            {/* <div className="line_display">  // Нужно ли нам превью линии сразу после редактора линии,
                                <LineDisplay line={line}/>      // если всё и так отображается в превью блока?
                                                                // Если нужно, то раскомментить, и поправить стили класса
                                                                // .line_display, так как оно зачем-то центрирует всё
                            </div> */}
                            <div className="line_management_container">
                                {line.lineOrdinal > 0 &&
                                    <button onClick={() => swapLines(line.lineOrdinal - 1, line.lineOrdinal)}><img
                                        src={arrow} alt=""/></button>}
                                {line.lineOrdinal < getMaxLineOrdinal() &&
                                    <button onClick={() => swapLines(line.lineOrdinal, line.lineOrdinal + 1)}><img
                                        style={{transform: "rotate(180deg)"}} src={arrow} alt=""/></button>}
                                <button onClick={() => removeLine(line.lineOrdinal)}><img src={trash} alt=""/></button>
                            </div>
                        </div>
                    )
                }
            )}
            {!isNews && <h2 className="block_look_title">Как выглядит блок</h2>}
            {lines && lines.length > 0 &&
                <Block
                    header={header}
                    children={lines.map(e => <LineDisplay line={e} key={e.id}/>)}// FIXME: ох, это ужасный костыль
                />
            }
            <Button className="add_block" setChosenValue={() => {
                saveBlock()
            }} buttonName="Сохранить блок"/>
            <button onClick={() => {
                if (block.id) {
                    removeBlock(block.id).then(data => {
                            if (data && data.hasOwnProperty("id")) {
                                setSaveMessage("Успешно удалено")
                            }
                            window.location.reload();
                        }
                    )
                } else {
                    refetchAllContent(block_store)
                    removeBlock(block_store.blocks.sort((a, b) => a.id - b.id).at(-1).id).then(data => {
                            if (data && data.hasOwnProperty("id")) {
                                setSaveMessage("Успешно удалено")
                            }
                            window.location.reload();
                        }
                    )
                }
            }}>Удалить блок
            </button>
            <svg className="sprites">
                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                </symbol>
            </svg>
        </div>
    )
});

export default CreateOrEditBlock;