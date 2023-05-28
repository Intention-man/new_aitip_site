import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchOneStaffer, fetchStaff} from "../../http/staffAPI";
import {observer} from "mobx-react-lite";
import {fetchAdditionalPrograms, fetchDirectionsBachelor} from "../../http/admissionAPI";
import PersonalitiesFilterBar from "./personalities/PersonalitiesFilterBar";
import PersonalitiesList from "./personalities/PersonalitiesList";

const PersonalitiesPage = observer(() => {

        const {staff_store} = useContext(Context)
        const {admission_store} = useContext(Context)

        const [filteredDirections, setFilteredDirections] = useState([]);
        const [filteredPrograms, setFilteredPrograms] = useState([]);

        const [chosenStaffer, setChosenStaffer] = useState();
        const [filteredStaff, setFilteredStaff] = useState([]);


        useEffect(() => {
            fetchStaff(1, 10).then(data => {
                    staff_store.setStaff(data.rows)
                    staff_store.setTotalCount(data.count)
                }
            )
            fetchDirectionsBachelor().then(data => {
                admission_store.setDirectionsBachelor(data.rows)
            })
            fetchAdditionalPrograms().then(data => {
                admission_store.setAdditionalPrograms(data.rows)
            })
        }, [])

        useEffect(() => {
            (async () => {
                fetchStaff(staff_store.page, staff_store.limit).then(data => {
                    staff_store.setStaff(data.rows)
                    staff_store.setTotalCount(data.count)
                })
            })()
        }, [staff_store, staff_store.page])

        useEffect(() => {
            setFilteredStaff(staff_store.staff)
        }, [staff_store.staff])

        useEffect(() => {
            fetchOneStaffer(staff_store.selectedStaffer).then(data => {
                setChosenStaffer(data)
            })
        }, [staff_store.selectedStaffer])

        useEffect(() => {
            console.log(filteredDirections)
            console.log(filteredPrograms)
            if (filteredDirections.length > 0 || filteredPrograms.length > 0) {
                setFilteredStaff(staff_store.staff.filter(staffer => {
                    return (staffer.directions_bac && filteredDirections && filteredDirections.some(direction => staffer.directions_bac.includes(direction.name))) || (staffer.programs_add && filteredPrograms && filteredPrograms.some(program => staffer.programs_add.includes(program.name)))
                }))
            } else {
                setFilteredStaff(staff_store.staff)
            }
        }, [filteredDirections, filteredPrograms])


        return (
            <Container className="mt-md-5" style={{display: "flex", width: "100vw"}}>
                <Row>
                    <Col lg={3} style={{display: "inline-block", right: 0}}>
                        <PersonalitiesFilterBar filteredDirections={filteredDirections} setFilteredDirections={setFilteredDirections} filteredPrograms={filteredPrograms} setFilteredPrograms={setFilteredPrograms}/>
                    </Col>
                    <Col lg={9} className="mt-2 mt-lg-0" style={{display: "inline-block", left: 0}}>
                        <PersonalitiesList chosenStaffer={chosenStaffer} setChosenStaffer={setChosenStaffer} filteredStaff={filteredStaff} setFilteredStaff={setFilteredStaff}/>
                    </Col>
                </Row>
            </Container>
        );
    }
);


export default PersonalitiesPage;