import React, {useEffect, useState} from 'react';
import {fetchElectionsAndContests} from "../../http/electionsAndContestsAPI";
import CardContainer from "../../components/lines/CardContainer";
import ElectionsBlock from "./EmployeesParts/ElectionsBlock";
import ContestsBlock from "./EmployeesParts/ContestsBlock";

const Employees = () => {
    const [electionsAndContests, setElectionsAndContests] = useState([]);

    useEffect(() => {
        fetchElectionsAndContests().then(data => {
            setElectionsAndContests(data.rows)
        })
    }, [])



    return (
        <CardContainer>
            <ElectionsBlock elections={electionsAndContests.filter(event => event.kind === "Выборы")}/>
            <ContestsBlock contests={electionsAndContests.filter(event => event.kind === "Конкурс")}/>
        </CardContainer>
    );
};

export default Employees;