// Отрисовка всех сотрудников на странице Персоналии

import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../../index";
import StafferItem from "./StafferItem";
import {observer} from "mobx-react-lite";
import "../../../css/page_styles/PersonalityList.css"
import {Row} from "react-bootstrap";
import SmallStafferItem from "./SmallStafferItem";


const PersonalitiesList = observer(params => {
    const {staff_store} = useContext(Context)
    const {admission_store} = useContext(Context)


    function changeChosenStaffer(clickedId) {
        if (params.chosenStaffer && params.chosenStaffer.id === clickedId) {
            staff_store.setSelectedStaffer("")
        } else {
            staff_store.setSelectedStaffer(clickedId)
        }
    }

    return (
        <div style={{width: "70%"}}>
            {(staff_store.staff.length !== 0) ?
                (() => {
                    let rows = []
                    const lenGroup = 2
                    const count = Math.ceil(params.filteredStaff.length / 2) * 2
                    // console.log(staff_store.staff[0])
                    // console.log(staff_store.staff[1])
                    // console.log(staff_store.staff[2])
                    for (let i = 0; i < count; i += lenGroup) {
                        let lastThreeStaffId = []
                        const staffer1 = (params.filteredStaff.length > i ? staff_store.staff[i] : undefined)
                        const staffer2 = (params.filteredStaff.length > (i + 1) ? staff_store.staff[i + 1] : undefined)
                        // const staffer3 = (params.filteredStaff.length > (i + 2) ? staff_store.staff[i + 2] : undefined)
                        if (staffer1 !== undefined) {lastThreeStaffId.push(staffer1.id)}
                        if (staffer2 !== undefined) lastThreeStaffId.push(staffer2.id)
                        // if (staffer3 !== undefined) lastThreeStaffId.push(staffer3.id)

                        let list = [staffer1, staffer2
                           // , staffer3
                        ].filter(i => i !== undefined)

                        rows.push(<Row style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                            {list.map(staffer =>
                                <div style={{marginRight: "18px"}}>
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
                        rows.push(params.chosenStaffer && lastThreeStaffId.includes(params.chosenStaffer.id) &&
                            <StafferItem key={params.chosenStaffer.id} staffer={params.chosenStaffer}/>)
                    }
                    return rows
                })() : <div>Загрузка...</div>
            }
        </div>
    );
});


export default PersonalitiesList;