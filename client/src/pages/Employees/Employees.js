import React, {useEffect, useState} from 'react';
import CardContainer from "../../components/common/CardContainer";
import EmployeesContent1 from "./EmployeesAdvertismentFilter";
import {set} from "mobx";
import EmployeesAdvertismentFilter from "./EmployeesAdvertismentFilter";
import EmployeesAdvertismentList from "./EmployeesAdvertismentList";
import "../../css/page_styles/Employees.css"
import {fetchElectionsAndContests} from "../../http/electionsAndContestsAPI";
import EmployeesAdvertismentInfo from "./EmployeesAdvertismentInfo";
import EmployeesAdvertismentInfo2 from "./EmployeesAdvertismentInfo2";
import EmployeesAdvertismentImportantDoc from "./EmployeesAdvertismentImportantDoc";
import EmployeesAdvertismentCurrentElections from "./EmployeesAdvertismentCurrentElections";
import EmployeesAdvertismentCurrentContents from "./EmployeesAdvertismentCurrentContents";


const Employees = () => {
    const date = new Date().getFullYear()
    // const adList = [
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Выборы", applicationsAcceptanceDateStart: "30.06.2022", applicationsAcceptanceDateEnd: "09.08.2022", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 219", eventDate: "31.09.2022", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Выборы", applicationsAcceptanceDateStart: "30.06.2022", applicationsAcceptanceDateEnd: "09.08.2022", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 219", eventDate: "31.09.2022", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Конкурсы", applicationsAcceptanceDateStart: "30.06.2022", applicationsAcceptanceDateEnd: "09.08.2022", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 219", eventDate: "31.09.2022", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Выборы", applicationsAcceptanceDateStart: "30.06.2022", applicationsAcceptanceDateEnd: "09.08.2022", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 219", eventDate: "31.09.2020", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Выборы", applicationsAcceptanceDateStart: "2022-06-30 03:00:00+03", applicationsAcceptanceDateEnd: "2022-08-09 03:00:00+03", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 200", eventDate: "2022-08-31 03:00:00+03", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    //     {
    //         name: "Заведующий кафедры правовых дисциплин, публичного управления и профсоюзного движения (0,25 ставки)", kind: "Выборы", applicationsAcceptanceDateStart: "30.06.2022", applicationsAcceptanceDateEnd: "09.08.2022", applicationsAcceptancePlace: "г. Барнаул, просп. Ленина, 23, каб. 219", eventDate: "07.01.2016", eventTime: "14:00:00", eventPlace:"г. Барнаул, просп. Ленина, 23, каб. 225"
    //     },
    // ]

    const [filteredAdList, setFilteredAdList] = useState([])
    const [chosenYear, setChosenYear] = useState(0)
    const [chosenAdType, setChosenAdType] = useState("")
    const [adList, setAdList] = useState([])

    useEffect(() => {
        fetchElectionsAndContests().then(data => setAdList(data.rows.filter(ad => date -Number(ad.eventDate.slice(0, 4)) <= 5)))
            console.log(adList)
    }, [])


    useEffect(() => {setFilteredAdList(adList.filter(ad => (chosenAdType.length>0 && ((chosenAdType.split(" ")[0] === ad.kind+"ы")||(chosenAdType.split(" ")[0] === ad.kind)) && (chosenYear>0 && chosenYear === Number(ad.eventDate.slice(0, 4))))))
        console.log(chosenAdType+chosenYear+filteredAdList)
    },[chosenAdType, chosenYear])


    return (
        <CardContainer>
            <EmployeesAdvertismentInfo/>
            <EmployeesAdvertismentCurrentElections adList={adList} setAdList={setAdList}/>
            <EmployeesAdvertismentInfo2/>
            <EmployeesAdvertismentCurrentContents adList={adList} setAdList={setAdList}/>
            <EmployeesAdvertismentImportantDoc/>
            <EmployeesAdvertismentFilter chosenYear={chosenYear} setChosenYear={setChosenYear} chosenAdType={chosenAdType} setChosenAdType={setChosenAdType} />
            <div className="headingBlock">
                <h1 className="headingText">
                {chosenAdType}
                </h1>
            </div>
            {chosenAdType.length>0 && chosenYear>0 && <EmployeesAdvertismentList filteredAdList={filteredAdList} setFilteredAdList={setFilteredAdList}/>}
        </CardContainer>
    );
};

export default Employees;