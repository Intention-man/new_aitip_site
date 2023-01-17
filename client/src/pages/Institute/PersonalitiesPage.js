import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/personalities/TypeBar";
import {Context} from "../../index";
import {fetchStaff} from "../../http/staffAPI";
import {observer} from "mobx-react-lite";
import PersonalitiesList from "../../components/personalities/PersonalitiesList";
import {fetchDirectionsBachelor} from "../../http/admissionAPI";

const PersonalitiesPage = observer(() => {
        const {staff_store} = useContext(Context)
        const {admission_store} = useContext(Context)

        useEffect(() => {
            fetchStaff(1, 10).then(data => {
                    staff_store.setStaff(data.rows)
                    staff_store.setTotalCount(data.count)
                }
            )
            fetchDirectionsBachelor(1, 8).then(data => {
                admission_store.setDirections_bachelor(data.rows)
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


        return (
            <Container className="mt-5" style={{display: "flex", width: "100vw"}}>
                <Row style={{width: "100vw", left: 0}}>
                    <Col md={3} style={{display: "inline-block", right: 0}}>
                        <TypeBar/>
                    </Col>
                    <Col md={9} style={{display: "inline-block", left: 0}}>
                        <PersonalitiesList/>
                    </Col>
                </Row>
            </Container>
        );
    }
);


export default PersonalitiesPage;