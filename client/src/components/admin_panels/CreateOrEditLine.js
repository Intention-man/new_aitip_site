// Линия - составной элемент блока

import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import MDEditor, {commands} from "@uiw/react-md-editor";
import Card from "../lines/Card"
import {convertFiles} from "../../http/blockAPI";
import Carusel from "../Carusel";
import "../../css/component_styles/Editor.css"
import "../../css/component_styles/CreateLine.css"
import LineDisplay from "../LineDisplay";
import ExtendedTextEditor from "../ExtendedTextEditor";


const CreateOrEditLine = observer(({index, changeLine, line}) => {
    console.log(line)

    const kinds = {
        1: "Текст/список/подзаголовок",
        2: "Большая картинка",
        3: "Картинка + текст - в 2 столбика",
        4: "Карусель",
        5: "Видео",
        6: "Документ"
    }

    const [kind, setKind] = useState(0);
    const [params, setParams] = useState([]);
    const [text, setText] = useState("");
    const [filesNames, setFilesNames] = useState([])
    const [addressFileType, setAddressFileType] = useState("");
    const [size, setSize] = useState(1);
    const [dotColor, setDotColor] = useState("#000000");
    const [docNames, setDocNames] = useState("");
    console.log(kind)
    
    useEffect(() => {
        if (kind === 4) {
            setParams([size, dotColor, docNames])
            changeLine("params", [size, dotColor, docNames], index)
            console.log([size, dotColor, docNames])
        }
    }, [size, dotColor, docNames])

    useEffect(() => {
        console.log("useeffect", line)
        setKind(line.kind);
        setParams(line.params);
        setText(line.text)
        setFilesNames(line.filesNames)
        setAddressFileType(line.addressFileType)
        setSize(line.kind === 4 ? line.params[0] : 1)
        setDotColor(line.kind === 4 ? line.params[1] : "#000000")
        setDocNames("")
    }, [line]);

    const addFiles = (files) => {
        const formData = new FormData();
        files.forEach(el => formData.append("files", el));
        console.log(files)
        convertFiles(formData).then(list => {
            setFilesNames(list);
            changeLine("filesNames", list, index)
        });
    }

    return (
        <div style={{margin: "30px 10px", borderColor: "blue", borderWidth: "3px"}}>
            <div>
                <div>
                    {kind > 0 ? <p>Выбранный тип: {kinds[kind]}</p> : <p>Выберите тип элемента</p>}

                    <select id="kind" value={kind} onChange={e => {
                        console.log(e.target.value)
                        setKind(Number(e.target.value))
                        changeLine("kind", Number(e.target.value), index)
                    }}>
                        <option value="0">Выберите тип элемента</option>
                        <option value="1">Текст/список/подзаголовок</option>
                        <option value="2">Большая картинка</option>
                        <option value="3">Картинка + текст - в 2 столбика</option>
                        <option value="4">Карусель</option>
                        <option value="5">Видео</option>
                        <option value="6">Документ</option>
                    </select>
                </div>


                {(kind >= 2 && kind <= 4) &&
                    <div style={{margin: "30px 0"}}>
                        {params.length > 0 ? <p>Выбранный(-е) параметр(-ы): {params.length > 0 && params.map((param) => (
                            <p>
                                {param}
                            </p>
                        ))}
                        </p> : <p>Выберите параметры</p>}

                        {kind === 2 &&
                            <select id="params" value={params[0]} onChange={e => {
                                setParams(Array.from(e.target.value))
                                changeLine("param", [e.target.value], index)
                            }}>
                                <option value="none">Выберите тип картинки</option>
                                <option value="fading">С градиентом</option>
                                <option value="normal">Без градиента</option>
                            </select>
                        }
                        
                        {kind === 3 &&
                            <select id="params" value={params[0]} onChange={e => {
                                setParams(e.target.value.split(" "))
                                changeLine("param", e.target.value.split(" "), index)
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
                                <input className="pretty_inputs" type="number" id="name" value={size} onChange={(e) => {
                                    setSize(Number(e.target.value))
                                }
                                }/>

                                {/*Set the color of the dots by choosing one of the options below*/}
                                <label htmlFor="name">Выберите цвет точек:</label>
                                <input className="pretty_inputs" style={{height: "25px"}} type="color" id="name" value={dotColor} onChange={(e) => {
                                    setDotColor(e.target.value)
                                }}/>
                            </div>
                        }
                    </div>
                }


                {kind > 1 &&
                    <div style={{margin: "30px 0"}}>
                        {filesNames.length > 0 ? <p>Выбранный(-е) файл(-ы): {filesNames.map((filesName) => (
                                <p>
                                    {filesName}
                                </p>
                            ))}</p> :
                            <p>Выберите файл(-ы)</p>}
                        {(kind === 3 || kind === 2) &&
                            <div>
                                <input type="file" accept="image/*" onChange={(e) => {
                                    setAddressFileType("local")
                                    changeLine("addressFileType", "local", index)
                                    addFiles(Array.from(e.target.files))
                                }}/>
                                <input type="text" onChange={(e) => {
                                    setAddressFileType("global")
                                    changeLine("addressFileType", "global", index)
                                    setFilesNames([e.target.value])
                                    changeLine("filesNames",[e.target.value], index)
                                }}/>
                            </div>
                        }

                        {kind === 4 &&
                            <div>
                                <input className="pretty_inputs" type="file" multiple accept="image/*" onChange={(e) => {
                                    setAddressFileType("local")
                                    changeLine("addressFileType", "local", index)
                                    addFiles(Array.from(e.target.files))
                                }}/>
                                <label htmlFor="links">Введите ссылки на картинки: </label>
                                <input className="pretty_inputs" style={{marginBottom: "20px"}} type="text" id="links" onChange={(e) => {
                                    setAddressFileType("global")
                                    changeLine("addressFileType", "global", index)
                                    setFilesNames(e.target.value.split("; "))
                                    changeLine("filesNames", e.target.value.split("; "), index)
                                }}/>
                            </div>
                        }
                        {kind === 5 &&
                            <input type="text" onChange={(e) => {
                                setFilesNames([e.target.value])
                                changeLine("filesNames", [e.target.value], index)
                            }}
                            />
                        }

                        {/*Для документов добавление и вывод пока не сделаны*/}
                        {kind === 6 &&
                            <div>
                                <input type="file" onChange={(e) => {
                                    console.log(e.target.files[0])
                                    setAddressFileType("local")
                                    changeLine("addressFileType", "local", index)
                                    addFiles(Array.from(e.target.files))
                                }}/>

                                <input type="text" onChange={(e) => {
                                    setAddressFileType("global")
                                    changeLine("addressFileType", "global", index)
                                    setFilesNames([e.target.value])
                                }}/>

                                <label>Введите название документа (которое будут видеть пользователи на сайте)</label>
                                <input type="text" onChange={(e) => {
                                    setDocNames(e.target.value)
                                }}/>
                            </div>
                        }
                    </div>}
            </div>

            {/* Появление зоны редактирования текста*/}
                {(kind === 1 || kind === 3) &&
                    <ExtendedTextEditor text={text} setText={setText} changeLine={changeLine} index={index}/>
                }
        </div>
    );
});

export default CreateOrEditLine;