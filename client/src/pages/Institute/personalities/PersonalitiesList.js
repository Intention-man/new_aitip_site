// Отрисовка всех сотрудников на странице Персоналии

import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../../index";
import StafferItem from "./StafferItem";
import {observer} from "mobx-react-lite";
import "../../../css/page_styles/PersonalityList.css"
import {Row} from "react-bootstrap";


const PersonalitiesList = observer(params => {
    const {staff_store} = useContext(Context)
    const windowWidth = window.innerWidth
    const columnCount = (windowWidth < 600 ? 1 : (windowWidth < 1500 ? 2 : 3))


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
                    const groupSize = columnCount
                    const linesCount = Math.ceil(params.filteredStaff.length / 2) * 2
                    // console.log(staff_store.staff[0])
                    // console.log(staff_store.staff[1])
                    // console.log(staff_store.staff[2])

                    for (let i = 0; i < linesCount; i += groupSize) {
                        let lastSeveralStaffId = []
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
                                <div key={staffer.id}
                                     className="person_block"
                                     onClick={() => {
                                         changeChosenStaffer(staffer.id)
                                     }
                                     }>
                                        <div className="block_content">
                                    <img src={process.env.REACT_APP_API_URL + staffer.img}
                                         className="ava_img"
                                         alt="картинка чет не загрузилась"/>
                                    <div>
                                        <div> {staffer.name} </div>
                                        <div> {staffer.post} </div>
                                    </div>
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