// Карточка сотрудника, которая при нажатии будет раскрываться и показывать подробную информацию

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import email from "../../../local_assets/sms (1).png";
import phone from "../../../local_assets/Vector (2).png";
import address from "../../../local_assets/location (1).png";
import PersonalitiesList from "./PersonalitiesList";


/*function viewDiv(elementId) {
    let div = document.getElementById(elementId);
    if (getComputedStyle(div).display === "none") {
        div.style.display = "flex"
    }
    if (getComputedStyle(div).display === "flex") {
        div.style.display = "none"
    }
}*/

const StafferItem = observer(({staffer, closeStaffer}) => {

    const textsNames = {
        "Биография": staffer.bio_text,
        "Дисциплины и курсы": staffer.disciplines_and_courses_text,
        "Публикации": staffer.publications_text,
        "Проекты": staffer.projects_text
    }

    const [activeText, setActiveText] = useState();

    console.log(staffer.name)

    return (
        <div>
            <div id={staffer.id} style={{
                cursor: "pointer",
                margin: "0 10px",
                padding: "0",
                borderColor: "lightgray",
                display: "flex"
            }}
                // onClick={() => viewDiv(staffer.id)}
            >


                <div className="description_block">
                <img src={process.env.REACT_APP_API_URL + staffer.img}
                     className="big_avatar"
                     alt="картинка чет не загрузилась"/>
                <div>
                    {/*<div className="top_block_row">*/}
                    {/*    <div className="top_content">*/}
                            <div className="staffer_name"> {staffer.name} </div>
                            <button className="close-btn"
                            onClick={() => closeStaffer(staffer.id)}>
                                Х</button>
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="general_desc"> {staffer.post} </div>
                    <div className="general_desc"> {staffer.academic_degree} {staffer.title}</div>
                    <div className="personal_data">
                        <div className="data_part">
                            <img src={email} className="data_icon"/>
                            <div> {staffer.email} </div>
                        </div>
                        <div className="data_part">
                            <img src={phone} className="data_icon"/>
                            <div> {staffer.phone_number} </div>
                        </div>
                        <div className="data_part">
                            <img src={address} className="data_icon"/>
                            <div>{staffer.adress}</div>
                        </div>
                    </div>


                </div>
            </div>
            </div>
            <div id="div_for_button_list" >
                <ul className="tracks button_row">
                    {Object.entries(textsNames).map(([k, v]) => (v &&
                            <li key={k} style={{marginRight: "10px"}}>
                                <button className="description_buttons" id="my_button"
                                    style={{backgroundColor: (activeText === v ? "white" : "#EEEEEE"), fontWeight: (activeText === v ? "bold" : "normal")}}
                                    key={k}
                                    onClick={() => {
                                        setActiveText(v)
                                        const textField = document.querySelector('.text_block');
                                        const textField1 = document.querySelector('.text_bg');
                                        textField.classList.remove("text_block");
                                        textField.classList.add("text_block_active");
                                        textField1.classList.remove("text_bg");
                                        textField1.classList.add("text_bg_active");

                                        /*let p = document.createElement('p');

                                        document.getElementById("div_for_button_list").appendChild(p);
                                        p.appendChild(document.createTextNode(v))*/
                                    }
                                    }
                                >
                                    {k}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="text_block">
                <div className="text_bg">
                    <p className="text_desc">
                        {activeText}
                    </p>
                </div>
            </div>
        </div>
    )
});

export default StafferItem;
