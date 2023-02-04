// Линия - составной элемент карточки

import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import MDEditor, {commands} from "@uiw/react-md-editor";
import Card from "../card/Card"
import {convertFiles} from "../../http/blockAPI";
import Carusel from "../Carusel";
import "../../css/component_styles/Editor.css"
import "../../css/component_styles/CreateLine.css"


const CreateLine = observer(({index, changeLine, line}) => {

    const kinds = {
        1: "Текст/список/подзаголовок",
        2: "Большая картинка",
        3: "Картинка + текст - в 2 столбика",
        4: "Карусель",
        5: "Видео",
        6: "Документ"
    }

    const [kind, setKind] = useState(line.kind);
    const [params, setParams] = useState(line.params);
    const [text, setText] = useState(line.text);
    const [filesNames, setFilesNames] = useState(line.filesNames)
    const [addressFileType, setAddressFileType] = useState(line.addressFileType);
    const [size, setSize] = useState(1);
    const [dotColor, setDotColor] = useState("black");
    const [docNames, setDocNames] = useState("");
    
    useEffect(() => {
        kind === 4 && setParams([size, dotColor])
    }, [size, dotColor])

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

                    <select id="kind" onChange={e => {
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


                {(kind === 2 || kind === 3) &&
                    <div style={{margin: "30px 0"}}>
                        {params.length > 0 ? <p>Выбранный(-е) параметр(-ы): {params}</p> : <p>Выберите параметры</p>}

                        {kind === 3 &&
                            <select id="kind" value={params} onChange={e => {
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
                        {kind === 2 &&
                            <select id="param" value={params} onChange={e => {
                                setParams(e.target.value)
                                changeLine("param", [e.target.value], index)
                            }}>
                                <option value="fading">С градиентом</option>
                                <option value="normal">Без градиента</option>
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
                        {filesNames.length > 0 ? <p>Выбранный(-е) файл(-ы): {filesNames}</p> :
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
                            </div>
                        }
                    </div>}

            </div>


            {/* Появление зоны редактирования текста*/}
            <div style={{margin: "30px 0"}}>
                {kind === 1 &&
                    <MDEditor
                        value={text}
                        preview="edit"
                        extraCommands={[commands.fullscreen]}
                        onChange={(val) => {
                            setText(val)
                            changeLine("text", val, index)
                        }}
                    />
                }

                {kind === 3 &&
                    <MDEditor
                        value={text}
                        preview="edit"
                        extraCommands={[commands.fullscreen]}
                        onChange={(val) => {
                            setText(val)
                            changeLine("text", val, index)
                        }}
                    />
                }

            </div>

            {/*Отрисовка линии*/}

            <h2>Как пользователь видит линию</h2>


            {(kind === 1 && text.length > 0) &&
                <MDEditor.Markdown source={text} style={{whiteSpace: 'pre-wrap'}}/>
            }

            {(kind === 2 && (filesNames.length > 0)) && (addressFileType === "global" ?
                    <img style={{width: "60%"}} src={filesNames[0]}/> :
                    <img style={{width: "60%"}} src={process.env.REACT_APP_API_URL + filesNames[0]}/>
            )
            }

            {(kind === 3 && (filesNames.length > 0) && (addressFileType.length > 0)) &&
                <Card
                    imgType={params[0]}
                    imgSrc={addressFileType === "global" ? filesNames[0] : process.env.REACT_APP_API_URL + filesNames[0]}
                    imgPos={params[1]}>
                    <MDEditor.Markdown source={text} style={{whiteSpace: 'pre-wrap'}}/>
                </Card>

            }

            {(kind === 4 && (filesNames.length > 0)) &&
                <Carusel photos={filesNames} adressFileType={addressFileType}></Carusel>
            }

            {(kind === 5 && (filesNames.length > 0)) &&
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${filesNames[0].split("/")[3]}`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            }

            {(kind === 6 && (filesNames.length > 0)) &&
                <div>
                    <a href={addressFileType === "global" ? filesNames[0] : process.env.REACT_APP_API_URL + filesNames[0]}
                       download target="_blank">Скачать документ</a>
                </div>
            }


            {/*Кнопки добавления и удаления*/}

            {/*<footer style={{margin: "30px 0"}}>*/}
            {/*    /!*<Button variant="outline-success" onClick={() => {*!/*/}
            {/*    /!*    // setLines(lines.map(i => i.))*!/*/}
            {/*    /!*    // setTests(tests.map(i => i.number === number ? {...i, [key]: value} : i))*!/*/}
            {/*    /!*    addLine()*!/*/}
            {/*    /!*}}>*!/*/}
            {/*    /!*    Добавить линию*!/*/}
            {/*    /!*</Button>*!/*/}
            {/*    <Button variant="outline-danger">*/}
            {/*        Удалить*/}
            {/*    </Button>*/}

            {/*</footer>*/}
            {/*<p>*Костыль ради отступа*</p>*/}


        </div>
    );
});

export default CreateLine;