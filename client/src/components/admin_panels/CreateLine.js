// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useState} from 'react';
import "../../css/component_styles/CreateLine.css"
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import MDEditor, {commands} from "@uiw/react-md-editor";
import Card from "../card/Card"
import {convertImages} from "../../http/cardAPI";
import Carusel from "../Carusel";
import DocumentList from "../DocumentList";

const CreateLine = observer(() => {
    const [kind, setKind] = useState(0);
    const [content, setContent] = useState("");
    const [cardIndex, setCardIndex] = useState(-1);
    const [filesNames, setFilesNames] = useState()
    const [adressFileType, setAdressFileType] = useState("local");
    const [param, setParam] = useState("");
    const [size, setSize] = useState(0);
    const [dotColor, setDotColor] = useState("black");
    const [docNames, setDocNames] = useState();




    const kinds = {
        1: "Текст/список/подзаголовок",
        2: "Большая картинка",
        3: "Картинка + текст - в 2 столбика",
        4: "Карусель",
        5: "Видео",
        6: "Документ"
    }


    const addImage = (imageList) => {
        const formData = new FormData();
        imageList.forEach(el => formData.append("imageList", el));
        console.log(imageList)
        convertImages(formData).then(list => {
            setFilesNames(list);
        });
    }



    let docArray = [];


    const addLine = () => {
        const formData = new FormData()
        formData.append("kind", kind)
        // createCard(formData).then(() => onHide())
    };

    return (
        <div style={{margin: "30px 0"}}>
            <div style={{display: "flex", flexWrap: "wrap"}}>

                <p>Выберите тип элемента</p>
                <div>
                    <select id="kind" onChange={e => {
                        console.log(e.target.value)
                        setKind(Number(e.target.value))
                        console.log(e.target.value)
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


                {(kind === 2 || kind === 3) && <p>Выберите параметры {kind}</p>}
                <div style={{margin: "30px 0"}}>
                    {kind === 3 &&

                        <select id="kind" value={param} onChange={e => {
                            setParam(e.target.value.split(" "))
                        }}>
                            <option value="none">Выберите тип картинки</option>
                            <option value="fading left">С градиентом слева</option>
                            <option value="fading right">С градиентом справа</option>
                            <option value="default left">Без градиента слева</option>
                            <option value="default right">Без градиента справа</option>
                            <option value="round left">Круглая слева</option>
                            <option value="round right">Круглая справа</option>
                        </select>
                    }

                    {kind === 2 &&

                        <select id="param" value={param} onChange={e => {
                            setParam(e.target.value)
                        }}>
                            <option id="fading">С градиентом</option>
                            <option id="default">Без градиента</option>
                        </select>
                    }
                </div>


                {kind > 1 && <p>Выберите файл(-ы)</p>}

                <div style={{margin: "30px 0"}}>
                    {(kind === 3 || kind === 2) &&
                        <div>
                            <input type="file" accept="image/*" onChange={(e) => {
                                setAdressFileType("local")
                                addImage(Array.from(e.target.files))
                            }}/>
                            <input type="text" onChange={(e) => {
                                setAdressFileType("global")
                                setFilesNames(e.target.value)
                            }}/>
                        </div>
                    }
                    {kind === 4 &&
                        <div>
                            <input className="pretty_inputs" type="file" multiple accept="image/*" onChange={(e) => {
                                setAdressFileType("local")
                                addImage(Array.from(e.target.files))
                            }}/>
                            <label htmlFor="links">Введите ссылки на картинки: </label>
                            <input className="pretty_inputs" style={{marginBottom: "20px"}} type="text" id="links" onChange={(e) => {
                                setAdressFileType("global")
                                setFilesNames(e.target.value.split("; "))
                            }}/>

                            {/*Set the size of an image by inputting a number in the field below*/}
                            <label htmlFor="name">Введите соотношение сторон фото:</label>
                            <input className="pretty_inputs" type="number" id="name" value={size} onChange={(e) => {
                                setSize(e.target.value)
                            }
                            }/>

                            {/*Set the color of the dots by choosing one of the options below*/}
                            <label htmlFor="name">Выберите цвет точек:</label>
                            <input className="pretty_inputs" style={{height: "25px"}} type="color" id="name" value={dotColor} onChange={(e) => {
                                setDotColor(e.target.value)
                            }}/>

                        </div>
                    }
                    {kind === 5 &&
                        <input type="text" onChange={(e) => setFilesNames(e.target.value)}/>
                    }
                    {kind === 6 &&
                        <div>
                            <input className="pretty_inputs" id="myFile" type="file" value={docNames} multiple accept="image" onChange={(e) => {
                                setAdressFileType("local")
                                for (let i=0; i<e.target.files.length; i++) {
                                    let file = document.getElementById("myFile").files[i];
                                    if ('name' in file) {
                                        docArray.push(file.name)
                                    }
                                }
                                document.getElementById("demo").innerText = String(docArray);
                            }}/>
                            <input type="text" onChange={(e) => {
                                setAdressFileType("global")
                                setFilesNames(e.target.value.split("; "))
                            }}/>
                            <p id="demo"></p>
                        </div>
                    }
                </div>
            </div>


            {/* Появление зоны редактирования текста*/}
            <div style={{margin: "30px 0"}}>
                {kind === 1 &&
                    <MDEditor
                        value={content}
                        preview="edit"
                        extraCommands={[commands.fullscreen]}
                        onChange={(val) => setContent(val)}
                    />
                }

                {kind === 3 &&
                    <MDEditor
                        style={{width: "100%"}}
                        value={content}
                        preview="edit"
                        extraCommands={[commands.fullscreen]}
                        onChange={(val) => setContent(val)}
                    />
                }
            </div>

            {/*Отрисовка линии*/}

            <h2>Как пользователь видит линию</h2>

            {kind === 1 &&
                <MDEditor.Markdown source={content} style={{whiteSpace: 'pre-wrap', width: "100%"}}/>
            }

            {(kind === 2 && (typeof filesNames !== "undefined")) && (filesNames.includes("://") ?
                    <img src={filesNames}/> : <img src={process.env.REACT_APP_API_URL + filesNames}/>
            )
            }

            {(kind === 3 && (typeof filesNames !== "undefined")) &&
                <Card
                    // imgType={param[0]}
                    imgSrc={filesNames.includes("://") ? filesNames : process.env.REACT_APP_API_URL + filesNames}
                    imgPos={param[1]}>
                    <MDEditor.Markdown source={content} style={{whiteSpace: 'pre-wrap'}}/>
                </Card>

            }

            {(kind === 4 && (typeof filesNames !== "undefined")) &&
                <Carusel size={size} dotColor={dotColor} photos={filesNames} adressFileType={adressFileType}></Carusel>}

            {/*{(kind === 6 && (typeof docNames !== "undefined")) &&*/}
            {/*    <DocumentList docNames={docNames} adressFileType={adressFileType}></DocumentList>}*/}


            {/*Кнопки добавления и удаления*/}

            {/*<footer style={{margin: "30px 0"}}>*/}
            {/*    <Button variant="outline-success" onClick={() => addLine()}>*/}
            {/*        Добавить направление*/}
            {/*    </Button>*/}
            {/*    <Button variant="outline-danger">*/}
            {/*        Удалить*/}
            {/*    </Button>*/}

            {/*</footer>*/}
            <p>*Костыль ради отступа*</p>
        </div>
    );
});

export default CreateLine;