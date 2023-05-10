// Линия - составной элемент блока

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "../../css/component_styles/Editor.css"
import "../../css/component_styles/CreateLine.css"
import {Context} from "../../index";
import {selectFile, updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import TextLineEditor from "./TextLineEditor";
import ExtendedTextEditor from "../../components/lines/ExtendedTextEditor";
import load from "../../local_assets/icons/directbox-receive.svg"


const CreateOrEditLine = observer(({index, changeLine, currentLine, doUpdateUsages, removedLineIndex}) => {

    const {block_store} = useContext(Context)

    const kinds = {
        1: "Текст",
        2: "Большая картинка",
        3: "Картинка + текст - в 2 столбика",
        4: "Карусель",
        5: "Видео",
        6: "Документ",
    };

    const [kind, setKind] = useState(currentLine.kind);
    const [params, setParams] = useState(currentLine.params);
    const [text, setText] = useState(currentLine.text);
    const [filesNames, setFilesNames] = useState(currentLine.filesNames);
    const [addressFileType, setAddressFileType] = useState(currentLine.addressFileType);
    const [prevFilesNames, setPrevFilesNames] = useState(currentLine.filesNames)
    const [line, setLine] = useState({...currentLine});

    useEffect(() => {
        if (document.getElementById('select_ratio' + line.id) !== null) {
            document.getElementById('select_ratio' + line.id).value = (params !== null && params.hasOwnProperty("ratio")) ? params.ratio : 1
        }
        if (document.getElementById('select_color' + line.id) !== null) {
            document.getElementById('select_color' + line.id).value = (params !== null && params.hasOwnProperty("color")) ? params.color : "#0000FF"
        }
        if (document.getElementById('document_name' + line.id) !== null) {
            document.getElementById('document_name' + line.id).value = (params !== null && params.hasOwnProperty("documentName")) ? params.documentName : ""
        }
        if (document.getElementById('global_files' + line.id) !== null && addressFileType === "global") {
            document.getElementById('global_files' + line.id).value = (filesNames !== null) ? filesNames : ""
        }

    }, [])

    useEffect(() => {
        setKind(currentLine.kind)
        setText(currentLine.text)
        setFilesNames(currentLine.filesNames)
        setAddressFileType(currentLine.addressFileType)
        setPrevFilesNames(currentLine.filesNames)
    }, [currentLine]);

    useEffect(() => {
        doUpdateUsages && updateUsagesOnSave()
    }, [doUpdateUsages]);

    useEffect(() => {
        if (index === removedLineIndex) {
            (prevFilesNames !== null) && prevFilesNames.forEach(photo => updateFileUsages(photo, -1));
        }
    }, [removedLineIndex]);


    const updateUsagesOnSave = () => {
        console.log(line)
        let concatPhotosList = prevFilesNames.length > 0 ? filesNames.concat(prevFilesNames.filter((item) => filesNames.indexOf(item) < 0)) : [...filesNames];
        concatPhotosList.forEach(photo => {
                if (!prevFilesNames.includes(photo) && filesNames.includes(photo)) {
                    updateFileUsages(photo, 1);
                } else if (prevFilesNames.includes(photo) && !filesNames.includes(photo)) {
                    updateFileUsages(photo, -1);
                }
            }
        )
        setPrevFilesNames(filesNames)
    }

    return (
        // TODO: желательно отрефакторить этот код, разнести каждый элемент управления по отдельным компонентам

        <div className="line_container">
            {line !== undefined && line.hasOwnProperty("kind") &&
                <>
                    <div>
                        {/*Выбор вида линии*/}
                        {/*<div>*/}
                        {kind > 0 ? <p>{kinds[kind]}</p> : <p>Выберите тип элемента</p>}

                        {/*<select id="kind" value={kind} onChange={e => {
                                setKind(Number(e.target.value))
                                changeLine("kind", Number(e.target.value), index)
                                setParams({})
                                changeLine("params", {}, index)
                            }}>
                                <option value="0">Выберите тип элемента</option>
                                {
                                    Object.entries(kinds).map(entry =>
                                        <option key={parseInt(entry[0])} value={entry[0]}>{entry[1]}</option>
                                    )
                                }
                            </select>*/}
                        {/*</div>*/}

                        {/*Выбор параметров*/}
                        <div>
                            {/* {params.length > 0 ?
                                <p>Выбранный(-е) параметр(-ы): {params.length > 0 && params.map((param) => (
                                    <p>
                                        {param}
                                    </p>
                                ))}
                                </p> : <p>Выберите параметры</p>}*/}

                            {kind === 2 &&
                                <label className="custom_select">
                                    <select id="params"
                                            value={params !== null && params.hasOwnProperty("imgType") && params.imgType}
                                            onChange={e => {
                                                params["imgType"] = e.target.value
                                                setParams({...params})
                                                changeLine("params", params, index)
                                            }}>
                                        <option value="none" disabled="disabled" selected>Выберите тип картинки</option>
                                        <option value="fading">С градиентом</option>
                                        <option value="normal">Без градиента</option>
                                    </select>
                                    <svg>
                                        <use xlinkHref="#select-arrow-down"></use>
                                    </svg>
                                </label>
                            }

                            {kind === 3 &&
                                <label className="custom_select">
                                    <select id="params"
                                            value={(params !== null && params.hasOwnProperty("imgType") && params.imgType) + " " + (params !== null && params.hasOwnProperty("side") && params.side)}
                                            onChange={e => {
                                                let val = e.target.value.split(" ")
                                                params["imgType"] = val[0];
                                                if (val.length > 1) {
                                                    params["side"] = val[1];
                                                }
                                                setParams({...params})
                                                changeLine("params", params, index)
                                            }}>
                                        <option value="none">Выберите тип картинки</option>
                                        <option value="fading left">С градиентом слева</option>
                                        <option value="fading right">С градиентом справа</option>
                                        <option value="normal left">Без градиента слева</option>
                                        <option value="normal right">Без градиента справа</option>
                                        <option value="rounded left">Круглая слева</option>
                                        <option value="rounded right">Круглая справа</option>
                                    </select>
                                    <svg>
                                        <use xlinkHref="#select-arrow-down"></use>
                                    </svg>
                                </label>
                            }

                            {kind === 4 &&
                                <div>
                                    {/*Set the size of an image by inputting a number in the field below*/}
                                    <label htmlFor="select_ratio">Введите соотношение сторон фото (высота/ширина) в виде
                                        целого числа или десятичной дроби с точкой:</label>
                                    <input className="pretty_inputs" type="number" id={"select_ratio" + line.id}
                                           pattern="[0-9]+([\.,][0-9]+)?" step="0.1"
                                           value={params !== null && params.hasOwnProperty("ratio") ? params.ratio : null}
                                           onChange={(e) => {
                                               params["ratio"] = Number(e.target.value)
                                               setParams({...params})
                                               changeLine("params", params, index)
                                               // setSize(Number(e.target.value))
                                           }
                                           }/>

                                    {/*Set the color of the dots by choosing one of the options below*/}
                                    <label htmlFor="select_color">Выберите цвет точек:</label>
                                    <input className="pretty_inputs" style={{height: "25px"}} type="color"
                                           id={"select_color" + line.id}
                                           value={params !== null && params.hasOwnProperty("color") ? params.color : null}
                                           onChange={(e) => {
                                               params["color"] = e.target.value
                                               setParams({...params})
                                               changeLine("params", params, index)
                                               // setDotColor(e.target.value)
                                           }}/>
                                </div>
                            }

                            {kind === 6 &&
                                <div>
                                    {/*<label htmlFor="document_name">Введите название документа</label>*/}
                                </div>
                            }
                        </div>

                        {kind > 1 && kind !== 7 &&
                            <div style={{margin: "15px 0"}}>
                                {/*{filesNames.length > 0 ? <div>Выбранный(-е) файл(-ы): {filesNames.map((filesName) => (*/}
                                {/*        <p>*/}
                                {/*            {filesName}*/}
                                {/*        </p>*/}
                                {/*    ))}</div> :*/}
                                {/*    <p>Выберите файл(-ы)</p>}*/}
                                {(kind === 3 || kind === 2) &&
                                    <div>
                                        <label className="file_chooser">
                                            <input type="file" accept="image/*" onChange={async (e) => {
                                                setAddressFileType("local")
                                                changeLine("addressFileType", "local", index)
                                                let array = Array.from(e.target.files)
                                                let list = selectFile(array, block_store)
                                                console.log(list)
                                                setFilesNames(Array.from(list));
                                                changeLine("filesNames", list, index)
                                                // addFiles(Array.from(e.target.files))
                                            }}/>
                                            <p><img alt="" src={load}/><br/>Загрузить изображение</p>
                                        </label>
                                        {/* <input type="text" id={"global_files" + line.id} onChange={(e) => {
                                            setAddressFileType("global")
                                            changeLine("addressFileType", "global", index)
                                            setFilesNames([e.target.value])
                                            changeLine("filesNames", [e.target.value], index)
                                        }}/>*/}
                                        <label className="custom_select multiline_select">
                                            <select size="5" onChange={e => {
                                                let fileList = []
                                                fileList = [...e.target.selectedOptions]
                                                    .map(option => option.value);
                                                setAddressFileType("local")
                                                changeLine("addressFileType", "local", index)
                                                setFilesNames(fileList)
                                                changeLine("filesNames", fileList, index)
                                                console.log(fileList)
                                            }}>
                                                {block_store.allFiles.map(file =>
                                                    <option value={file.fileLink}>
                                                        {file.name}
                                                    </option>
                                                )}
                                            </select>
                                        </label>
                                    </div>
                                }

                                {kind === 4 &&
                                    <div>
                                        <input className="pretty_inputs" type="file" multiple accept="image/*"
                                               onChange={async (e) => {
                                                   setAddressFileType("local")
                                                   changeLine("addressFileType", "local", index)
                                                   console.log("local")
                                                   // try {
                                                   //     const list =selectFile(Array.from(e.target.files), block_store);
                                                   //     setFilesNames(list);
                                                   // } catch (error) {
                                                   //     console.error(error);
                                                   // }
                                                   let list = selectFile(Array.from(e.target.files), block_store)
                                                   setFilesNames(list);
                                                   changeLine("filesNames", list, index)
                                                   // addFiles(Array.from(e.target.files))
                                                   console.log(Array.from(e.target.files))
                                               }}/>
                                        <label htmlFor="links">Введите ссылки на картинки: </label>
                                        <input className="pretty_inputs" style={{marginBottom: "20px"}} type="text"
                                               id={"global_files" + line.id}
                                               onChange={(e) => {
                                                   setAddressFileType("global")
                                                   changeLine("addressFileType", "global", index)
                                                   setFilesNames(e.target.value.split("; "))
                                                   changeLine("filesNames", e.target.value.split("; "), index)
                                               }}/>
                                        <select size="10" multiple onChange={e => {
                                            let fileList = []
                                            fileList = [...e.target.selectedOptions]
                                                .map(option => option.value);
                                            setAddressFileType("local")
                                            changeLine("addressFileType", "local", index)
                                            setFilesNames(fileList)
                                            changeLine("filesNames", fileList, index)
                                            console.log(fileList)
                                        }}>
                                            {block_store.allFiles.map(file =>
                                                <option value={file.fileLink}>
                                                    {file.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                }
                                {kind === 5 &&
                                    <input placeholder="Введите ссылку" type="text" id={"global_files" + line.id}
                                           onChange={(e) => {
                                               setFilesNames([e.target.value])
                                               changeLine("filesNames", [e.target.value], index)
                                           }}
                                    />
                                }

                                {kind === 6 && <div>
                                    <input placeholder="Введите название документа" className="pretty_inputs"
                                           type="text" id={"document_name" + line.id}
                                           value={params !== null && params.documentName ? params.documentName : null}
                                           onChange={(e) => {
                                               params["documentName"] = e.target.value
                                               setParams({...params})
                                               changeLine("params", params, index)
                                           }
                                           }/>
                                    <label className="file_chooser">
                                        <input type="file" onChange={(e) => {
                                            console.log(e.target.files[0])
                                            setAddressFileType("local")
                                            changeLine("addressFileType", "local", index)
                                            const list = selectFile(Array.from(e.target.files), block_store)
                                            setFilesNames(list);
                                            changeLine("filesNames", list, index)
                                            // addFiles(Array.from(e.target.files))
                                        }}/>
                                        <p><img alt="" src={load}/><br/>Загрузить файл</p>
                                    </label>
                                    <input style={{marginBottom: "20px"}} type="text" id={"global_files" + line.id}
                                           onChange={(e) => {
                                               setAddressFileType("global")
                                               changeLine("addressFileType", "global", index)
                                               setFilesNames([e.target.value])
                                               changeLine("filesNames", [e.target.value], index)
                                           }}/>

                                    <label className="custom_select multiline_select">
                                        <select size="10" onChange={e => {
                                            let fileList = []
                                            fileList = [...e.target.selectedOptions]
                                                .map(option => option.value);
                                            setAddressFileType("local")
                                            changeLine("addressFileType", "local", index)
                                            setFilesNames(fileList)
                                            changeLine("filesNames", fileList, index)
                                            console.log(fileList)
                                        }}>
                                            {block_store.allFiles.map(file =>
                                                <option value={file.fileLink}>
                                                    {file.name}
                                                </option>
                                            )}
                                        </select>
                                        <svg>
                                            <use xlinkHref="#select-arrow-down"></use>
                                        </svg>
                                    </label>
                                </div>
                                }
                            </div>}
                    </div>

                    {/* Появление зоны редактирования текста*/}
                    {kind === 3 &&
                        <ExtendedTextEditor text={text[0]} setText={(t) => setText([t])} changeLine={changeLine}
                                            index={index}/>
                    }

                    {kind === 1 &&
                        <TextLineEditor
                            line={line}
                            changeLine={changeLine}
                            index={index}
                        />
                    }
                </>
            }
        </div>
    );
});

export default CreateOrEditLine;