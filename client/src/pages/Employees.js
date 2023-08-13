import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "../css/page_styles/Employees.css"
import {fetchElectionsAndContests} from "../http/electionsAndContestsAPI";
import Block from "../components/display/Block";
import ButtonList from "../components/ButtonList";
import CommonPagesDisplay from "../components/display/CommonPagesDisplay";


const EmployeesAdCurrentList = observer(({adList, header}) => {
    const monthList = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]


    const getDateFormat = (date) => {
        const d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return day + "." + month + "." + year
    }
    console.log(adList, header)

    if (!adList || (adList && adList.length === 0)){
        return <></>
    }

    return (
        <Block header={header} key={header}>
            {adList && adList.map(ad =>
                <div className="card-with-imp-info">
                    <p className="modifDate">Дата обновления: {getDateFormat(ad.updatedAt)}</p>
                    <div className="postPerson">
                        {ad.name}
                    </div>
                    <p className="admissionDates">
                        Дата и место приема заявлений на участие в
                        <span>
                            {ad.kind === "Выборы" ? " выборах:" : " конкурсе:"}
                            </span>
                    </p>
                    <div className="dateAndAddress">
                        <p>
                            {Number(ad.applicationsAcceptanceDateStart.slice(8, 10)) + " " + monthList[Number(ad.applicationsAcceptanceDateStart.slice(5, 7))] + " - " + Number(ad.applicationsAcceptanceDateEnd.slice(8, 10)) + " " + monthList[Number(ad.applicationsAcceptanceDateEnd.slice(5, 7))]}
                        </p>
                        <p>
                            {ad.applicationsAcceptancePlace}
                        </p>

                        <p>
                            {ad.applicationsAcceptanceDateStart.slice(0, 4) + " года"}
                        </p>
                        <p>
                            {"адрес приема заявлений"}
                        </p>
                    </div>
                    <p className="admissionDates">
                        Дата и место проведения
                        <span>
                            {ad.kind === "Выборы" ? " выборов:" : " конкурса:"}
                            </span>
                    </p>
                    <div className="dateAndAddress">
                        <p>
                            {Number(ad.eventDate.slice(8, 10)) + " " + monthList[Number(ad.eventDate.slice(5, 7))] + " в " + ad.eventTime}
                        </p>
                        <p>
                            {ad.eventPlace}
                        </p>

                        <p>
                            {ad.eventDate.slice(0, 4) + " года"}
                        </p>
                        <p>
                            {"место проведения" + (ad.kind === "Выборы" ? " выборов" : " конкурса")}
                        </p>
                    </div>
                </div>
            )}
        </Block>
    );
});


const EmployeesAdvertismentFilter = ({chosenYear, setChosenYear, chosenAdType, setChosenAdType}) => {
    const date = new Date().getFullYear();
    const typesList = ["Выборы заведующих кафедрами", "Конкурсы на замещение вакантных должностей"]
    let yearList = []
    for (let i = 0; i < 6; i++) {
        yearList.push(date - i)
    }

    return (
        <>
            <ButtonList buttonList={typesList} setChosenValue={setChosenAdType}/>
            <ButtonList buttonList={yearList} setChosenValue={setChosenYear}/>
        </>
    );
};

const EmployeesArchive = observer(() => {
    const [chosenYear, setChosenYear] = useState(0)
    const [chosenAdType, setChosenAdType] = useState("")
    const [filteredArchiveAdList, setFilteredArchiveAdList] = useState([])
    const [adList, setAdList] = useState([])

    const date = new Date().getFullYear()

    useEffect(() => {
        fetchElectionsAndContests().then(data => setAdList(data.rows.filter(ad => date - Number(ad.eventDate.slice(0, 4)) <= 5)))
        console.log(adList)
    }, [])

    useEffect(() => {
        setFilteredArchiveAdList(adList.filter(ad => (chosenAdType.length > 0 && ((chosenAdType.split(" ")[0] === ad.kind + "ы") || (chosenAdType.split(" ")[0] === ad.kind)) && (chosenYear > 0 && chosenYear === Number(ad.eventDate.slice(0, 4))))))
    }, [chosenAdType, chosenYear])

    return (
        <Block header="Архив объявлений">
            <EmployeesAdvertismentFilter chosenYear={chosenYear} setChosenYear={setChosenYear}
                                         chosenAdType={chosenAdType} setChosenAdType={setChosenAdType}/>
            {chosenAdType.length > 0 && chosenYear > 0 && <EmployeesAdCurrentList adList={filteredArchiveAdList}/>}
        </Block>
    )

});

const Employees = observer(() => {
    let [contestsList, setContestsList] = useState([]);
    let [electionsList, setElectionsList] = useState([]);


    let blockList = {
        2: <EmployeesAdCurrentList adList={electionsList} header="Актуальные выборы заведующих кафедрами"/>,
        3: <EmployeesAdCurrentList adList={contestsList} header="Актуальные конкурсы на замещение вакантных должностей"/>,
        5: <EmployeesArchive/>
    };


    const handMadeBlocksCount = 3
    const date = new Date().getFullYear()
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;

    useEffect(() => {
        console.log(1)
        fetchElectionsAndContests().then(data => {
            setContestsList(data.rows.filter(ad =>
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && ((month - Number(ad.eventDate.slice(5, 7))) === 0) && ((day - Number(ad.eventDate.slice(8, 10))) <= 0))
                ||
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) < 0))
                ||
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && (month - Number(ad.eventDate.slice(5, 7)) < 0))
            ));
            setElectionsList(data.rows.filter(ad =>
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && ((month - Number(ad.eventDate.slice(5, 7))) === 0) && ((day - Number(ad.eventDate.slice(8, 10))) <= 0))
                ||
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) < 0))
                ||
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && (month - Number(ad.eventDate.slice(5, 7)) < 0))
            ));


            // setBlockList({
            //     2: <EmployeesAdCurrentList adList={electionsList} header="Актуальные выборы заведующих кафедрами"/>,
            //     3: <EmployeesAdCurrentList adList={contestsList} header="Актуальные конкурсы на замещение вакантных должностей"/>,
            //     5: <EmployeesArchive/>
            // })
        })
    }, []);


    return (
        <CommonPagesDisplay blockList={blockList} handMadeBlocksCount={handMadeBlocksCount}/>
    );
});

export default Employees;