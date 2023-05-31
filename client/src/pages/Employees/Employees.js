import React, {useEffect, useState} from 'react';
import {fetchElectionsAndContests} from "../../http/electionsAndContestsAPI";
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
        <>
            <ContestsBlock contests={electionsAndContests.filter(e => e.kind === "Конкурс")}/>
            <ElectionsBlock elections={electionsAndContests.filter(e => e.kind === "Выборы")}/>
        </>
    );
};

export default Employees;