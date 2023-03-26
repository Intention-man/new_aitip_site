import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";

import {fetchAdditionalPrograms, fetchDirectionsBachelor} from "../http/admissionAPI";
import {Context} from "../index";
import CreateStaff from "../admin_panels/usual_tables/CreateStaff";
import StaffEditor from "../admin_panels/usual_tables/StaffEditor";
import CreateDirection from "../admin_panels/usual_tables/CreateDirection";
import DirectionEditor from "../admin_panels/usual_tables/DirectionEditor";
import CreateProgram from "../admin_panels/usual_tables/CreateProgram";
import ProgramEditor from "../admin_panels/usual_tables/ProgramEditor";
import ElectionsAndContestsEditor from "../admin_panels/usual_tables/ElectionsAndContestsEditor";
import CreateElectionOrContest from "../admin_panels/usual_tables/CreateElectionOrContest";
import CreatePartner from "../admin_panels/usual_tables/CreatePartner";
import PartnerEditor from "../admin_panels/usual_tables/PartnerEditor";
import CreateSchedule from "../admin_panels/usual_tables/CreateSchedule";
import ScheduleEditor from "../admin_panels/usual_tables/ScheduleEditor";
import CreateLab from "../admin_panels/usual_tables/CreateLab";
import LabEditor from "../admin_panels/usual_tables/LabEditor";
import CreateOrEditBlock from "../admin_panels/constructor_edit_components/CreateOrEditBlock";
import BlocksSwap from "../admin_panels/constructor_edit_components/BlocksSwap";
import OptimizationZone from "../admin_panels/OptimizationZone";
import BlocksEditor from "../admin_panels/constructor_edit_components/BlocksEditor";
import ButtonList from "../components/ButtonList";
import {fetchAllFiles} from "../http/commonAPI";



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
        "Создать лабораторию": <CreateLab lab={{fakeParam: undefined}}/>,
        "Редактировать лабораторию": <LabEditor/>,

        "Добавить блок": <CreateOrEditBlock block={{fakeParam: undefined}}/>,
        "Редактировать блок": <BlocksEditor/>,
        "Изменить порядок блоков на странице": <BlocksSwap/>,
        "Оптимизация": <OptimizationZone/>
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