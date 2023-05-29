// Отрисовка всех сотрудников на странице Персоналии

import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../../index";
import StafferItem from "./StafferItem";
import {observer} from "mobx-react-lite";
import "../../../css/page_styles/PersonalityList.css"
import {Row} from "react-bootstrap";
import SmallStafferItem from "./SmallStafferItem";
import {fetchStaff} from "../../../http/staffAPI";
import {fetchAdditionalPrograms, fetchDirectionsBachelor} from "../../../http/admissionAPI";


const PersonalitiesList = observer(params => {
    const {staff_store} = useContext(Context)
    const {admission_store} = useContext(Context)
    const [size, setSize] = useState([0, 0]);


    function changeChosenStaffer(clickedId) {
        if (params.chosenStaffer && params.chosenStaffer.id === clickedId) {
            staff_store.setSelectedStaffer("")
        } else {
            staff_store.setSelectedStaffer(clickedId)
        }
    }

    function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
    }

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
    }, [])

    return (
        <div>
            {(staff_store.staff.length !== 0) ?
                (() => {
                    let rows = []
                    const lenGroup = size[0] > 800 ? 2 : 1
                    const count = Math.ceil(params.filteredStaff.length / lenGroup) * lenGroup
                    // console.log(staff_store.staff[0])
                    // console.log(staff_store.staff[1])
                    // console.log(staff_store.staff[2])
                    for (let i = 0; i < count; i += lenGroup) {
                        let staffers = []
                        for(let l = 0; l < lenGroup; l++) {
                            staffers.push((params.filteredStaff.length > i + l ? staff_store.staff[i + l] : undefined))

                        }
                        // const staffer1 = (params.filteredStaff.length > i ? staff_store.staff[i] : undefined)
                        // const staffer2 = (params.filteredStaff.length > (i + 1) ? staff_store.staff[i + 1] : undefined)
                        // const staffer3 = (params.filteredStaff.length > (i + 2) ? staff_store.staff[i + 2] : undefined)
                        // if (staffer1 !== undefined) {lastThreeStaffId.push(staffer1.id)}
                        // if (staffer2 !== undefined) lastThreeStaffId.push(staffer2.id)
                        // if (staffer3 !== undefined) lastThreeStaffId.push(staffer3.id)

                        let list = staffers.filter(i => i !== undefined)

                        rows.push(<Row style={{display: "grid", gridTemplateColumns: "1fr ".repeat(lenGroup)}}>
                            {list.map(staffer =>
                                <div>
                                    <div key={staffer.id}
                                         className="person_block"
                                         onClick={() => {
                                             changeChosenStaffer(staffer.id)
                                         }
                                         }>

                                        <SmallStafferItem staffer={staffer}/>
                                    </div>
                                </div>
                            )}
                        </Row>)
                        rows.push(params.chosenStaffer && list.map(e => e.id).includes(params.chosenStaffer.id) &&
                            <StafferItem key={params.chosenStaffer.id} staffer={params.chosenStaffer} closeStaffer={changeChosenStaffer}/>)
                    }
                    return rows
                })() : <div>Загрузка...</div>
            }
        </div>
    );
});


export default PersonalitiesList;