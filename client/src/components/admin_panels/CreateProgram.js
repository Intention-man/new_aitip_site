// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createAdditionalProgram} from "../../http/admissionAPI";
import {Button, Col, Dropdown, FormControl, Modal, Row} from "react-bootstrap";


const CreateProgram = observer(({show, onHide}) => {

    const [name, setName] = useState( "")
    const [kind, setKind] = useState("Программа профессиональной переподготовки");
    const [description, setDescription] = useState("");
    const [moduls, setModuls] = useState([]);
    const [hours, setHours] = useState(0);
    const [form, setForm] = useState("Очная");
    const [cost, setCost] = useState(0);
    const [programImg, setProgramImg] = useState("")
    const [supervisorName, setSupervisorName] = useState("");
    const [supervisorDescription, setSupervisorDescription] = useState("something start");
    const [supervizorImg, setSupervizorImg] = useState("")


    const selectProgramImg = e => {
        console.log(e.target.files[0])
        setProgramImg(e.target.files[0])
    }

    const selectSupervizorImg = e => {
        console.log(e.target.files[0])
        setSupervizorImg(e.target.files[0])
    }

    const addProgram = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("description", description)
        formData.append("moduls", JSON.stringify(moduls))
        formData.append("hours", `${hours}`)
        formData.append("form", form)
        formData.append("cost", `${cost}`)
        formData.append("programImg", programImg)
        formData.append("supervisorName", supervisorName)
        formData.append("supervisorDescription", supervisorDescription)
        formData.append("supervizorImg", supervizorImg)
        createAdditionalProgram(formData).then(() => onHide())
    }

    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="name">Название</label>
                        <input type="name" id="name" onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="kind">Тип программы</label>
                        <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                            <option id="Программа профессиональной переподготовки">Программа профессиональной переподготовки</option>
                            <option id="Программа повышения квалификации">Программа повышения квалификации</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description">Описание программы</label>
                        <textarea style={{width: 400, height: 100}} id="description"
                                  onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="moduls">Модули программы</label>
                        <textarea style={{width: 400, height: 100}} id="moduls"
                                  onChange={e => setModuls(e.target.value.split("; "))}/>
                    </div>

                    <div>
                        <label htmlFor="hours">Длительность (в часах)</label>
                        <input type="number" id="hours" onChange={e => setHours(Number(e.target.value))}/>
                    </div>

                    <div>
                        <label htmlFor="form">Тип программы</label>
                        <select id="form" size="1" value={form} onChange={e => setForm(e.target.value)}>
                            <option id="Очная">Очная</option>
                            <option id="Очно-заочная">Очно-заочная</option>
                            <option id="Заочная">Заочная</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cost">Стоимость</label>
                        <input type="text" id="cost" onChange={e => setCost(Number(e.target.value))}/>
                    </div>

                    <div>
                        <label htmlFor="programImg">Обложка программы</label>
                        <input type="file" id="programImg" onChange={e => {
                            console.log(e)
                            selectProgramImg(e)}}/>
                    </div>

                    <div>
                        <label htmlFor="supervisorName">ФИО руководителя программы</label>
                        <input type="name" id="supervisorName" onChange={e => setSupervisorName(e.target.value)}/>
                    </div>


                    {/*<div>*/}
                    {/*    <label htmlFor="description">Описание программы</label>*/}
                    {/*    <textarea style={{width: 400, height: 100}} id="description"*/}
                    {/*              onChange={e => setDescription(e.target.value)}/>*/}
                    {/*</div>*/}
                    <div>
                        <label htmlFor="supervisorDescription">Описание руководителя программы</label>
                        <textarea style={{width: 400, height: 100}} id="supervisorDescription"
                                  onChange={e => {
                                      console.log(e.target.value)
                                      setSupervisorDescription(e.target.value)}}/>
                    </div>

                    <div>
                        <label htmlFor="supervizorImg">Фото руководителя программы</label>
                        <input type="file" id="supervizorImg" onChange={e => {
                            console.log(e)
                            selectSupervizorImg(e)}}/>
                    </div>


                    <footer style={{margin: "0 0 50px"}}>
                        <Button variant="outline-success" onClick={() => {
                            addProgram()
                        }}>
                            Добавить программу
                        </Button>
                        <Button variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>

                    </footer>
                    <p>*Костыль ради отступа*</p>
                </fieldset>
            </form>
        </Modal>
    );
});

export default CreateProgram;
