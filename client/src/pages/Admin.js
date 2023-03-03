import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container} from "react-bootstrap";
import CreateDirection from "../components/admin_panels/CreateDirection";
import CreateStaff from "../components/admin_panels/CreateStaff";
import {fetchAdditionalPrograms, fetchDirectionsBachelor} from "../http/admissionAPI";
import {Context} from "../index";
import CreateProgram from "../components/admin_panels/CreateProgram";
import CreateElectionOrContest from "../components/admin_panels/CreateElectionOrContest";
import CreatePartner from "../components/admin_panels/CreatePartner";
import CreateOrEditBlock from "../components/admin_panels/CreateOrEditBlock"
import BlocksEditor from "../components/admin_panels/BlocksEditor";
import BlocksSwap from "../components/admin_panels/BlocksSwap";
import "../css/page_styles/AdminPanel.css"
import StaffEditor from "../components/admin_panels/StaffEditor";
import ButtonList from "../components/ButtonList";
import {fetchAllFiles} from "../http/commonAPI";


const Admin = () => {
    const {admission_store} = useContext(Context)
    const {block_store} = useContext(Context)

    const [windowVisible, setWindowVisible] = useState("")
    const forms = {
        "Добавить сотрудника": <CreateStaff staffer={{fakeParam: undefined}}/>,
        "Редактировать сотрудника": <StaffEditor/>,
        "Добавить направление бакалавриата": <CreateDirection />,
        "Добавить программу ДПО": <CreateProgram />,
        "Добавить выборы или конкурс": <CreateElectionOrContest />,
        "Добавить партнера": <CreatePartner />,
        "Добавить блок": <CreateOrEditBlock block={{fakeParam: undefined}}/>,
        "Редактировать блок": <BlocksEditor/>,
        "Изменить порядок блоков на странице": <BlocksSwap/>
    }


    useEffect(() => {
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirectionsBachelor(data.rows)
        )
        fetchAdditionalPrograms().then(data =>
            admission_store.setAdditionalPrograms(data.rows)
        )
        fetchAllFiles().then(data =>
            block_store.setAllFiles(data.rows)
        )
    }, [])


    return (
        <Container className="d-flex flex-column">
            {/*{Object.keys(forms).map(key =>*/}
            {/*    <Button className="button-admin" onClick={() => setWindowVisible(key)}>*/}
            {/*        {key}*/}
            {/*    </Button>*/}
            {/*)}*/}
            <ButtonList buttonList={forms} setChosenValue={setWindowVisible}/>
            {windowVisible && forms[windowVisible]}
        </Container>
    );
};

export default Admin;