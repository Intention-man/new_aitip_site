// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {createAdditionalProgram} from "../../http/admissionAPI";
import {Button} from "react-bootstrap";
import "../../css/page_styles/AdminPanel.css"


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
                <div>
                    <div>
                        <label htmlFor="name" className="mini-info">Название</label>
                        <input  type="name" id="name" onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="kind" className="mini-info">Тип программы</label>
                        <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                            <option id="Программа профессиональной переподготовки">Программа профессиональной переподготовки</option>
                            <option id="Программа повышения квалификации">Программа повышения квалификации</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="mini-info">Описание программы</label>
                        <textarea className="big-info" id="description"
                                  onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="moduls" className="mini-info">Модули программы</label>
                        <textarea className="big-info" id="moduls"
                                  onChange={e => setModuls(e.target.value.split("; "))}/>
                    </div>

                    <div>
                        <label htmlFor="hours" className="mini-info">Длительность (в часах)</label>
                        <input type="number" id="hours" onChange={e => setHours(Number(e.target.value))}/>
                    </div>

                    <div>
                        <label htmlFor="form" className="mini-info">Тип программы</label>
                        <select id="form" size="1" value={form} onChange={e => setForm(e.target.value)}>
                            <option id="Очная">Очная</option>
                            <option id="Очно-заочная">Очно-заочная</option>
                            <option id="Заочная">Заочная</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cost" className="mini-info">Стоимость</label>
                        <input type="text" id="cost" onChange={e => setCost(Number(e.target.value))}/>
                    </div>

                    <div>
                        <label htmlFor="programImg" className="mini-info">Обложка программы</label>
                        <input className="picture-getter" type="file" id="programImg" onChange={e => {
                            console.log(e)
                            selectProgramImg(e)}}/>
                    </div>

                    <div>
                        <label htmlFor="supervisorName" className="mini-info">ФИО руководителя программы</label>
                        <input type="name" id="supervisorName" onChange={e => setSupervisorName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="supervisorDescription" className="mini-info">Описание руководителя программы</label>
                        <textarea className="big-info" id="supervisorDescription"
                                  onChange={e => {
                                      console.log(e.target.value)
                                      setSupervisorDescription(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="supervizorImg" className="mini-info">Фото руководителя программы</label>
                        <input className="picture-getter" type="file" id="supervizorImg" onChange={e => {
                            console.log(e)
                            selectSupervizorImg(e)}}/>
                    </div>



                        <Button className="buttom-add" variant="outline-success" onClick={() => {
                            addProgram()
                        }}>
                            Добавить программу
                        </Button>
                        <Button className="buttom-close" variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>
                </div>
    );
});

export default CreateProgram;
