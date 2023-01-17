// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createDirectionBachelor} from "../../http/admissionAPI";
import {Button, Col, Dropdown, FormControl, Modal, Row} from "react-bootstrap";


const CreateDirection = observer(({show, onHide}) => {
    const {admission_store} = useContext(Context)

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [profile, setProfile] = useState("");
    const [profession_advantages, setProfession_advantages] = useState("");
    const [profession_description, setProfession_description] = useState("");
    const [specialities, setSpecialities] = useState([]);
    const [extramuralFormPrice, setExtramuralFormPrice] = useState(1);
    const [fullAndPartTimeFormPrice, setFullAndPartTimeFormPrice] = useState(1);
    const [file, setFile] = useState(null)
    const [tests, setTests] = useState([])

    const addTest = () => {
        setTests([...tests, {subject: "", minPoints: "", isNecessary: false, number: Date.now()}])
        console.log(tests)
    }

    const removeTest = (number) => {
        setTests(tests.filter(i => i.number !== number))
    }

    const changeTest = (key, value, number) => {
        setTests(tests.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDirection = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("code", code)
        formData.append("profile", profile)
        formData.append("profession_advantages", profession_advantages)
        formData.append("profession_description", profession_description)
        formData.append("specialities", JSON.stringify(specialities))
        // for (let i = 0; i < specialities.length; i++) {
        //     formData.append('specialities[]', specialities[i]);
        // }
        formData.append("extramural_form_price", `${extramuralFormPrice}`)
        formData.append("full_and_part_time_form_price", `${fullAndPartTimeFormPrice}`)
        formData.append("img", file)
        formData.append("tests", JSON.stringify(tests))
        console.log(JSON.stringify(tests))
        // Object.keys(formData).forEach(k => console.log(formData.getAll(k)))
        createDirectionBachelor(formData).then(() => onHide())
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
                        <label htmlFor="code">Код</label>
                        <input type="text" id="code" onChange={e => setCode(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="profile">Профиль</label>
                        <input type="text" id="profile" onChange={e => setProfile(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="profession_advantages">Преимущества профессии</label>
                        <textarea style={{width: 400, height: 100}} id="profession_advantages"
                                  onChange={e => setProfession_advantages(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="profession_description">Описание профессии</label>
                        <textarea style={{width: 400, height: 100}} id="profession_description"
                                  onChange={e => setProfession_description(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="specialities">Специальности</label>
                        <textarea style={{width: 400, height: 100}} id="specialities"
                                  onChange={e => setSpecialities(e.target.value.split(", "))}/>
                    </div>
                    <div>
                        <label htmlFor="full_and_part_time_form_price">Стоимость очно-заочной формы обучения (руб / в
                            год)</label>
                        <input type="number" id="full_and_part_time_form_price"
                               onChange={e => setFullAndPartTimeFormPrice(Number(e.target.value))}/>
                    </div>
                    <div>
                        <label htmlFor="extramural_form_price">Стоимость заочной формы обучения (руб / в год)</label>
                        <input type="number" id="extramural_form_price"
                               onChange={e => setExtramuralFormPrice(Number(e.target.value))}/>
                    </div>
                    <div>
                        <label htmlFor="img">Картинка</label>
                        <input type="file" id="img" onChange={e => selectFile(e)}/>
                    </div>


                    <Button variant="outline-info" style={{margin: 30}} onClick={() => {
                        addTest()
                    }}>
                        Добавить новое вступительное испытание
                    </Button>
                    {tests.map(i =>
                        <Row key={i.number} style={{margin: 30}} className="mt-3">
                            <Col md={3}>
                                <FormControl placeholder="Предмет" value={i.subject}
                                             onChange={e => changeTest("subject", e.target.value, i.number)}/>
                            </Col>
                            <Col md={3}>
                                <FormControl placeholder="Минимальный балл" value={i.minPoints}
                                             onChange={e => changeTest("minPoints", Number(e.target.value), i.number)}/>
                            </Col>
                            <Col md={3}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {i.isNecessary}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => changeTest("isNecessary", true, i.number)}>Да</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => changeTest("isNecessary", false, i.number)}>Нет</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={3}>
                                <Button variant="outline-danger" onClick={() => removeTest(i.number)}>Удалить</Button>
                            </Col>
                        </Row>
                    )}
                    <footer style={{margin: "0 0 50px"}}>
                        <Button variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>
                        <Button variant="outline-success" onClick={() => {
                            // console.log(name, code, profile, profession_advantages, profession_description, specialities, fullAndPartTimeFormPrice, extramuralFormPrice)
                            addDirection()
                        }}>
                            Добавить направление
                        </Button>
                    </footer>
                    <p>*Костыль ради отступа*</p>
                </fieldset>
            </form>
        </Modal>


        // <Modal show={show} onHide={onHide}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Добавление направления</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <Form>
        //             <Row>
        //                 <Dropdown className="m-2" style={{display: "flex", width: "40%"}}>
        //                     <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
        //                     <DropdownMenu>
        //                         {device.types.map(type =>
        //                             <DropdownItem onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</DropdownItem>
        //                         )}
        //                     </DropdownMenu>
        //                 </Dropdown>
        //                 <Dropdown className="m-2" style={{display: "flex", width: "40%"}}>
        //                     <DropdownToggle>{device.selectedBrand.name || "Выберите бренд"}</DropdownToggle>
        //                     <DropdownMenu>
        //                         {device.brands.map(brand =>
        //                             <DropdownItem onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</DropdownItem>
        //                         )}
        //                     </DropdownMenu>
        //                 </Dropdown>
        //             </Row>
        //
        //             <Row>
        //                 <FormControl className="mt-3" placeholder="Название" value={name} onChange={e => setName(e.target.value)}/>
        //                 <FormControl className="mt-3" placeholder="Цена" type="number" value={price} onChange={e => setPrice(Number(e.target.value))}/>
        //                 <FormControl className="mt-3" type="file" onChange={selectFile}/>
        //             </Row>
        //             <hr/>
        //             <Button variant="outline-tests" onClick={addInfo}>
        //                 Добавить новое свойство
        //             </Button>
        //             {tests.map(i =>
        //                 <Row key={i.number} className="mt-3">
        //                     <Col md={4}>
        //                         <FormControl placeholder="Название характеристики" value={i.title} onChange={e => changeFile("title", e.target.value, i.number)}/>
        //                     </Col>
        //                     <Col md={4}>
        //                         <FormControl placeholder="Значение характеристики" value={i.description} onChange={e => changeFile("description", e.target.value, i.number)}/>
        //                     </Col>
        //                     <Col md={4}>
        //                         <Button variant="outline-danger" onClick={() => removeInfo(i.number)}>Удалить</Button>
        //                     </Col>
        //                 </Row>
        //             )}
        //         </Form>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button variant="outline-danger" onClick={onHide}>
        //             Закрыть
        //         </Button>
        //         <Button variant="outline-success" onClick={addDevice}>
        //             Добавить устройство
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
    );
});

export default CreateDirection;
