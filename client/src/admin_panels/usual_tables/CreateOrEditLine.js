// Линия - составной элемент блока

import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {convertFiles} from "../../http/commonAPI";
import ExtendedTextEditor from "../lines/ExtendedTextEditor";
import TextLineEditor from './LineEditors/TextLineEditor';
import "../../css/component_styles/Editor.css"
import "../../css/component_styles/CreateLine.css"
import {selectFile, updateFileUsages} from "../commonPanelsFunctions";
import {useContext} from "react";
import {Context} from "../../index";
import LineDisplay from "../permanent/LineDisplay";


const CreateOrEditLine = observer(({index, changeLine, currentLine, doUpdateUsages, removedLineIndex}) => {
    const {block_store} = useContext(Context)

    const kinds = {
        1: "Текст/список/подзаголовок",
        2: "Большая картинка",
        3: "Картинка + текст - в 2 столбика",
        4: "Карусель",
        5: "Видео",
        6: "Документ",
    };


    const [kind, setKind] = useState(0);
    const [params, setParams] = useState({});
    const [text, setText] = useState([""]);
    const [filesNames, setFilesNames] = useState([])
    const [addressFileType, setAddressFileType] = useState("");
    // const [size, setSize] = useState(1);
    // const [dotColor, setDotColor] = useState("#000000");
    // const [docNames, setDocNames] = useState("");
    const [prevFilesNames, setPrevFilesNames] = useState([])

    const [line, setLine] = useState({kind, params, text, filesNames, addressFileType});


    // useEffect(() => {
    //     if (kind === 4) {
    //         setParams([size, dotColor, docNames])
    //         changeLine("params", [size, dotColor, docNames], index)
    //         console.log([size, dotColor, docNames])
    //     }
    // }, [size, dotColor, docNames])

    useEffect(() => {
        console.log("useeffect", line)
        setKind(line.kind);
        setParams(line.params);
        setText(line.text)
        setFilesNames(line.filesNames)
        setAddressFileType(line.addressFileType)
        // setSize(line.kind === 4 ? line.params[0] : 1)
        // setDotColor(line.kind === 4 ? line.params[1] : "#000000")
        // setDocNames("")
    }, [line]);

    useEffect(() => {
        line.kind = kind
        line.params = params
        line.text = text
        line.filesNames = filesNames
        line.addressFileType = addressFileType
        console.log(line)
    }, [kind, params, text, filesNames, addressFileType]);

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


    // const addFiles = (files) => {
    //     const formData = new FormData();
    //     files.forEach(el => formData.append("files", el));
    //     console.log(files)
    //     convertFiles(formData).then(list => {
    //         setFilesNames(list);
    //         changeLine("filesNames", list, index)
    //     });
    // }


    return (
        // TODO: желательно отрефакторить этот код, разнести каждый элемент управления по отдельным компонентам

        <div style={{margin: "30px 10px", borderColor: "blue", borderWidth: "3px"}}>
            {line !== undefined && line.hasOwnProperty("kind") &&
                <>
                    <div>
                        {/*Выбор вида линии*/}
                        <div>
                            {kind > 0 ? <p>Выбранный тип: {kinds[kind]}</p> : <p>Выберите тип элемента</p>}

                            <select id="kind" value={kind} onChange={e => {
                                setKind(Number(e.target.value))
                                changeLine("kind", Number(e.target.value), index)
                            }}>
                                <option value="0">Выберите тип элемента</option>
                                {
                                    Object.entries(kinds).map(entry =>
                                        <option key={parseInt(entry[0])} value={entry[0]}>{entry[1]}</option>
                                    )
                                }
                            </select>
                        </div>

                        {/*Выбор параметров*/}
                        <div style={{margin: "30px 0"}}>
                            {/*{params.length > 0 ?*/}
                            {/*    <p>Выбранный(-е) параметр(-ы): {params.length > 0 && params.map((param) => (*/}
                            {/*        <p>*/}
                            {/*            {param}*/}
                            {/*        </p>*/}
                            {/*    ))}*/}
                            {/*    </p> : <p>Выберите параметры</p>}*/}

                            {kind === 2 &&
                                <select id="params" value={params.imgType} onChange={e => {
                                    params["imgType"] = e.target.value
                                    setParams({...params})
                                    changeLine("params", params, index)
                                }}>
                                    <option value="none">Выберите тип картинки</option>
                                    <option value="fading">С градиентом</option>
                                    <option value="normal">Без градиента</option>
                                </select>
                            }

                            {kind === 3 &&
                                <select id="params" value={params.imgType + " " + params.side} onChange={e => {
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
                            }

                            {kind === 4 &&
                                <div>
                                    {/*Set the size of an image by inputting a number in the field below*/}
                                    <label htmlFor="name">Введите соотношение сторон фото:</label>
                                    <input className="pretty_inputs" type="number" id="name"
                                           value={params.hasOwnProperty("ratio") ? params.ratio : null}
                                           onChange={(e) => {
                                               params["ratio"] = Number(e.target.value)
                                               setParams({...params})
                                               changeLine("params", params, index)
                                               // setSize(Number(e.target.value))
                                           }
                                           }/>

                                    {/*Set the color of the dots by choosing one of the options below*/}
                                    <label htmlFor="name">Выберите цвет точек:</label>
                                    <input className="pretty_inputs" style={{height: "25px"}} type="color" id="name"
                                           value={params.color} onChange={(e) => {
                                        params["color"] = e.target.value
                                        setParams({...params})
                                        changeLine("params", params, index)
                                        // setDotColor(e.target.value)
                                    }}/>
                                </div>
                            }

                            {kind === 6 &&
                                <div>
                                    <label htmlFor="name">Введите название документа</label>
                                    <input className="pretty_inputs" type="text" id="name"
                                           value={params.ratio ? params.ratio : null}
                                           onChange={(e) => {
                                               params["ratio"] = Number(e.target.value)
                                               setParams({...params})
                                               changeLine("params", params, index)
                                               // setSize(Number(e.target.value))
                                           }
                                           }/>
                                </div>
                            }
                        </div>


                        {kind > 1 && kind !== 7 &&
                            <div style={{margin: "30px 0"}}>
                                {filesNames.length > 0 ? <div>Выбранный(-е) файл(-ы): {filesNames.map((filesName) => (
                                        <p>
                                            {filesName}
                                        </p>
                                    ))}</div> :
                                    <p>Выберите файл(-ы)</p>}
                                {(kind === 3 || kind === 2) &&
                                    <div>
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
                                        <input type="text" onChange={(e) => {
                                            setAddressFileType("global")
                                            changeLine("addressFileType", "global", index)
                                            setFilesNames([e.target.value])
                                            changeLine("filesNames", [e.target.value], index)
                                        }}/>
                                        <select size="10" onChange={e => {
                                            let fileList = []
                                            fileList = [...e.target.selectedOptions]
                                                .map(option => option.value);
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

                                {kind === 4 &&
                                    <div>
                                        <input className="pretty_inputs" type="file" multiple accept="image/*"
                                               onChange={async (e) => {
                                                   setAddressFileType("local")
                                                   changeLine("addressFileType", "local", index)
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
                                               id="links"
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
                                    <input type="text" onChange={(e) => {
                                        setFilesNames([e.target.value])
                                        changeLine("filesNames", [e.target.value], index)
                                    }}
                                    />
                                }

                                {kind === 6 &&
                                    <div>
                                        <input type="file" onChange={(e) => {
                                            console.log(e.target.files[0])
                                            setAddressFileType("local")
                                            changeLine("addressFileType", "local", index)
                                            const list = selectFile(Array.from(e.target.files), block_store)
                                            setFilesNames(list);
                                            changeLine("filesNames", list, index)
                                            // addFiles(Array.from(e.target.files))
                                        }}/>

                                        <input type="text" onChange={(e) => {
                                            setAddressFileType("global")
                                            changeLine("addressFileType", "global", index)
                                            setFilesNames([e.target.value])
                                        }}/>
                                        <select size="10" onChange={e => {
                                            let fileList = []
                                            fileList = [...e.target.selectedOptions]
                                                .map(option => option.value);
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

                                        {/*<label>Введите название документа (которое будут видеть пользователи на сайте)</label>*/}
                                        {/*<input type="text" onChange={(e) => {*/}
                                        {/*    setDocNames(e.target.value)*/}
                                        {/*}}/>*/}
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