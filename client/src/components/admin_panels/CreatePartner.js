// Окно для добавления партнеров и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";

import {createPartner} from "../../http/partnersAPI";


const CreatePartner = observer(({show, onHide}) => {

    const [name, setName] = useState( "")
    const [kind, setKind] = useState("Индустриальный");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState({});
    const [jointProjectsDescriprion, setJointProjectsDescriprion] = useState("");
    const [jointProjectsPhotoes, setJointProjectsPhotoes] = useState([]);


    // const selectJointProjectsPhotoes = e => {
    //     console.log(e.target.files)
    //     setJointProjectsPhotoes(e.target.files)
    // }

    const addPartner = () => {
        console.log(jointProjectsPhotoes)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("description", description)
        formData.append("logo", logo)
        formData.append("jointProjectsDescriprion", jointProjectsDescriprion)
        for (let i = 0; i < jointProjectsDescriprion.length; i++) {
            formData.append("jointProjectsPhotoes", jointProjectsPhotoes[i])
        }
        // formData.append("jointProjectsPhotoes", JSON.stringify(jointProjectsPhotoes))
        console.log(jointProjectsPhotoes)
        createPartner(formData).then(() => onHide())
    }

    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="name">Название партнера</label>
                        <textarea style={{width: 400, height: 100}} id="name"
                                  onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="kind">Тип</label>
                        <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                            <option id="Индустриальный">Индустриальный</option>
                            <option id="Образовательный">Образовательный</option>
                            <option id="Научный">Научный</option>
                            <option id="Работодатель">Работодатель</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description">Описание</label>
                        <textarea style={{width: 400, height: 100}} id="description"
                                  onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="logo">Логотип/фото</label>
                        <input type="file" id="logo" accept="image" required="required" title="Необходимо выбрать минимум один файл" onChange={e => setLogo(e.target.files[0])}/>
                    </div>

                    <div>
                        <label htmlFor="jointProjectsDescriprion">Описание</label>
                        <textarea style={{width: 400, height: 100}} id="jointProjectsDescriprion"
                                  onChange={e => setJointProjectsDescriprion(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="jointProjectsPhotoes">Логотип/фото</label>
                        <input type="file" multiple="multiple" id="jointProjectsPhotoes" accept="image" onChange={e => {
                            // let fileList = []
                            // for (let i = 0; i < e.target.files.length; i++) {
                            //     console.log(0)
                            //     fileList.push(e.target.files[i])
                            //     console.log(e.target.files[i])
                            // }
                            const fileList = Array.from(e.target.files)
                            console.log(fileList)
                            setJointProjectsPhotoes(fileList)
                            console.log(jointProjectsPhotoes)
                            }
                        }/>
                    </div>


                    <footer style={{margin: "0 0 50px"}}>
                        <Button variant="outline-success" onClick={() => {
                            addPartner()
                        }}>
                            Добавить партнера
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

export default CreatePartner;
