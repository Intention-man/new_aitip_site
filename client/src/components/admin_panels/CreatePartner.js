// Окно для добавления партнеров и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import {createPartner} from "../../http/partnersAPI";
import "../../css/page_styles/AdminPanel.css"


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
                <div>
                    <div>
                        <label className="mini-info" htmlFor="name">Название партнера</label>
                        <textarea className="big-info" id="name"
                                  onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="kind">Тип</label>
                        <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                            <option id="Индустриальный">Индустриальный</option>
                            <option id="Образовательный">Образовательный</option>
                            <option id="Научный">Научный</option>
                            <option id="Работодатель">Работодатель</option>
                        </select>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="description">Описание</label>
                        <textarea className="big-info" id="description"
                                  onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="logo">Логотип/фото</label>
                        <input className="picture-getter"  type="file" id="logo" accept="image" required="required" title="Необходимо выбрать минимум один файл" onChange={e => setLogo(e.target.files[0])}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="jointProjectsDescriprion">Описание</label>
                        <textarea className="big-info" id="jointProjectsDescriprion"
                                  onChange={e => setJointProjectsDescriprion(e.target.value)}/>
                    </div>

                    <div>
                        <label className="mini-info" htmlFor="jointProjectsPhotoes">Логотип/фото</label>
                        <input className="picture-getter" type="file" multiple="multiple" id="jointProjectsPhotoes" accept="image" onChange={e => {
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


                        <Button className="buttom-add" variant="outline-success" onClick={() => {
                            addPartner()
                        }}>
                            Добавить партнера
                        </Button>
                        <Button className="buttom-close" variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>

                </div>
    );
});

export default CreatePartner;
