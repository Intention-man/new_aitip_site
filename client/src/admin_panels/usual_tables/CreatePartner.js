// Окно для добавления партнеров и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import {createPartner, removePartner, updatePartner} from "../../http/partnersAPI";
import "../../css/page_styles/AdminPanel.css"
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {updateFileUsages, selectFile} from "../../additional_commands/commonPanelsFunctions";
import Carusel from "../../components/lines/Carusel";


const CreatePartner = observer(({partner, mode}) => {
    const {block_store} = useContext(Context)
    const isEmpty = partner.hasOwnProperty("fakeParam");

    const [name, setName] = useState(isEmpty ? "" : partner.name)
    const [kind, setKind] = useState(isEmpty ? "" : partner.kind);
    const [description, setDescription] = useState(isEmpty ? "" : partner.description);
    const [logo, setLogo] = useState(isEmpty ? "" : partner.logo);
    const [jointProjectsDescription, setJointProjectsDescription] = useState(isEmpty ? "" : partner.jointProjectsDescription);
    const [jointProjectsPhotos, setJointProjectsPhotos] = useState(isEmpty ? "" : partner.jointProjectsPhotos);

    const [prevLogo, setPrevLogo] = useState(isEmpty ? "" : partner.logo);
    const [prevJointProjectsPhotos, setPrevJointProjectsPhotos] = useState(isEmpty ? [] : partner.jointProjectsPhotos);


    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('kind').value = kind
            document.getElementById('description').value = description
            document.getElementById('jointProjectsDescription').value = jointProjectsDescription
        }
    }, [])


    const updateUsagesOnSave = () => {
        if (logo !== prevLogo) {
            (prevLogo !== null) && updateFileUsages(prevLogo, -1);
            updateFileUsages(logo, 1);
        }
        setPrevLogo(logo);

        let concatPhotosList = prevJointProjectsPhotos.length > 0 ? jointProjectsPhotos.concat(prevJointProjectsPhotos.filter((item) => jointProjectsPhotos.indexOf(item) < 0)) : [...jointProjectsPhotos];
        console.log(concatPhotosList)
        concatPhotosList.forEach(photo => {
                if (!prevJointProjectsPhotos.includes(photo) && jointProjectsPhotos.includes(photo)) {
                    updateFileUsages(photo, 1);
                } else if (prevJointProjectsPhotos.includes(photo) && !jointProjectsPhotos.includes(photo)) {
                    updateFileUsages(photo, -1);
                }
            }
        )
        setPrevJointProjectsPhotos(jointProjectsPhotos)
    }

    const savePartner = async () => {
        console.log(jointProjectsPhotos)
        const formData = new FormData()
        partner.id && formData.append("id", partner.id)
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("logo", logo)
        formData.append("description", description)
        formData.append("jointProjectsDescription", jointProjectsDescription)
        formData.append("jointProjectsPhotos", JSON.stringify(jointProjectsPhotos));
        // formData.append("jointProjectsPhotos", JSON.stringify(jointProjectsPhotos))
        console.log(jointProjectsPhotos);
        (mode === "edit") ? updatePartner(formData).then(() => alert("Успешно обновлено")): createPartner(formData).then(() => {
            alert("Успешно добавлено")
            mode = "edit"
        })
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

            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="logo">Логотип/фото</label>
                <input className="picture-getter" type="file" id="logo" accept="image/*" required="required"
                       onChange={e => {
                           console.log(e)
                           setLogo(selectFile(e.target.files[0], block_store))
                       }}/>
                <select size="7" onChange={e => {
                    setLogo(e.target.value)
                    console.log(e.target.value)
                }}>
                    {block_store.allFiles.map(file =>
                        <option value={file.fileLink}>
                            {file.name}
                        </option>
                    )}
                </select>
                {(typeof logo === "string") ? <img src={process.env.REACT_APP_API_URL + logo}/> :
                    <p>{typeof logo}</p>}
            </div>

            <div>
                <label className="mini-info" htmlFor="jointProjectsDescription">Описание совместных проектов</label>
                <textarea className="big-info" id="jointProjectsDescription"
                          onChange={e => setJointProjectsDescription(e.target.value)}/>
            </div>

            <div>
                <label className="mini-info" htmlFor="jointProjectsPhotos">Фотографии совместных проектов</label>
                <input className="picture-getter" type="file" multiple="multiple" accept="image/*" required="required"
                       id="jointProjectsPhotos" onChange={e => {
                    let fileList = []
                    Array.from(e.target.files).forEach(file => fileList.push(selectFile(file, block_store)))

                    setJointProjectsPhotos(fileList)
                }
                }/>
                <select size="7" multiple="multiple" onChange={e => {
                    let fileList = []
                    fileList = [...e.target.selectedOptions]
                        .map(option => option.value);
                    setJointProjectsPhotos(fileList)
                    console.log(fileList)
                }}>
                    {block_store.allFiles.map(file =>
                        <option value={file.fileLink}>
                            {file.name}
                        </option>
                    )}
                </select>
                {(jointProjectsPhotos.length > 0) ? <Carusel photos={jointProjectsPhotos} addressFileType="local"/> :
                    <p>{typeof jointProjectsPhotos}</p>}
            </div>


            <Button className="buttom-add" variant="outline-success" onClick={() => {
                savePartner().then(() => {
                    updateUsagesOnSave()
                })
            }}>
                Сохранить партнера
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => window.location.reload()}>
                Выйти без сохранения
            </Button>

            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => {
                            // (prevLogo !== null) && updateFileUsages(prevLogo, -1);
                            // (prevSupervisorImg !== null) && updateFileUsages(prevSupervisorImg, -1);
                            (prevLogo !== null) && updateFileUsages(prevLogo, -1);
                            (prevJointProjectsPhotos !== null) && prevJointProjectsPhotos.forEach(photo => updateFileUsages(photo, -1));
                            removePartner(partner.id).then(() => alert("Успешно удалено"))
                        }}>
                    Удалить программу
                </Button>
            }

        </div>
    );
});

export default CreatePartner;
