import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container} from "react-bootstrap";
import CreateDirection from "../components/admin_panels/CreateDirection";
import CreateStaff from "../components/admin_panels/CreateStaff";
import {fetchDirectionsBachelor} from "../http/admissionAPI";
import {Context} from "../index";
import CreateProgram from "../components/admin_panels/CreateProgram";
import CreateElectionOrContest from "../components/admin_panels/CreateElectionOrContest";
import CreatePartner from "../components/admin_panels/CreatePartner";
import CreateOrEditBlock from "../components/admin_panels/CreateOrEditBlock"
import BlocksEditor from "../components/admin_panels/BlocksEditor";


const Admin = () => {
    const {admission_store} = useContext(Context)

    useEffect(() => {
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirectionsBachelor(data.rows)
        )
    }, [])

    const [staffVisible, setStaffVisible] = useState(false)
    const [directionVisible, setDirectionVisible] = useState(false)
    const [programVisible, setProgramVisible] = useState(false)
    const [electionsAndContestsVisible, setElectionsAndContestsVisible] = useState(false)
    const [partnersVisible, setPartnersVisible] = useState(false);
    const [createBlockVisible, setCreateBlockVisible] = useState(false);
    const [editBlockVisible, setEditBlockVisible] = useState(false);


    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setStaffVisible(true)}>
                Добавить сотрудника
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setDirectionVisible(true)}>
                Добавить направление бакалавриата
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setProgramVisible(true)}>
                Добавить программу ДПО
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setElectionsAndContestsVisible(true)}>
                Добавить выборы или конкурс
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setPartnersVisible(true)}>
                Добавить партнера
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setCreateBlockVisible(prev => !prev)}>
                Добавить блок
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setEditBlockVisible(prev => !prev)}>
                Редактировать блок
            </Button>

            <CreateStaff show={staffVisible} onHide={() => setStaffVisible(false)}/>
            <CreateDirection show={directionVisible} onHide={() => setDirectionVisible(false)}/>
            <CreateProgram show={programVisible} onHide={() => setProgramVisible(false)}/>
            <CreateElectionOrContest show={electionsAndContestsVisible} onHide={() => setElectionsAndContestsVisible(false)}/>
            <CreatePartner show={partnersVisible} onHide={() => setPartnersVisible(false)}/>
            {createBlockVisible && <CreateOrEditBlock block={{fakeParam: undefined}}/>}
            {editBlockVisible && <BlocksEditor show={editBlockVisible} onHide={() => setEditBlockVisible(false)}/>}
        </Container>
    );
};

export default Admin;
