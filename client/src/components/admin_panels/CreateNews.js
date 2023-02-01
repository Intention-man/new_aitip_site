import React, {useState} from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";
import "../../css/component_styles/Editor.css"
import {observer} from "mobx-react-lite";
import {convertImages, createCard} from "../../http/cardAPI";
import {Button} from "react-bootstrap";



const CreateNews = observer(({newsVisible, setNewsVisible}) => {
    const [value, setValue] = React.useState("");
    const [header, setHeader] = useState("")
    let imageNamesList = [];

    // InsertGallery

    // const InsertImage = ({ doAfter }) => {
    //     const addImage = (imageList) => {
    //         const formData = new FormData();
    //         imageList.forEach(el => formData.append("imageList", el));
    //         convertImages(formData).then(list => {
    //             imageNamesList = list;
    //             doAfter();
    //         });
    //     }

    //     return (
    //         <div>
    //             <input
    //                 type="file"
    //                 accept="image"
    //                 multiple
    //                 onChange={
    //                     (e) => addImage(Array.from(e.target.files))
    //                 }
    //             />
    //         </div>
    //     );
    // };

    // const insertImage = {
    //     name: "InsertImage",
    //     keyCommand: "InsertImage",
    //     render: (command, disabled, executeCommand) => {
    //         // executeCommand(command, command.groupName);
    //         return (
    //             <InsertImage
    //                 doAfter={() => executeCommand(command, command.groupName)}
    //             />
    //         );
    //     },

    //     execute: (state, api) => {
    //         const index = state.selection.end;
    //         let currentText = state.text;
    //         let additioanalPart = "";
    //         imageNamesList.map(name => { 
    //             additioanalPart += `<img src="${process.env.REACT_APP_API_URL}${name}" class="im"/>` 
    //         });
    //         currentText = currentText.slice(0, index) + additioanalPart + currentText.slice(index);
    //         setContent(currentText);
    //     }
    // };

    const InsertImage = ({doAfter}) => {
        const addImage = (imageList) => {
            console.log(imageList)
            const formData = new FormData()
            for (let i = 0; i < imageList.length; i++) {
                formData.append("imageList", imageList[i])
            }
            console.log(formData);
            convertImages(formData).then(list => {
                imageNamesList = list;
                console.log(imageNamesList);
                doAfter();
            });
        }

        return (
            <input
                type="file" multiple="multiple" accept="image"
                onChange={(e) => {
                    const fileList = Array.from(e.target.files)
                    console.log(fileList)
                    addImage(fileList);
                }}
            />
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
            // currentText = currentText.slice(0, index) + `\n![](${process.env.REACT_APP_API_URL}${imageName})\n` + currentText.slice(index);
            let additioanalPart = ""
            imageNamesList.map(name => {additioanalPart += `<img src="${process.env.REACT_APP_API_URL}${name}" class="im"/>`})
            currentText = currentText.slice(0, index) + additioanalPart + currentText.slice(index);
            setValue(currentText);
        }
    };


    // addNews

    const addNews = () => {
        const formData = new FormData()
        formData.append("name", header)
        formData.append("content", value)
        createCard(formData).then(data => console.log(data))
    }


    // main return

    return (
        <div style={{backgroundColor: "#EEEEEE", marginTop: 30, borderRadius: 10}}>
            <div>
                <h3>Название/заголовок новости</h3>
                <input type="name" id="name" style={{borderColor: "black", margin: 10, width: "90%"}} onChange={e => setHeader(e.target.value)}/>
            </div>
            <MDEditor
                value={value}
                preview="edit"
                extraCommands={[insertImage, commands.fullscreen]}
                onChange={(val) => setValue(val)}
            />
            <div style={{display:"flex", marginTop: 30}}>
                <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', width: 400}} />
                <img style={{width: 100}} src="../../../server/static/4cd920e5-7d0b-4ff2-b8be-4356623a705d.jpg"/>
            </div>



            <footer style={{margin: "0 0 50px"}}>
                <Button variant="outline-danger" onClick={() => setNewsVisible(false)}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={() => {
                    console.log(value)
                    addNews()
                }}>
                    Добавить новость
                </Button>
            </footer>
        </div>
    );
})

export default CreateNews