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
import OurColorPicker from '../OurColorPicker';


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

    const kind = currentLine.kind
    const params = currentLine.params
    const text = currentLine.text
    const filesNames = currentLine.filesNames
    const addressFileType = currentLine.addressFileType
    const [prevFilesNames, setPrevFilesNames] = useState(currentLine.filesNames)

    useEffect(() => {
        if (document.getElementById('select_ratio' + currentLine.id) !== null) {
            document.getElementById('select_ratio' + currentLine.id).value = (params !== null && params.hasOwnProperty("ratio")) ? params.ratio : 1
        }
        if (document.getElementById('select_color' + currentLine.id) !== null) {
            document.getElementById('select_color' + currentLine.id).value = (params !== null && params.hasOwnProperty("color")) ? params.color : "#0000FF"
        }
        if (document.getElementById('document_name' + currentLine.id) !== null) {
            document.getElementById('document_name' + currentLine.id).value = currentLine.params !== null && currentLine.params.hasOwnProperty("documentName") && currentLine.params.documentName
        }
        if (document.getElementById('global_files' + currentLine.id) !== null && addressFileType === "global") {
            document.getElementById('global_files' + currentLine.id).value = (filesNames !== null) ? filesNames : ""
        }

    }, [])


    useEffect(() => {
        doUpdateUsages && updateUsagesOnSave()
    }, [doUpdateUsages]);

    useEffect(() => {
        if (index === removedLineIndex) {
            (prevFilesNames !== null) && prevFilesNames.forEach(photo => updateFileUsages(photo, -1));
        }
    }, [removedLineIndex]);

    const updateUsagesOnSave = () => {
        console.log(currentLine)
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
            {currentLine.hasOwnProperty("kind") &&
                <>
                    <div>
                        {/*Выбор вида линии*/}
                        {kind > 0 ? <p>{kinds[kind]}</p> : <p>Выберите тип элемента</p>}

                        {/*Выбор параметров*/}
                        <div>

                            {kind === 2 &&
                                <label className="custom_select">
                                    <select id="params"
                                            value={params !== null && params.hasOwnProperty("imgType") && params.imgType}
                                            onChange={e => {
                                                params["imgType"] = e.target.value
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
                                <div className="carusel_params">
                                    {/*Set the size of an image by inputting a number in the field below*/}
                                    <label htmlFor="select_ratio">Введите соотношение сторон фото (ширина/высота) в виде
                                        целого числа или десятичной дроби с точкой:</label>
                                    <input className="pretty_inputs" type="number" id={"select_ratio" + currentLine.id}
                                           pattern="[0-9]+([\.,][0-9]+)?" step="0.1"
                                           value={params !== null && params.hasOwnProperty("ratio") ? params.ratio : null}
                                           onChange={(e) => {
                                               params["ratio"] = Number(e.target.value)
                                               changeLine("params", params, index)
                                           }
                                           }/>

                                    {/*Set the color of the dots by choosing one of the options below*/}
                                    <label htmlFor="select_color">Выберите цвет точек:</label>
                                    <OurColorPicker
                                        type='dots'
                                        onColorPick={(newColor) => {
                                            params["color"] = newColor
                                            // setParams({...params})
                                            changeLine("params", params, index)
                                        }}
                                    />
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
                                {(kind === 3 || kind === 2) &&
                                    <div>
                                        <label className="file_chooser">
                                            <input type="file" accept="image/*" onChange={async (e) => {
                                                changeLine("addressFileType", "local", index)
                                                let array = Array.from(e.target.files)
                                                let list = selectFile(array, block_store)
                                                console.log(list)
                                                changeLine("filesNames", list, index)
                                            }}/>
                                            <p><img alt="" src={load}/><br/>Загрузить изображение</p>
                                        </label>
                                        <label className="custom_select multiline_select">
                                            <select size="5" onChange={e => {
                                                let fileList = []
                                                fileList = [...e.target.selectedOptions]
                                                    .map(option => option.value);
                                                changeLine("addressFileType", "local", index)
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
                                        <label className="file_chooser">
                                            <input className="pretty_inputs" type="file" multiple accept="image/*"
                                                   onChange={async (e) => {
                                                       changeLine("addressFileType", "local", index)
                                                       console.log("local")
                                                       let list = selectFile(Array.from(e.target.files), block_store)
                                                       changeLine("filesNames", list, index)
                                                       console.log(Array.from(e.target.files))
                                                   }}/>
                                            <p><img alt="" src={load}/><br/>Загрузить изображение</p>
                                        </label>
                                        <label htmlFor="links">Введите ссылки на картинки: </label>
                                        <input className="pretty_inputs" style={{marginBottom: "20px"}} type="text"
                                               id={"global_files" + currentLine.id}
                                               onChange={(e) => {
                                                   changeLine("addressFileType", "global", index)
                                                   changeLine("filesNames", e.target.value.split("; "), index)
                                               }}/>
                                        <label className="custom_select multiline_select">
                                            <select size="10" multiple onChange={e => {
                                                let fileList = [...e.target.selectedOptions]
                                                    .map(option => option.value);
                                                changeLine("addressFileType", "local", index)
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
                                {kind === 5 &&
                                    <input placeholder="Введите ссылку" type="text" id={"global_files" + currentLine.id}
                                           onChange={(e) => {
                                               changeLine("filesNames", [e.target.value], index)
                                           }}
                                    />
                                }

                                {kind === 6 && <div>
                                    <input placeholder="Введите название документа" className="pretty_inputs"
                                           type="text" id={"document_name" + currentLine.id}
                                           value={params !== null && params.documentName ? params.documentName : null}
                                           onChange={(e) => {
                                               params["documentName"] = e.target.value
                                               changeLine("params", params, index)
                                           }
                                           }/>
                                    <label className="file_chooser">
                                        <input type="file" onChange={(e) => {
                                            console.log(e.target.files[0])
                                            changeLine("addressFileType", "local", index)
                                            const list = selectFile(Array.from(e.target.files), block_store)
                                            changeLine("filesNames", list, index)
                                        }}/>
                                        <p><img alt="" src={load}/><br/>Загрузить файл</p>
                                    </label>
                                    <input style={{marginBottom: "20px"}} type="text" id={"global_files" + currentLine.id}
                                           onChange={(e) => {
                                               changeLine("addressFileType", "global", index)
                                               changeLine("filesNames", [e.target.value], index)
                                           }}/>

                                    <label className="custom_select multiline_select">
                                        <select size="10" onChange={e => {
                                            let fileList = []
                                            fileList = [...e.target.selectedOptions]
                                                .map(option => option.value);
                                            changeLine("addressFileType", "local", index)
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
                        <ExtendedTextEditor 
                            text={text[0]}
                            setText={(val) => changeLine("text", [val], index)}
                            // changeLine={changeLine}
                            index={index}      
                        />
                    }

                    {currentLine.kind === 1 &&
                        <TextLineEditor
                            line={currentLine}
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