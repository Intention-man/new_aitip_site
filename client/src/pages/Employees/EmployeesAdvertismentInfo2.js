import React, {useState} from 'react';
import Card from "../../components/lines/Card";
import "../../css/page_styles/Employees.css"

const EmployeesAdvertismentFilter = ({chosenYear, setChosenYear, chosenAdType, setChosenAdType}) => {
    return (
        <Card
            imgPos="none"
            className="Card-body-none"
        >
            <h1 className="zipAdv" >Конкурс на замещение вакантных должностей</h1>
            <div className="nameUniversity">
                Алтайский институт труда и права (филиал) Образовательного учреждения профсоюзов высшего образования «Академия труда и социальных отношений» объявляет конкурс на замещение вакантных должностей.
            </div>
            <div className="requirementsForDocuments">
                К заявлению должны быть приложены копии документов, подтверждающих соответствие претендента квалификационным требованиям, и документы, подтверждающие отсутствие у него ограничений на занятие трудовой деятельностью в сфере образования, предусмотренных законодательными и иными нормативными правовыми актами.
            </div>
            <div className="requirementsForThePosition">
                Квалификационные характеристики и требования к должностям профессорско-преподавательского состава Алтайского института труда и права (филиал) ОУП ВО «Академия труда и социальных отношений» представлены на официальном сайте в Положении о порядке замещения должностей педагогических работников, относящихся к профессорско-преподавательскому составу.
            </div>
            <div className="documentation-card">
                Положении о порядке замещения должностей педагогических работников, относящихся к профессорско-преподавательскому составу.
            </div>
            <a href="#!" className="link-document-section">
                перейти к разделу "Документы"
            </a>
        </Card>
    );
};

export default EmployeesAdvertismentFilter;