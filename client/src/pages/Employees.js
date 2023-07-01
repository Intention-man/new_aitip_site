import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "../css/page_styles/Employees.css"
import {fetchElectionsAndContests} from "../http/electionsAndContestsAPI";
import Block from "../components/display/Block";
import ButtonList from "../components/ButtonList";


const EmployeesAdCurrentList = ({adList, header}) => {
    const monthList = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const [list, setList] = useState(adList);

    useEffect(() => {
        setList(adList)
    }, [adList]);

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

    return (
        <Block header={header} key={header}>
            {list && list.map(ad =>
                <div className="card-with-imp-info">
                    <p className="modifDate">Дата обновления:   {getDateFormat(ad.updatedAt)}</p>
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
};

const EmployeesInfo = () => {
    return (
        <>
            {/*<h1 className="zipAdv">{header}</h1>*/}
            <p className="nameUniversity">
                Алтайский институт труда и права (филиал) Образовательного учреждения профсоюзов высшего образования
                «Академия труда и социальных отношений» объявляет конкурс на замещение вакантных должностей.
            </p>
            <p className="requirementsForDocuments">
                К заявлению должны быть приложены копии документов, подтверждающих соответствие претендента
                квалификационным требованиям, и документы, подтверждающие отсутствие у него ограничений на занятие
                трудовой деятельностью в сфере образования, предусмотренных законодательными и иными нормативными
                правовыми актами.
            </p>
            <p className="requirementsForThePosition">
                Квалификационные характеристики и требования к должностям профессорско-преподавательского состава
                Алтайского института труда и права (филиал) ОУП ВО «Академия труда и социальных отношений» представлены
                на официальном сайте в Положении о порядке замещения должностей педагогических работников, относящихся к
                профессорско-преподавательскому составу.
            </p>
            <p className="documentation-card">
                Положении о порядке замещения должностей педагогических работников, относящихся к
                профессорско-преподавательскому составу.
            </p>
            <a href="#!" className="link-document-section">
                перейти к разделу "Документы"
            </a>
        </>
    )
}

const EmployeesDocuments = () => {
    return (
        <>
            <h1 className="zipAdv">Важные документы</h1>
            <a href="#!" className="important-documentation-card">
                Приказ Министерства образования и науки РФ от 23 июля 2015 г. N 749"Об утверждении Положения о
                порядке замещения должностей педагогических работников, относящихся к
                профессорско-преподавательскому составу"
            </a>
            <a href="#!" className="important-documentation-card">
                Список педагогических работников, у которых в 2022-2023 учебном году истекает срок трудового
                договора
            </a>
            <a href="#!" className="important-documentation-card">
                Порядок разработки ОПОП
            </a>
            <a href="#!" className="important-documentation-card">
                Положение о порядке замещения должностей педагогических работников, относящихся к ППС
            </a>
            <a href="#!" className="important-documentation-card">
                Положение о порядке обучения охране труда АИТиП
            </a>
            <a href="#!" className="important-documentation-card">
                Положение о порядке проведения выборов на должность заведующего кафедрой
            </a>
            <a href="#!" className="important-documentation-card">
                Положение о порядке проведения конкурса для должностей научных работников
            </a>
            <a href="#!" className="important-documentation-card">
                Положение об аттестации профессорско-преподавательского состава
            </a>
        </>
    )
}

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

const EmployeesArchive = () => {
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
        <EmployeesAdvertismentFilter chosenYear={chosenYear} setChosenYear={setChosenYear} chosenAdType={chosenAdType} setChosenAdType={setChosenAdType}/>
        {chosenAdType.length > 0 && chosenYear > 0 && <EmployeesAdCurrentList adList={filteredArchiveAdList}/>}
    </Block> 
    )

}

const Employees = observer(() => {
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
    
    const {block_store} = useContext(Context);
   
    const [actualElectionsList, setActualElectionsList] = useState([]);
    const [actualContestsList, setActualContestsList] = useState([]);
    const [blockList, setBlockList] = useState({
        2: <EmployeesAdCurrentList adList={actualElectionsList} header="Актуальные выборы заведующих кафедрами"/>,
        3: <EmployeesAdCurrentList adList={actualContestsList} header="Актуальные конкурсы на замещение вакантных должностей"/>,
        5: <EmployeesArchive/>
    });

    const handMadeBlocksCount = 3
    const myAddress = "/" + window.location.href.split("/")[3]
    const date = new Date().getFullYear()
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;

    useEffect(() => {
        let pageConstructorBlocks = Array.from(block_store.blocks.filter(block => block.pageLink === myAddress).sort((block1, block2) => block1.ordinal - block2.ordinal))
        const count = pageConstructorBlocks.length + handMadeBlocksCount
        console.log(pageConstructorBlocks)

        for (let i = 1; (i <= count && pageConstructorBlocks.length > 0); i++) {
            if (!blockList.hasOwnProperty(i)) {
                // shift() - удаляет 0-ой элемент из массива и возвращает его
                const first = pageConstructorBlocks.shift()
                setBlockList(prev => ({...prev, [i]: first}))
            } else {
                console.log(blockList[i])
            }
        }
    }, [block_store.blocks, block_store.lines, handMadeBlocksCount]);
    

    useEffect(() => {
        fetchElectionsAndContests().then(data => {
            setActualContestsList(data.rows.filter(ad =>
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && ((month - Number(ad.eventDate.slice(5, 7))) === 0) && ((day - Number(ad.eventDate.slice(8, 10))) <= 0)) ||
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) < 0)) ||
                ((ad.kind === "Конкурс") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && (month - Number(ad.eventDate.slice(5, 7)) < 0))
            ))
            setActualElectionsList(data.rows.filter(ad =>
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && ((month - Number(ad.eventDate.slice(5, 7))) === 0) && ((day - Number(ad.eventDate.slice(8, 10))) <= 0)) ||
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) < 0)) ||
                ((ad.kind === "Выборы") && ((date - Number(ad.eventDate.slice(0, 4))) === 0) && (month - Number(ad.eventDate.slice(5, 7)) < 0))
            ))
        })
    }, [])


    return (
        <>
        {Object.values(blockList).map((block, index) => {
                if (block.hasOwnProperty("id")) {
                    return <Block key={index} block={block} header={block.header}/>
                } else {
                    return <>{block}</>
                }
            })}
        </>
    );
});

export default Employees;