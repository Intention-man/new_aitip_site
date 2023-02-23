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
import BlocksSwap from "../components/admin_panels/BlocksSwap";
import "../css/page_styles/AdminPanel.css"


const Admin = () => {
    const {admission_store} = useContext(Context)
    const {block_store} = useContext(Context);

    const [staffVisible, setStaffVisible] = useState(false)
    const [directionVisible, setDirectionVisible] = useState(false)
    const [programVisible, setProgramVisible] = useState(false)
    const [electionsAndContestsVisible, setElectionsAndContestsVisible] = useState(false)
    const [partnersVisible, setPartnersVisible] = useState(false);
    const [createBlockVisible, setCreateBlockVisible] = useState(false);
    const [editBlockVisible, setEditBlockVisible] = useState(false);
    const [swapBlockVisible, setSwapBlockVisible] = useState(false);

    const [windowVisible, setWindowVisible] = useState("")
    const forms = {
        "Добавить сотрудника": <CreateStaff />,
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
    }, [])


    return (
        <Container className="d-flex flex-column">
            {Object.keys(forms).map(key =>
                <Button className="button-admin" onClick={() => setWindowVisible(key)}>
                    {key}
                </Button>
            )}
            {windowVisible && forms[windowVisible]}


            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setCreateBlockVisible(prev => !prev)}>*/}
            {/*    Добавить блок*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setEditBlockVisible(prev => !prev)}>*/}
            {/*    Редактировать блок*/}
            {/*</Button>*/}
            {/*<Button variant={"outline-info"} className="mt-2 p-2" onClick={() => setSwapBlockVisible(prev => !prev)}>*/}
            {/*    Изменить порядок блоков на странице*/}
            {/*</Button>*/}



            {/*{createBlockVisible && <CreateOrEditBlock block={{fakeParam: undefined}}/>}*/}
            {/*{editBlockVisible && <BlocksEditor show={editBlockVisible} onHide={() => setEditBlockVisible(false)}/>}*/}
            {/*{swapBlockVisible && <BlocksSwap show={swapBlockVisible} onHide={() => setSwapBlockVisible(false)}/>}*/}
        </Container>
    );
};

export default Admin;
