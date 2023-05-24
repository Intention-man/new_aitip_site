// Карточка сотрудника, которая при нажатии будет раскрываться и показывать подробную информацию

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import email from "../../../local_assets/sms (1).png";
import phone from "../../../local_assets/Vector (2).png";
import address from "../../../local_assets/location (1).png";
import PersonalitiesList from "./PersonalitiesList";
import ButtonList from "../../../components/ButtonList";


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

    const [activeText, setActiveText] = useState(Object.keys(textsNames)[0]);

    console.log(staffer.name)

    return (
        <div className="staffer_item_opened">
            <div id={staffer.id} style={{
                cursor: "pointer",
                margin: "0",
                padding: "0",
                borderColor: "lightgray",
                display: "flex",
                flexWrap: "wrap"
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
                            Х
                        </button>
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
                <ButtonList className="small_button_list" buttonList={textsNames} setChosenValue={setActiveText}/>
            </div>
            <div className="text_block">
                <p className="text_desc">
                    {textsNames[activeText]}
                </p>
            </div>
        </div>
    )
});

export default StafferItem;
