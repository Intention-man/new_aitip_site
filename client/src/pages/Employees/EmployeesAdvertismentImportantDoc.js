import React, {useState} from 'react';
import Card from "../../components/lines/Card";
import "../../css/page_styles/Employees.css"

const EmployeesAdvertismentImportantDoc = ({chosenYear, setChosenYear, chosenAdType, setChosenAdType}) => {
    return (
        <Card
            imgPos="none"
            className="Card-body-none"
        >
            <h1 className="zipAdv" >Важные документы</h1>
            <a href="#!" className="important-documentation-card">
                Приказ Министерства образования и науки РФ от 23 июля 2015 г. N 749"Об утверждении Положения о порядке замещения должностей педагогических работников, относящихся к профессорско-преподавательскому составу"
            </a>
            <a href="#!" className="important-documentation-card">
                Список педагогических работников, у которых в 2022-2023 учебном году истекает срок трудового договора
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

        </Card>
    );
};

export default EmployeesAdvertismentImportantDoc;