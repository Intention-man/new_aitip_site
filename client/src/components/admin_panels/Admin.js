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
import  "../css/page_styles/AdminPanel.css";
import {keys} from "mobx";



const Admin = () => {
    const {admission_store} = useContext(Context)

    useEffect(() => {
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirectionsBachelor(data.rows)
        )
    }, [])

    // const [staffVisible, setStaffVisible] = useState(false)
    // const [directionVisible, setDirectionVisible] = useState(false)
    // const [programVisible, setProgramVisible] = useState(false)
    // const [electionsAndContestsVisible, setElectionsAndContestsVisible] = useState(false)
    // const [partnersVisible, setPartnersVisible] = useState(false);

    const [windowVisible, setWindowVisible] = useState("")
    const forms = {
        "Добавить сотрудника": <CreateStaff />,
        "Добавить направление бакалавриата": <CreateDirection />,
        "Добавить программу ДПО": <CreateProgram />,
        "Добавить выборы или конкурс": <CreateElectionOrContest />,
        "Добавить партнера": <CreatePartner />,
    }


    return (
        <Container className="d-flex flex-column">
            {Object.keys(forms).map(key =>
                <Button className="button-admin" onClick={() => setWindowVisible(key)}>
                    {key}
                </Button>
            )}
            {windowVisible && forms[windowVisible]}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setWindowVisible(true)}>*/}
            {/*    Добавить сотрудника*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setWindowVisible(true)}>*/}
            {/*    Добавить направление бакалавриата*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setWindowVisible(true)}>*/}
            {/*    Добавить программу ДПО*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setWindowVisible(true)}>*/}
            {/*    Добавить выборы или конкурс*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setWindowVisible(true)}>*/}
            {/*    Добавить партнера*/}
            {/*</Button>*/}
            {/*<CreateStaff />*/}
            {/*<CreateDirection />*/}
            {/*<CreateProgram />*/}
            {/*<CreateElectionOrContest />*/}
            {/*<CreatePartner />*/}
        </Container>
    );
};

export default Admin;
