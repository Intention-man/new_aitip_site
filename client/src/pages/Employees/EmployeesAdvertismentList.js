import React from 'react';
import {observer} from "mobx-react-lite";
import Card from "../../components/lines/Card";
import "../../css/page_styles/Employees.css"

const EmployeesAdvertismentList = observer(({filteredAdList, setFilteredAdList}) => {
    console.log(filteredAdList)
    const monthList = ["","января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    return (
            <Card
                imgPos="none"
                className="Card-body-none"
            >
                {filteredAdList.map(ad =>
                    <div className="card-with-imp-info">
                        <div className="postPerson">
                            {ad.name}
                        </div>
                        <p className="admissionDates">
                            Дата и место приема заявлений на участие в
                            <span>
                            {ad.kind === "Выборы" ? " выборах:":" конкурсе:"}
                            </span>
                        </p>
                        <div className="dateAndAddress">
                            <div>
                                {Number(ad.applicationsAcceptanceDateStart.slice(8,10))+" "+monthList[Number(ad.applicationsAcceptanceDateStart.slice(5,7))]+" - "+Number(ad.applicationsAcceptanceDateEnd.slice(8,10))+" "+monthList[Number(ad.applicationsAcceptanceDateEnd.slice(5,7))]}
                            </div>
                            <div>
                                {ad.applicationsAcceptancePlace}
                            </div>

                            <div>
                                {ad.applicationsAcceptanceDateStart.slice(0, 4)+" года"}
                            </div>
                            <div>
                                {"адрес приема заявлений"}
                            </div>
                        </div>
                        <p className="admissionDates">
                            Дата и место проведения
                            <span>
                            {ad.kind === "Выборы" ? " выборов:":" конкурса:"}
                            </span>
                        </p>
                        <div className="dateAndAddress">
                            <div>
                                {Number(ad.eventDate.slice(8,10))+" "+monthList[Number(ad.eventDate.slice(5,7))]+" в "+ad.eventTime}
                            </div>
                            <div>
                                {ad.eventPlace}
                            </div>

                            <div>
                                {ad.eventDate.slice(0,4)+" года"}
                            </div>
                            <div>
                                {"место проведения"+(ad.kind === "Выборы" ? " выборов":" конкурса")}
                            </div>
                        </div>
                    </div>
                )}
            </Card>


    );
});

export default EmployeesAdvertismentList;