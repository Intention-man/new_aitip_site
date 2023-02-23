import React, {useState} from 'react';
import Card from "../../components/lines/Card";
import "../../css/page_styles/Employees.css"

const EmployeesAdvertismentFilter = ({chosenYear, setChosenYear, chosenAdType, setChosenAdType}) => {
    return (
        <Card
            imgPos="none"
            className="Card-body-none"
        >
            <h1 className="zipAdv" >Выборы заведующих кафедрами</h1>
            <div className="nameUniversity">
                Алтайский институт труда и права (филиал) Образовательного учреждения профсоюзов высшего образования «Академия труда и социальных отношений» объявляет конкурс на замещение вакантных должностей.
            </div>
            <div className="requirementsForDocuments">
                К заявлению должны быть приложены копии документов, подтверждающих соответствие претендента квалификационным требованиям, и документы, подтверждающие отсутствие у него ограничений на занятие трудовой деятельностью в сфере образования, предусмотренных законодательными и иными нормативными правовыми актами.
            </div>
            <div className="requirementsForThePosition">
                Квалификационные требования к должности заведующего кафедрой Алтайского института труда и права (филиал) ОУП ВО «Академия труда и социальных отношений» представлены на официальном сайте института в Положении о порядке проведения выборов на должность заведующего кафедрой АИТиП (филиал) ОУП ВО «АТиСО»
            </div>
            <div className="documentation-card">
                Положение о порядке проведения выборов на должность заведующего кафедрой АИТиП (филиал) ОУП ВО «АТиСО»
            </div>
            <a href="#!" className="link-document-section">
                перейти к разделу "Документы"
            </a>
        </Card>
    );
};

export default EmployeesAdvertismentFilter;