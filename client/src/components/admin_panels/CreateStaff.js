// Frontend модального окна для добавления сотрудника и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createStaffer} from "../../http/staffAPI";
import "../../css/page_styles/AdminPanel.css";
import "../../css/component_styles/PersonalitiesFilter.css";


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
        setDirectionsBac([...directionsBac, directionName])
        console.log(directionsBac)
    }

    const removeDirection = (directionName) => {
        setDirectionsBac(directionsBac.filter(i => i !== directionName))
        console.log(directionsBac)
    }

    const addProgram = (programName) => {
        setProgramsAdd([...programsAdd, programName])
        console.log(programsAdd)
    }

    const removeProgram = (programName) => {
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
        <div>
            <div>
                <label htmlFor="name" className="mini-info">Имя</label>
                <input type="name" id="name" onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="post" className="mini-info">Должность</label>
                <input type="text" id="post" onChange={e => setPost(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="academic_degree" className="mini-info">Ученая степень</label>
                <input type="text" id="academic_degree" onChange={e => setAcademicDegree(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="academic_title" className="mini-info">Ученое звание</label>
                <input type="text" id="academic_title" onChange={e => setAcademicTitle(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info">Направления бакалавриата, на которых преподает сотрудник</label>
                {admission_store.directionsBachelor && admission_store.directionsBachelor.map(direction =>
                    <div className="squaredOne" key={direction.id + "d_point"}>
                        <input type="checkbox" id={direction.id + "d"} className="small_box" onChange={() => {
                            directionsBac.includes(direction.name) ? removeDirection(direction.name) : addDirection(direction.name)
                        }}/>
                        <label htmlFor={direction.id + "d"}/>
                        <p className="filter_text">{direction.name}</p>
                    </div>
                )}
            </div>

            <div>
                <label className="mini-info">Программы ДПО, на которых преподает сотрудник</label>
                {admission_store.additionalPrograms && admission_store.additionalPrograms.map(program =>
                    <div className="squaredOne down">
                        <input type="checkbox" id={program.id + "p"} className="small_box" onChange={() => {
                            programsAdd.includes(program.name) ? removeProgram(program.name) : addProgram(program.name)
                        }}/>
                        <label htmlFor={program.id + "p"}/>
                        <p className="filter_text">{program.name}</p>
                    </div>
                )}
            </div>

            {/*<div>*/}
            {/*    <label htmlFor="directions_bachelor" className="mini-info">Направления бакалавриата, на которых преподает сотрудник</label>*/}
            {/*    <textarea className="big-info" id="subjects_bac"*/}
            {/*              onChange={e => setBio(e.target.value)}/>*/}
            {/*</div>*/}
            <div>
                <label htmlFor="bio_text" className="mini-info">Биография (текст)</label>
                <textarea className="big-info" id="bio_text"
                          onChange={e => setBio(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="disciplines_and_courses_text" className="mini-info">Дисциплины и курсы (текст)</label>
                <textarea className="big-info" id="disciplines_and_courses_text"
                          onChange={e => setDisciplinesAndCourses(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="publications_text" className="mini-info">Публикации (текст)</label>
                <textarea className="big-info" id="publications_text"
                          onChange={e => setPublications(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="projects_text" className="mini-info">Проекты (текст)</label>
                <textarea className="big-info" id="projects_text"
                          onChange={e => setProjects(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email" className="mini-info">Почта</label>
                <input type="text" id="email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="phone_number" className="mini-info">Номер телефона</label>
                <input type="text" id="phone_number" onChange={e => setPhoneNumber(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="adress" className="mini-info">Адрес</label>
                <input type="text" id="adress" onChange={e => setAdress(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="img" className="mini-info">Картинка</label>
                <input className="picture-getter" type="file" id="img" onChange={e => selectFile(e)}/>
            </div>


            <Button style={{marginTop: "5%", marginRight: "2%", marginBottom: "5%"}} variant="outline-danger"
                    onClick={onHide}>
                Закрыть
            </Button>
            <Button style={{marginTop: "5%", marginBottom: "5%"}} variant="outline-success" onClick={() => {
                addStaffer()
            }}>
                Добавить сотрудника
            </Button>
        </div>
    );
});

export default CreateStaff;
