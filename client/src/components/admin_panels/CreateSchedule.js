// Окно для добавления партнеров и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import {createPartner, removePartner, updatePartner} from "../../http/partnersAPI";
import "../../css/page_styles/AdminPanel.css"
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {selectFile, updateFileUsages} from "../commonPanelsFunctions";
import Carusel from "../lines/Carusel";
import {removeAdditionalProgram} from "../../http/admissionAPI";
import {createSchedule, removeSchedule, updateSchedule} from "../../http/scheduleAPI";


const CreateSchedule = observer(({schedule, mode}) => {
    const {block_store} = useContext(Context)
    const isEmpty = schedule.hasOwnProperty("fakeParam");

    const [name, setName] = useState(isEmpty ? "" : schedule.name)
    const [kind, setKind] = useState("");
    const [group, setGroup] = useState(isEmpty ? "" : schedule.group);
    const [fileLink, setFileLink] = useState(isEmpty ? "" : schedule.fileLink);
    const [prevFileLink, setPrevFileLink] = useState(isEmpty ? "" : schedule.fileLink);

    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('kind').value = kind
            document.getElementById('group').value = group
        }
    }, [])


    const updateUsagesOnSave = () => {
        if (fileLink !== prevFileLink) {
            (prevFileLink !== null) && updateFileUsages(prevFileLink, -1);
            updateFileUsages(fileLink, 1);
        }
        setPrevFileLink(fileLink);
    }

    const saveSchedule = async () => {
        const formData = new FormData()
        schedule.id && formData.append("id", schedule.id)
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("group", group)
        formData.append("fileLink", fileLink);

        (mode === "edit") ? updateSchedule(formData).then(() => alert("Успешно обновлено")): createSchedule(formData).then(() => {
            alert("Успешно добавлено")
            mode = "edit"
        })
    }

    return (
        <div>
            <div>
                <label className="mini-info" htmlFor="name">Название файла с расписанием</label>
                <textarea className="big-info" id="name"
                          onChange={e => setName(e.target.value)}/>
            </div>

            <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                <option id="Бакалавриат">Бакалавриат</option>
                <option id="Профессиональная переподготовка">Профессиональная переподготовка</option>
                <option id="Повышение квалификации">Повышение квалификации</option>
            </select>

            <div>
                <label className="mini-info" htmlFor="group">Номер группы</label>
               <input id="group" onChange={e => setGroup(e.target.value)}/>
            </div>


            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="fileLink">Файл с расписанием</label>
                <input className="picture-getter" type="file" id="fileLink" required="required"
                       onChange={e => {
                           console.log(e.target.files[0])
                           setFileLink(selectFile(e.target.files[0], block_store))
                       }}/>
                <select size="7" onChange={e => {
                    setFileLink(e.target.value)
                    console.log(e.target.value)
                }}>
                    {block_store.allFiles.map(file =>
                        <option value={file.fileLink} key={file.id}>
                            {file.name}
                        </option>
                    )}
                </select>
                {(typeof fileLink === "string") ? <p>{fileLink}</p> :
                    <p>{typeof fileLink}</p>}
            </div>


            <Button className="buttom-add" variant="outline-success" onClick={() => {
                saveSchedule().then(() => {
                    updateUsagesOnSave()
                })
            }}>
                Сохранить расписание
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => window.location.reload()}>
                Выйти без сохранения
            </Button>

            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => {
                            (prevFileLink !== null) && updateFileUsages(prevFileLink, -1);
                            removeSchedule(schedule.id).then(() => alert("Успешно удалено"))
                        }}>
                    Удалить расписание
                </Button>
            }
        </div>
    );
});

export default CreateSchedule;