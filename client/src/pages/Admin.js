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
import CreateNews from "../components/admin_panels/CreateNews";
import CreateCard from "../pages/CreateCard"



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
    const [newsVisible, setNewsVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);


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
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setNewsVisible(true)}>
                Добавить новость
            </Button>
            <Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setCardVisible(true)}>
                Добавить карточку
            </Button>


            <CreateStaff show={staffVisible} onHide={() => setStaffVisible(false)}/>
            <CreateDirection show={directionVisible} onHide={() => setDirectionVisible(false)}/>
            <CreateProgram show={programVisible} onHide={() => setProgramVisible(false)}/>
            <CreateElectionOrContest show={electionsAndContestsVisible} onHide={() => setElectionsAndContestsVisible(false)}/>
            <CreatePartner show={partnersVisible} onHide={() => setPartnersVisible(false)}/>
            {newsVisible && <CreateNews newsVisible={newsVisible} setNewsVisible={setNewsVisible}/>}
            <CreateCard show={cardVisible} onHide={() => setCardVisible(false)}/>

        </Container>
    );
};

export default Admin;
