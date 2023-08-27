// Окно для добавления лабораторий и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import "../../css/page_styles/AdminPanel.css"
import {Context} from "../../index";
import {updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import {createLab, removeLab, updateLab} from "../../http/labAPI";
import FilesPicker from '../FilesPicker';


const CreateLab = observer(({lab, mode}) => {
    const {block_store} = useContext(Context)
    const isEmpty = lab.hasOwnProperty("fakeParam");

    const [name, setName] = useState(isEmpty ? "" : lab.name)
    const [text1, setText1] = useState(isEmpty ? "" : lab.text1)
    const [cover, setCover] = useState(isEmpty ? "" : lab.cover)
    const [supervisorName, setSupervisorName] = useState(isEmpty ? "" : lab.supervisor_name)
    const [supervisorDescription, setSupervisorDescription] = useState(isEmpty ? "" : lab.supervisor_description)
    const [supervisorPhoto, setSupervisorPhoto] = useState(isEmpty ? "" : lab.supervisor_photo)
    const [text2, setText2] = useState(isEmpty ? "" : lab.text2)
    const [carouselPhotosLinks, setCarouselPhotosLinks] = useState(isEmpty ? "" : lab.carousel_photos_links)
    const [text3, setText3] = useState(isEmpty ? "" : lab.text3)

    const [prevCover, setPrevCover] = useState(isEmpty ? "" : lab.cover);
    const [prevSupervisorPhoto, setPrevSupervisorPhoto] = useState(isEmpty ? "" : lab.supervisor_photo);
    const [prevCarouselPhotosLinks, setPrevCarouselPhotosLinks] = useState(isEmpty ? [] : lab.carousel_photos_links);


    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('text1').value = text1
            document.getElementById('text2').value = text2
            document.getElementById('text3').value = text3
            document.getElementById('supervisorName').value = supervisorName
            document.getElementById('supervisorDescription').value = supervisorDescription
        }
    }, [])


    const updateUsagesOnSave = () => {
        if (cover !== prevCover) {
            (prevCover !== null) && updateFileUsages(prevCover, -1);
            updateFileUsages(cover, 1);
        }
        setPrevCover(cover);

        if (supervisorPhoto !== prevSupervisorPhoto) {
            (prevSupervisorPhoto !== null) && updateFileUsages(prevSupervisorPhoto, -1);
            updateFileUsages(supervisorPhoto, 1);
        }
        setSupervisorPhoto(supervisorPhoto);

        let concatPhotosList = prevCarouselPhotosLinks.length > 0 ? carouselPhotosLinks.concat(prevCarouselPhotosLinks.filter((item) => carouselPhotosLinks.indexOf(item) < 0)) : [...carouselPhotosLinks];
        console.log(concatPhotosList)
        concatPhotosList.forEach(photo => {
                if (!prevCarouselPhotosLinks.includes(photo) && carouselPhotosLinks.includes(photo)) {
                    updateFileUsages(photo, 1);
                } else if (prevCarouselPhotosLinks.includes(photo) && !carouselPhotosLinks.includes(photo)) {
                    updateFileUsages(photo, -1);
                }
            }
        )
        setPrevCarouselPhotosLinks(carouselPhotosLinks)
    }

    const saveLab = async () => {
        const formData = new FormData()
        lab.id && formData.append("id", lab.id)
        formData.append("name", name)
        formData.append("text1", text1)
        formData.append("cover", cover)
        formData.append("supervisor_name", supervisorName)
        formData.append("supervisor_description", supervisorDescription)
        formData.append("supervisor_photo", supervisorPhoto)
        formData.append("text2", text2)
        formData.append("text3", text3)
        formData.append("carousel_photos_links", JSON.stringify(carouselPhotosLinks));
        (mode === "edit") ? updateLab(formData).then(() => alert("Успешно обновлено")) : createLab(formData).then(() => {
            alert("Успешно добавлено")
            mode = "edit"
        })
    }


    return (
        <div>
            <div>
                <label className="mini-info" htmlFor="name">Название лаборатории</label>
                <input type="name" id="name" onChange={e => setName(e.target.value)}/>
            </div>

            <div>
                <label className="mini-info" htmlFor="text1">Описание лаборатории (часть 1)</label>
                <textarea className="big-info" id="text1"
                          onChange={e => setText1(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="text2">Описание лаборатории (часть 2)</label>
                <textarea className="big-info" id="text2"
                          onChange={e => setText2(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="text3">Описание лаборатории (часть 3)</label>
                <textarea className="big-info" id="text3"
                          onChange={e => setText3(e.target.value)}/>
            </div>

            <div>
                <label className="mini-info" htmlFor="supervisorName">ФИО руководителя</label>
                <input type="name" id="supervisorName" onChange={e => setSupervisorName(e.target.value)}/>
            </div>
            <div>
                <label className="mini-info" htmlFor="supervisorDescription">Описание руководителя</label>
                <textarea className="big-info" id="supervisorDescription"
                          onChange={e => setSupervisorDescription(e.target.value)}/>
            </div>

            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="cover">Обложка лаборатории</label>
                <FilesPicker
                    pickedFiles={cover}
                    setPickedFiles={setCover}
                    isMultiple={false}
                    isRequired={false}
                    isImage={true}
                />
            </div>

            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="supervisorPhoto">Фото руководителя</label>
                <FilesPicker
                    pickedFiles={supervisorPhoto}
                    setPickedFiles={setSupervisorPhoto}
                    isMultiple={false}
                    isRequired={false}
                    isImage={true}
                />
            </div>


            <div>
                <label className="mini-info" htmlFor="carouselPhotosLinks">Фотографии совместных проектов</label>
                <FilesPicker
                    pickedFiles={carouselPhotosLinks}
                    setPickedFiles={setCarouselPhotosLinks}
                    isMultiple={true}
                    isRequired={false}
                    isImage={true}
                />
            </div>


            <Button className="buttom-add" variant="outline-success" onClick={() => {
                saveLab().then(() => {
                    updateUsagesOnSave()
                })
            }}>
                Сохранить лабораторию
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => document.location.reload()}>
                Выйти без сохранения
            </Button>

            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => {

                            removeLab(lab.id).then((data) => {
                                if (!isNaN(parseInt(data))) {
                                    (prevCover !== null) && updateFileUsages(prevCover, -1);
                                    (prevSupervisorPhoto !== null) && updateFileUsages(prevSupervisorPhoto, -1);
                                    (prevCarouselPhotosLinks !== null) && prevCarouselPhotosLinks.forEach(photo => updateFileUsages(photo, -1));
                                    document.location.reload()
                                } else {
                                    alert("Что-то пошло не так...");
                                }
                            })
                        }}>
                    Удалить лабораторию
                </Button>
            }

        </div>
    );
});

export default CreateLab;
