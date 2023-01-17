import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container} from "react-bootstrap";
import CreateDirection from "../components/admin_panels/CreateDirection";
import CreateStaff from "../components/admin_panels/CreateStaff";
import {fetchDirectionsBachelor} from "../http/admissionAPI";
import {Context} from "../index";



const Admin = () => {
    const {admission_store} = useContext(Context)

    useEffect(() => {
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirections_bachelor(data.rows)
        )
    }, [])

    const [staffVisible, setStaffVisible] = useState(false)
    const [directionVisible, setDirectionVisible] = useState(false)


    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setStaffVisible(true)}>
                Добавить сотрудника
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setDirectionVisible(true)}>
                Добавить направление
            </Button>
            <CreateStaff show={staffVisible} onHide={() => setStaffVisible(false)}/>
            <CreateDirection show={directionVisible} onHide={() => setDirectionVisible(false)}/>
        </Container>
    );
};

export default Admin;
