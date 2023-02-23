import React, {useState} from 'react';
import Card from "../../components/lines/Card";
import "../../css/page_styles/Employees.css"

const EmployeesAdvertismentFilter = ({chosenYear, setChosenYear, chosenAdType, setChosenAdType}) => {
    const date = new Date().getFullYear();
    let buttonList = ["Выборы заведующих кафедрами", "Конкурсы на замещение вакантных должностей"]
    for (let i = 0; i < 6; i++) {
        buttonList.push(date-i)
    }
    return (
        <Card
            imgPos="none"
            className="Card-body-none"
        >
            <h1 className="zipAdv" >Архив объявлений</h1>
            <ul className="tracks">
                {buttonList.map(buttonName =>
                    <li className="buttonsSearch" key={buttonName} style={{marginBottom: "2%"}} >
                            <button className="textInButtonSearch"
                                key={buttonName}
                                onClick={() => {
                                    (typeof buttonName === "string") ?
                                        setChosenAdType(buttonName) : setChosenYear(buttonName)
                                    }}
                            >
                                {buttonName}
                            </button>
                    </li>
                )}
            </ul>
        </Card>
    );
};

export default EmployeesAdvertismentFilter;