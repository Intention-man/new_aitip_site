// Frontend модального окна для добавления сотрудника и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createStaffer, removeStaffer, updateStaffer} from "../../http/staffAPI";
import "../../css/page_styles/AdminPanel.css";
import "../../css/component_styles/PersonalitiesFilter.css";
import {updateFileUsages, selectFile} from "../../additional_commands/commonPanelsFunctions";
import BigImg from "../../components/lines/BigImg";



const CreateStaff = observer(({staffer, mode}) => {
    const {admission_store} = useContext(Context)
    const {block_store} = useContext(Context)

    const isEmpty = staffer.hasOwnProperty("fakeParam");

    const [name, setName] = useState(isEmpty ? "" : staffer.name)
    const [post, setPost] = useState(isEmpty ? "" : staffer.post)
    const [academicDegree, setAcademicDegree] = useState(isEmpty ? "" : staffer.academic_degree)
    const [academicTitle, setAcademicTitle] = useState(isEmpty ? "" : staffer.academic_title);
    const [directionsBac, setDirectionsBac] = useState(isEmpty ? [] : staffer.directions_bac);
    const [programsAdd, setProgramsAdd] = useState(isEmpty ? [] : staffer.programs_add);
    const [bio, setBio] = useState(isEmpty ? "" : staffer.bio_text);
    const [disciplinesAndCourses, setDisciplinesAndCourses] = useState(isEmpty ? "" : staffer.disciplines_and_courses_text);
    const [publications, setPublications] = useState(isEmpty ? "" : staffer.publications_text);
    const [projects, setProjects] = useState(isEmpty ? "" : staffer.projects_text);
    const [email, setEmail] = useState(isEmpty ? "" : staffer.email);
    const [phoneNumber, setPhoneNumber] = useState(isEmpty ? "" : staffer.phone_number);
    const [adress, setAdress] = useState(isEmpty ? "" : staffer.adress);
    const [file, setFile] = useState(isEmpty ? null : staffer.img)
    const [prevFile, setPrevFile] = useState(isEmpty ? null : staffer.img);


    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('post').value = post
            document.getElementById('academic_degree').value = academicDegree
            document.getElementById('academic_title').value = academicTitle
            document.getElementById('bio_text').value = bio
            document.getElementById('disciplines_and_courses_text').value = disciplinesAndCourses
            document.getElementById('publications_text').value = publications
            document.getElementById('projects_text').value = projects
            document.getElementById('email').value = email
            document.getElementById('phone_number').value = phoneNumber
            document.getElementById('adress').value = adress
        }
    }, [])

    useEffect(() => {
        console.log(directionsBac)
        console.log(programsAdd)
    }, [directionsBac, programsAdd]);


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

     const saveStaffer = async () => {
        const formData = new FormData()
        console.log(file)
        // Object.keys(formData).forEach(k => console.log(formData.getAll(k)))
        staffer.id && formData.append("id", staffer.id)
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
        formData.append("file", file);
        for (let [key, val] of formData.entries()) {
            console.log(key, val);
        }
        (mode === "edit") ? updateStaffer(formData).then(data => alert("Успешно обновлено")) : createStaffer(formData).then(data => {
            alert("Успешно добавлено")
            mode = "edit"
        });
        return true
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

            <div>
                <label htmlFor="bio_text" className="mini-info">Биография (текст)</label>
                <textarea className="big-info" id="bio_text" onChange={e => setBio(e.target.value)}/>
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
                <input className="picture-getter" type="file" id="img" accept="image/*" onChange={e => {
                    setFile(selectFile(e.target.files[0], block_store))
                }}/>
                <select size="7" onChange={e => {
                    setFile(e.target.value)
                    console.log(e.target.value)
                }}>
                    {block_store.allFiles.map(file =>
                        <option value={file.fileLink}>
                            <div>
                                <p>{file.name}</p>
                            </div>
                        </option>
                    )}
                </select>
                {(typeof file === "string") ? <BigImg imgSrc={process.env.REACT_APP_API_URL + file}/> : <p>{typeof file}</p>}
            </div>


            <Button style={{marginTop: "5%", marginRight: "2%", marginBottom: "5%"}} variant="outline-danger">
                Закрыть
            </Button>
            <Button style={{marginTop: "5%", marginBottom: "5%"}} variant="outline-success" onClick={() => {
                saveStaffer().then((bool) => {
                    (prevFile !== null) && updateFileUsages(prevFile, -1)
                    updateFileUsages(file, 1)
                    setPrevFile(file)
                })
            }}>
                Сохранить сотрудника
            </Button>
            {mode === "edit" &&
                <Button style={{marginTop: "5%", marginBottom: "5%"}} variant="outline-success" onClick={() => {
                    removeStaffer(staffer.id).then(() => alert("Сотрудник успешно удален"))
                }}>
                    Удалить сотрудника
                </Button>}
        </div>
    );
});

export default CreateStaff;
