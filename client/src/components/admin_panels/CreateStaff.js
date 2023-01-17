// Frontend модального окна для добавления сотрудника и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createStaffer} from "../../http/staffAPI";

const CreateStaff = observer(({show, onHide}) => {
    const {admission_store} = useContext(Context)

    const [name, setName] = useState("")
    const [post, setPost] = useState("")
    const [academicDegree, setAcademicDegree] = useState("")
    const [academicTitle, setAcademicTitle] = useState("");
    const [directionsBac, setDirectionsBac] = useState([]);
    const [programsAdd, setProgramsAdd] = useState([]);
    const [bio, setBio] = useState("");
    const [disciplinesAndCourses, setDisciplinesAndCourses] = useState("");
    const [publications, setPublications] = useState("");
    const [projects, setProjects] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [adress, setAdress] = useState("");
    const [file, setFile] = useState(null)

    const addDirection = (directionName) => {
        console.log(directionName)
        setDirectionsBac([...directionsBac, directionName])
        console.log(directionsBac)
    }

    const removeDirection = (directionName) => {
        console.log(directionName)
        setDirectionsBac(directionsBac.filter(i => i !== directionName))
        console.log(directionsBac)
    }

    const addProgram = (programName) => {
        console.log(programName)
        setProgramsAdd([...programsAdd, programName])
        console.log(programsAdd)
    }

    const removeProgram = (programName) => {
        console.log(programName)
        setProgramsAdd(programsAdd.filter(i => i !== programName))
        console.log(programsAdd)
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addStaffer = () => {
        const formData = new FormData()
        console.log(bio, publications, disciplinesAndCourses, projects)
        Object.keys(formData).forEach(k => console.log(formData.getAll(k)))
        formData.append("name", name)
        formData.append("post", post)
        formData.append("academic_degree", academicDegree)
        formData.append("academic_title", academicTitle)
        formData.append("directions_bac", JSON.stringify(directionsBac))
        formData.append("programs_add", JSON.stringify(programsAdd))
        formData.append("bio_text", bio)
        formData.append("disciplines_and_courses_text", disciplinesAndCourses)
        formData.append("publications_text", publications)
        formData.append("projects_text", projects)
        formData.append("email", email)
        formData.append("phone_number", phoneNumber)
        formData.append("adress", adress)
        formData.append("img", file)
        for (let [key, val] of formData.entries()) {
            console.log(key, val);
        }
        createStaffer(formData).then(() => onHide())
    }

    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="name">Имя</label>
                        <input type="name" id="name" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="post">Должность</label>
                        <input type="text" id="post" onChange={e => setPost(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="academic_degree">Ученая степень</label>
                        <input type="text" id="academic_degree" onChange={e => setAcademicDegree(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="academic_title">Ученое звание</label>
                        <input type="text" id="academic_title" onChange={e => setAcademicTitle(e.target.value)}/>
                    </div>

                    {/*<div>*/}
                    {/*    <label htmlFor="subjects_bac">Направления бакалавариата, на которых преподает сотрудник</label>*/}
                    {/*    <textarea style={{width: 400, height: 100}} id="subjects_bac"*/}
                    {/*              onChange={e => setDirectionsBac(e.target.value.split(", "))}/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label htmlFor="subjects_add">Программы ДПО, на которых преподает сотрудник</label>*/}
                    {/*    <textarea style={{width: 400, height: 100}} id="subjects_add"*/}
                    {/*              onChange={e => setProgramsAdd(e.target.value.split(", "))}/>*/}
                    {/*</div>*/}
                    <label htmlFor="directions_bachelor">Направления бакалавриата, на которых преподает сотрудник</label>
                    <div id="directions_bachelor">
                        {admission_store.directions_bachelor.map(d =>
                            <div key={d.name}>
                                <input id={d.name} type="checkbox" value="0" name={d.name} onChange={() => {
                                    console.log(document.getElementById(d.name).checked)
                                    document.getElementById(d.name).checked === true && addDirection(d.name)
                                    document.getElementById(d.name).checked === false && removeDirection(d.name)
                                }}/>
                                <label htmlFor={d.name}>{d.name}</label>
                            </div>
                        )}
                    </div>
                    <label htmlFor="programs_additional">Направления бакалавриата, на которых преподает сотрудник</label>
                    <div id="programs_additional">
                        {admission_store.programs_additional.map(d =>
                            <div key={d.name}>
                                <input id={d.name} type="checkbox" value="0" name={d.name} onChange={() => {
                                    console.log(document.getElementById(d.name).checked)
                                    document.getElementById(d.name).checked && addProgram(d.name)
                                    !(document.getElementById(d.name).checked) && removeProgram(d.name)
                                }}/>
                                <label htmlFor={d.name}>{d.name}</label>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="bio_text">Биография (текст)</label>
                        <textarea style={{width: 400, height: 100}} id="bio_text"
                                  onChange={e => setBio(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="disciplines_and_courses_text">Дисциплины и курсы (текст)</label>
                        <textarea style={{width: 400, height: 100}} id="disciplines_and_courses_text"
                                  onChange={e => setDisciplinesAndCourses(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="publications_text">Публикации (текст)</label>
                        <textarea style={{width: 400, height: 100}} id="publications_text"
                                  onChange={e => setPublications(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="projects_text">Проекты (текст)</label>
                        <textarea style={{width: 400, height: 100}} id="projects_text"
                                  onChange={e => setProjects(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Почта</label>
                        <input type="text" id="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="phone_number">Номер телефона</label>
                        <input type="text" id="phone_number" onChange={e => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="adress">Адрес</label>
                        <input type="text" id="adress" onChange={e => setAdress(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="img">Картинка</label>
                        <input type="file" id="img" onChange={e => selectFile(e)}/>
                    </div>

                    <footer style={{margin: "0 0 50px"}}>
                        <Button variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>
                        <Button variant="outline-success" onClick={() => {
                            addStaffer()
                        }}>
                            Добавить сотрудника
                        </Button>
                    </footer>
                    <p>*Костыль ради отступа*</p>
                </fieldset>
            </form>
        </Modal>
    );
});

export default CreateStaff;
