// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    createDirectionBachelor,
    removeDirectionBachelor,
    removeEntranceTest,
    updateDirectionBachelor
} from "../../http/admissionAPI";
import {Button, Col, Dropdown, FormControl, Modal, Row} from "react-bootstrap";
import "../../css/page_styles/AdminPanel.css"
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {selectFile, updateFileUsages} from "../commonPanelsFunctions";
import {useNavigate} from "react-router";


const CreateDirection = observer(({direction, mode}) => {
    const {block_store} = useContext(Context)

    const isEmpty = direction.hasOwnProperty("fakeParam");
    // console.log(direction.tests)

    const [name, setName] = useState(isEmpty ? "" : direction.name)
    const [code, setCode] = useState(isEmpty ? "" : direction.code)
    const [profile, setProfile] = useState(isEmpty ? "" : direction.profile);
    const [professionAdvantages, setProfessionAdvantages] = useState(isEmpty ? "" : direction.profession_advantages);
    const [professionDescription, setProfessionDescription] = useState(isEmpty ? "" : direction.profession_description);
    const [specialities, setSpecialities] = useState(isEmpty ? "" : direction.specialities);
    const [extramuralFormPrice, setExtramuralFormPrice] = useState(isEmpty ? 0 : direction.extramural_form_price);
    const [fullAndPartTimeFormPrice, setFullAndPartTimeFormPrice] = useState(isEmpty ? 0 : direction.full_and_part_time_form_price);
    const [file, setFile] = useState(isEmpty ? null : direction.file)
    const [prevFile, setPrevFile] = useState(isEmpty ? null : direction.img);
    const [tests, setTests] = useState(isEmpty ? [] : Array.from(direction.tests))

    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('code').value = code
            document.getElementById('profile').value = profile
            document.getElementById('professionAdvantages').value = professionAdvantages
            document.getElementById('professionDescription').value = professionDescription
            document.getElementById('specialities').value = specialities
            document.getElementById('extramuralFormPrice').value = extramuralFormPrice
            document.getElementById('fullAndPartTimeFormPrice').value = fullAndPartTimeFormPrice
        }
    }, [])

    const addTest = () => {
        tests && tests.sort((a, b) => a.id - b.id)
        const newId = (tests && tests.length > 0) ? (tests[tests.length - 1]).id + 1 : 1
        setTests([...tests, {id: newId, subject: "", minPoints: "", isNecessary: false, admissionByEGE: false}])
        console.log(tests)
    }

    const removeTest = (id) => {
        setTests(tests.filter(i => i.id !== id))
        removeEntranceTest(id).then(r => alert("Вступительное испытание удалено"))
    }

    const changeTest = (key, value, id) => {
        setTests(tests.map(i => i.id === id ? {...i, [key]: value} : i))
        console.log(tests)
    }

    const saveDirection = async () => {
        const formData = new FormData()
        console.log(typeof tests)
        console.log(tests)
        console.log(mode)
        direction.id && formData.append("id", direction.id)
        formData.append("name", name)
        formData.append("code", code)
        formData.append("profile", profile)
        formData.append("profession_advantages", professionAdvantages)
        formData.append("profession_description", professionDescription)
        formData.append("specialities", JSON.stringify(specialities))
        formData.append("extramural_form_price", `${extramuralFormPrice}`)
        formData.append("full_and_part_time_form_price", `${fullAndPartTimeFormPrice}`)
        formData.append("file", file)
        formData.append("tests", JSON.stringify(tests));
        (mode === "edit") ? updateDirectionBachelor(formData).then(() => alert("Успешно обновлено")) : createDirectionBachelor(formData).then(() => alert("Успешно добавлено"));
        return true
    }


    return (
        <div>
            <div>
                <label htmlFor="name" className="mini-info">Название</label>
                <input type="name" id="name" onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="code" className="mini-info">Код</label>
                <input type="text" id="code" onChange={e => setCode(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="profile" className="mini-info">Профиль</label>
                <input type="text" id="profile" onChange={e => setProfile(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="professionAdvantages">Преимущества профессии</label>
                <textarea className="big-info" id="professionAdvantages"
                          onChange={e => setProfessionAdvantages(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="professionDescription">Описание профессии</label>
                <textarea className="big-info" id="professionDescription"
                          onChange={e => setProfessionDescription(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="specialities">Специальности</label>
                <textarea className="big-info" id="specialities"
                          onChange={e => setSpecialities(e.target.value.split("; "))}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="fullAndPartTimeFormPrice">Стоимость очно-заочной формы обучения
                    (руб / в год)</label>
                <input type="number" id="fullAndPartTimeFormPrice"
                       onChange={e => setFullAndPartTimeFormPrice(Number(e.target.value))}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="extramuralFormPrice">Стоимость заочной формы обучения (руб / в
                    год)</label>
                <input type="number" id="extramuralFormPrice"
                       onChange={e => setExtramuralFormPrice(Number(e.target.value))}/>
            </div>

            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="img">Картинка</label>
                <input className="picture-getter" type="file" id="img" accept="image/*" onChange={e => {
                    setFile(selectFile(e.target.files[0], block_store))
                }}/>
                <select size="7" onChange={e => {
                    setFile(e.target.value)
                    console.log(e.target.value)
                }}>
                    {block_store.allFiles.map(file =>
                        <option value={file.fileLink}>
                            <p>{file.name}</p>
                        </option>
                    )}
                </select>
                {(typeof file === "string") ? <img src={process.env.REACT_APP_API_URL + file}/> : <p>{typeof file}</p>}
            </div>
            <Button className="button-admin" onClick={() => {
                addTest()
            }}>
                Добавить новое вступительное испытание
            </Button>
            {tests && tests.map(i =>
                <Row key={i.id} style={{margin: 0}}>
                    <Col md={2}>
                        <FormControl type="text" placeholder="Предмет" value={i.subject}
                                     onChange={e => changeTest("subject", e.target.value, i.id)}/>
                    </Col>
                    <Col md={2}>
                        <FormControl placeholder="Минимальный балл" value={i.minPoints}
                                     onChange={e => changeTest("minPoints", Number(e.target.value), i.id)}/>
                    </Col>
                    <Col md={3}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {i.isNecessary}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => changeTest("isNecessary", true, i.id)}>Да</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => changeTest("isNecessary", false, i.id)}>Нет</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={3}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {i.admissionByEGE}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => changeTest("admissionByEGE", true, i.id)}>По ЕГЭ</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => changeTest("admissionByEGE", false, i.id)}>На базе профессионального
                                    образования</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={2}>
                        <Button variant="outline-danger" onClick={() => removeTest(i.id)}>Удалить</Button>
                    </Col>
                </Row>
            )}

            <Button className="buttom-add" variant="outline-success" onClick={() => {
                saveDirection().then((bool) => {
                    (prevFile !== null) && updateFileUsages(prevFile, -1)
                    updateFileUsages(file, 1)
                    setPrevFile(file)
                })
            }}>
                Сохранить направление
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => window.location.reload()}>
                Выйти без сохранения
            </Button>
            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => removeDirectionBachelor(direction.id).then(() => alert("Успешно удалено"))}>
                    Удалить направление
                </Button>
            }

        </div>
    );
});

export default CreateDirection;