import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
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
import DirectionEditor from "../components/admin_panels/DirectionEditor";
import ProgramEditor from "../components/admin_panels/ProgramEditor";
import ElectionsAndContestsEditor from "../components/admin_panels/ElectionsAndContestsEditor";
import PartnerEditor from "../components/admin_panels/PartnerEditor";
import OptimizationZone from "../components/admin_panels/OptimizationZone";
import CreateSchedule from "../components/admin_panels/CreateSchedule";
import ScheduleEditor from "../components/admin_panels/ScheduleEditor";


const Admin = () => {
    const {admission_store} = useContext(Context)
    const {block_store} = useContext(Context)

    const [windowVisible, setWindowVisible] = useState("")
    const forms = {
        "Добавить сотрудника": <CreateStaff staffer={{fakeParam: undefined}}/>,
        "Редактировать сотрудника": <StaffEditor/>,
        "Добавить направление бакалавриата": <CreateDirection direction={{fakeParam: undefined}}/>,
        "Редактировать направление бакалавриата": <DirectionEditor/>,
        "Добавить программу ДПО": <CreateProgram program={{fakeParam: undefined}}/>,
        "Редактировать программу ДПО": <ProgramEditor/>,
        "Добавить выборы или конкурс": <CreateElectionOrContest eAC={{fakeParam: undefined}}/>,
        "Редактировать выборы или конкурс": <ElectionsAndContestsEditor/>,
        "Добавить партнера": <CreatePartner partner={{fakeParam: undefined}}/>,
        "Редактировать партнера": <PartnerEditor/>,
        "Создать расписание": <CreateSchedule schedule={{fakeParam: undefined}}/>,
        "Редактировать расписание": <ScheduleEditor/>,
        "Добавить блок": <CreateOrEditBlock block={{fakeParam: undefined}}/>,
        "Редактировать блок": <BlocksEditor/>,
        "Изменить порядок блоков на странице": <BlocksSwap/>,
        // "Оптимизация": <OptimizationZone/>
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
            <ButtonList buttonList={forms} setChosenValue={setWindowVisible}/>
            {windowVisible && forms[windowVisible]}
        </Container>
    );
};

export default Admin;