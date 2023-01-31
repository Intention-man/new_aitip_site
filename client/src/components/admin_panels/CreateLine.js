// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { convertImages } from "../../http/cardAPI";


const CreateLine = observer(() => {
    const [kind, setKind] = useState("Текст/список/подзаголовок");
    const [content, setContent] = useState("");
    const [cardIndex, setCardIndex] = useState(-1);


    const [param, setParam] = useState("");
    // // 0 - выбор вида линии, 1 - выбор параметров, 2 - выбор файлов и/или написание текста
    // const [stage, setStage] = useState(0);
    let imageNamesList = []


    const InsertImage = ({ doAfter }) => {
        const addImage = (imageList) => {
            const formData = new FormData();
            imageList.forEach(el => formData.append("imageList", el));
            convertImages(formData).then(list => {
                imageNamesList = list;
                doAfter();
            });
        }

        return (
            <div>
                <input
                    type="file"
                    accept="image"
                    multiple
                    onChange={
                        (e) => addImage(Array.from(e.target.files))
                    }
                />
            </div>
        );
    };

    const insertImage = {
        name: "InsertImage",
        keyCommand: "InsertImage",
        render: (command, disabled, executeCommand) => {
            // executeCommand(command, command.groupName);
            return (
                <InsertImage
                    doAfter={() => executeCommand(command, command.groupName)}
                />
            );
        },

        execute: (state, api) => {
            const index = state.selection.end;
            let currentText = state.text;
            let additioanalPart = "";
            imageNamesList.map(name => { 
                additioanalPart += `<img src="${process.env.REACT_APP_API_URL}${name}" class="im"/>` 
            });
            currentText = currentText.slice(0, index) + additioanalPart + currentText.slice(index);
            setContent(currentText);
        }
    };



    const addLine = () => {
        const formData = new FormData()
        formData.append("kind", kind)
        // createDirectionBachelor(formData).then(() => onHide())
    };

    return (
        <div style={{ margin: "30px 0" }}>
            <div style={{ display: "flex" }}>
                <p>Выберите тип элемента</p>
                <div>

                    {/*<option id="Маленький текст">Маленький текст</option>*/}
                    {/*<option id="Обычный текст">Обычный текст</option>*/}
                    {/*<option id="Увеличенный текст">Увеличенный текст</option>*/}
                    {/*<option id="Большой текст">Большой текст</option>*/}

                    <select id="kind" value={kind} onChange={e => {
                        setKind(e.target.value)
                    }}>
                        <option id="Текст/список/подзаголовок">Текст/список/подзаголовок</option>
                        <option id="Картинка + текст - в 2 столбика">Картинка + текст - в 2 столбика</option>
                        <option id="Одна картинка">Одна картинка</option>
                        <option id="Карусель">Карусель</option>
                        <option id="Видео">Видео</option>
                        <option id="Документ">Документ</option>
                    </select>
                </div>


                <p>Выберите параметры</p>
                <div>
                    {kind === "Картинка + текст - в 2 столбика" &&

                        <select id="kind" value={param} onChange={e => {
                            setParam(e.target.value)
                        }}>
                            <option id="С градиентом">С градиентом</option>
                            <option id="Без градиента">Без градиента</option>
                            <option id="Круглая">Круглая</option>
                        </select>
                    }

                    {kind === "Одна картинка" &&

                        <select id="kind" value={param} onChange={e => {
                            setParam(e.target.value)
                        }}>
                            <option id="С градиентом">С градиентом</option>
                            <option id="Без градиента">Без градиента</option>
                        </select>
                    }

                </div>
            </div>


            {/*2 - выбор файлов и/или написание текста*/}
            <div>
                {kind === "Текст/список/подзаголовок" &&
                    <MDEditor
                        value={content}
                        preview="edit"
                        extraCommands={[insertImage, commands.fullscreen]}
                        onChange={(val) => setContent(val)}
                    />
                }

                {kind === "Картинка + текст - в 2 столбика" &&
                    <MDEditor
                        style={{ width: "50%" }}
                        value={content}
                        preview="edit"
                        extraCommands={[insertImage, commands.fullscreen]}
                        onChange={(val) => setContent(val)}
                    />
                }
            </div>

            {/*Отрисовка линии*/}

            {(kind === "Текст/список/подзаголовок" || kind === "Картинка + текст - в 2 столбика") &&
                <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap', width: (kind === "Текст/список/подзаголовок" ? "100%" : "50%") }} />
            }


            {/*Кнопки добавления и удаления*/}

            <footer style={{ margin: "0 0 50px" }}>
                <Button variant="outline-success" onClick={() => addLine()}>
                    Добавить направление
                </Button>
                <Button variant="outline-danger">
                    Удалить
                </Button>

            </footer>
            <p>*Костыль ради отступа*</p>
        </div>
    );
});

export default CreateLine;