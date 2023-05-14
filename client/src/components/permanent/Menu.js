import React from 'react';
import "../../css/component_styles/Menu.css"
import logo from "../../local_assets/logo-in-round.svg"
import search from "../../local_assets/search.png"
import eye from "../../local_assets/eye.png"
import {
    ADMISSION_APE,
    ADMISSION_BAC,
    CONTACTS, COUNTERING, DOCUMENTS,
    HISTORY, INFO_EDU_ORG, INTERNATIONAL_ACT,
    LEGAL_CLINIC,
    PARTNERS,
    PERSONALITIES_PAGE,
    SCIENCE,
    STAFF, STRUCTURE,
    STUDENTS
} from "../../consts/pageConsts";
import SearchOutputWindow from "./SearchOutputWindow";



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

    return (
        <div>
            <div className="topnav" id="myTopnav">
                <img className="logo" id="Logo" src={logo}/>
                <a className="vuz-name" id="vuz-name-id">
                    <p className="heading_color">Алтайский институт труда и права</p>
                </a>

                <SearchOutputWindow/>
                {/*<input className="search-input" type="text" placeholder="Поиск по сайту"/>*/}
                {/*<div className="button_search" style={{cursor: "default"}}*/}
                {/*     onClick={() => modal.style.display = "block"}>*/}
                {/*    <img src={search} width="25" height="25"/>*/}
                {/*</div>*/}

                {/*<div id="myModal" className="modal">*/}

                {/*<div className="modal-content">*/}
                {/*    <a href="#" className="modal-line">Page 1</a>*/}
                {/*    <a href="#" className="modal-line">Page 2</a>*/}
                {/*    <a href="#" className="modal-line">Page 3</a>*/}
                {/*</div>*/}
                {/*</div>*/}

                <button className="blindversion">
                    Версия для слабовидящих
                    <img src={eye} style={{color: "white", paddingLeft: "10px", paddingTop: "12px"}}/>
                </button>
                <a className="icon" onClick={() => myFunction()}>
                    <i className="fa fa-bars"/>
                </a>
            </div>

            {/*2 line*/}

            <div className="bottom_menu" id="myMenu">
                {menuList.map(listPoint => {
                    return (
                        <div className="dropdown">
                            {(listPoint.hasOwnProperty("children")) &&
                                <div>
                                    <a className="dropdown-button">{listPoint.name}</a>
                                    <ul className="dropdown-content">
                                        {listPoint.children.map(child => {
                                            return (
                                                <li><a href={child.link}>{child.name}</a></li>
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