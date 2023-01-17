// Отрисовка всех сотрудников на странице Персоналии

import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../index";
import StafferItem from "./StafferItem";
import {observer} from "mobx-react-lite";
import {fetchOneStaffer} from "../../http/staffAPI";
import {Row} from "react-bootstrap";


const PersonalitiesList = observer(() => {
    const {staff_store} = useContext(Context)
    const {admission_store} = useContext(Context)

    const [chosenStaffer, setChosenStaffer] = useState();
    const [filteredStaff, setFilteredStaff] = useState([]);


    useEffect(() => {
        setFilteredStaff(staff_store.staff)
            // console.log("hook works")
            // console.log(staff_store.staff)
            // console.log(typeof data, Object.keys(chosenStaffer))
        }, [staff_store.staff])

    useEffect(() => {
        fetchOneStaffer(staff_store.selectedStaffer).then(data => {
            setChosenStaffer(data)
            // console.log("hook works")
            // console.log(staff_store.staff)
            // console.log(typeof data, Object.keys(chosenStaffer))
        })
    }, [staff_store.selectedStaffer])

    useEffect(() => {
        if (admission_store.selectedDirections_bachelor.length > 0 || admission_store.selectedPrograms_additional.length > 0) {
            setFilteredStaff(staff_store.staff.filter(staffer => {
                // console.log(staffer.directions_bac[0])
                // console.log(staffer.programs_add[0])
                return (staffer.directions_bac && admission_store.selectedDirections_bachelor && admission_store.selectedDirections_bachelor.some(direction => staffer.directions_bac.includes(direction.name))) || (staffer.programs_add && admission_store.selectedPrograms_additional && admission_store.selectedPrograms_additional.some(program => staffer.programs_add.includes(program.name)))
                // (staffer.directions_bac && staffer.directions_bac.some(subject => admission_store.selectedDirections_bachelor.includes(subject))) || (staffer.programs_add && staffer.programs_add.some(subject => admission_store.selectedPrograms_additional.includes(subject)))
            }))
        } else {
            setFilteredStaff(staff_store.staff)
        }
    }, [admission_store.selectedDirections_bachelor, admission_store.selectedPrograms_additional])


    function changeChosenStaffer(clickedId) {
        if (chosenStaffer && chosenStaffer.id === clickedId) {
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
                    const lenGroup = 3
                    const count = Math.ceil(filteredStaff.length / 3) * 3
                    // console.log(staff_store.staff[0])
                    // console.log(staff_store.staff[1])
                    // console.log(staff_store.staff[2])
                    for (let i = 0; i < count; i += lenGroup) {
                        let lastThreeStaffId = []
                        const staffer1 = (filteredStaff.length > i ? staff_store.staff[i] : undefined)
                        const staffer2 = (filteredStaff.length > (i + 1) ? staff_store.staff[i + 1] : undefined)
                        const staffer3 = (filteredStaff.length > (i + 2) ? staff_store.staff[i + 2] : undefined)
                        if (staffer1 !== undefined) {lastThreeStaffId.push(staffer1.id)}
                        if (staffer2 !== undefined) lastThreeStaffId.push(staffer2.id)
                        if (staffer3 !== undefined) lastThreeStaffId.push(staffer3.id)

                        let list = [staffer1, staffer2, staffer3].filter(i => i !== undefined)

                        rows.push(<Row style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                            {list.map(staffer =>
                                <div key={staffer.id}
                                     style={{width: "200px", margin: "0", backgroundColor: (chosenStaffer && chosenStaffer === staffer.id) ? "#DDDDDD" : "white"}}
                                     onClick={() => {
                                         changeChosenStaffer(staffer.id)
                                     }
                                     }>
                                    <img src={process.env.REACT_APP_API_URL + staffer.img}
                                         style={{width: 150, display: "inline-block", margin: 0, height: "100px"}}
                                         alt="картинка чет не загрузилась"/>
                                    <div>
                                        <div> {staffer.name} </div>
                                        <div> {staffer.post} </div>
                                    </div>
                                </div>
                            )}
                        </Row>)
                        rows.push(chosenStaffer && lastThreeStaffId.includes(chosenStaffer.id) &&
                            <StafferItem key={chosenStaffer.id} staffer={chosenStaffer}/>)
                    }
                    return rows
                })() : <div>Загрузка...</div>
            }
        </div>
    );
});


/*< Row
    style={
        {
            display: "grid", gridTemplateColumns
        :
        "1fr 1fr 1fr"
    }
    }>*/

/*{staff_store.staff.map(staffer => {
        setSequenceNumber(sequenceNumber + 1)
        console.log(sequenceNumber)
        if (sequenceNumber % 4) {
            if (sequenceNumber % 4 === 1) {
                setLastThree([])
            }
            setLastThree(lastThree => [...lastThree, staffer.id])
            return (

            )
        } else {
            return (

            )
        }
        }
    )}*/
/*        }
    </Row>
)
    ;*/


export default PersonalitiesList;