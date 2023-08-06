import React from 'react';
import "../../css/component_styles/Menu.css"
import logo from "../../local_assets/logo-in-round.svg"
import {
    ADMISSION_APE,
    ADMISSION_BAC,
    CONTACTS,
    COUNTERING,
    DOCUMENTS,
    HISTORY,
    INFO_EDU_ORG,
    INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    PARTNERS,
    PERSONALITIES_PAGE,
    SCIENCE,
    STAFF,
    STRUCTURE,
    STUDENTS
} from "../../consts/pageConsts";
import SearchOutputWindow from "./SearchOutputWindow";
import {useNavigate} from "react-router";
import BlindVersionSwitcher from './BlindVersionSwitcher';


function myFunction() {
    const x = document.getElementById("myTopnav");
    const y = document.getElementById("myMenu");
    const l = document.getElementById("Logo");
    const c = document.getElementById("vuz-name-id");
    if (x.className === "topnav" || l.className === "logo" || c.className === "vuz-name") {
        x.className += " responsive";
        y.className += " responsive";
        l.className += " responsive";
        c.className += " responsive"
    } else {
        x.className = "topnav";
        y.className = "bottom_menu";
        l.className = "logo";
        c.className = "vuz-name"
    }
}

const Menu = () => {
    const menuList = [
        {
            name: "Об институте",
            children: [
                {
                    name: "Сведения об образовательной организации",
                    link: INFO_EDU_ORG,
                },
                {
                    name: "История института",
                    link: HISTORY,
                },
                {
                    name: "Структура и органы управления",
                    link: STRUCTURE,
                },
                {
                    name: "Персоналии",
                    link: PERSONALITIES_PAGE,
                },
                {
                    name: "Документы",
                    link: DOCUMENTS,
                },
                {
                    name: "Международная деятельность",
                    link: INTERNATIONAL_ACT,
                },
                {
                    name: "Противодействие угрозам",
                    link: COUNTERING,
                },
                {
                    name: "Контакты",
                    link: CONTACTS,
                },
            ]
        },
        {
            name: "Абитуриентам",
            children: [
                {
                    name: "Бакалавриат",
                    link: ADMISSION_BAC,
                },
                {
                    name: "Дополнительно профессиональное образование",
                    link: ADMISSION_APE,
                },
            ]
        },
        {
            name: "Студентам",
            link: STUDENTS
        },
        {
            name: "Сотрудникам",
            link: STAFF
        },
        {
            name: "Наука",
            link: SCIENCE
        },
        {
            name: "Партнеры и работодатели",
            link: PARTNERS
        },
        {
            name: "Юридическая клиника",
            link: LEGAL_CLINIC
        },
    ]
    const navigate = useNavigate();

    return (
        <div>
            <div className="topnav" id="myTopnav">
                <img className="logo" id="Logo" src={logo} onClick={() => {
                    navigate("/")
                    navigate(0)
                }}/>
                <a className="vuz-name" id="vuz-name-id" href="/">
                    <h1 className="heading_color">Алтайский институт труда и права</h1>
                </a>
                <SearchOutputWindow/>
                <BlindVersionSwitcher/>
                <a className="icon" onClick={() => myFunction()}>
                    <i className="fa fa-bars"/>
                </a>
            </div>

            {/*2 line*/}

            <div className="bottom_menu" id="myMenu">
                {menuList.map(listPoint => {
                    return (
                        <div className="dropdown" key={listPoint.name}>
                            {(listPoint.hasOwnProperty("children")) &&
                                <div>
                                    <a className="dropdown-button">{listPoint.name}</a>
                                    <ul className="dropdown-content">
                                        {listPoint.children.map(child => {
                                            return (
                                                <li key={child.name}><a href={child.link}>{child.name}</a></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                            {!(listPoint.hasOwnProperty("children")) && listPoint.hasOwnProperty("link") &&
                                <div>
                                    <a className="dropdown-button" href={listPoint.link}>{listPoint.name}</a>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Menu;