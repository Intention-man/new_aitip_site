// Карточка сотрудника, которая при нажатии будет раскрываться и показывать подробную информацию

import React, {useState} from 'react';
import {observer} from "mobx-react-lite";


const StafferItem = observer(({staffer}) => {

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
                <img src={process.env.REACT_APP_API_URL + staffer.img}
                     style={{width: 150, display: "inline-block", margin: 0, height: "100px"}}
                     alt="картинка чет не загрузилась"/>
                <div>
                    <div> {staffer.name} </div>
                    <div> {staffer.post} </div>
                    <div> {staffer.academic_degree} {staffer.title}</div>
                    <div> {staffer.email} </div>
                    <div> {staffer.phone_number} </div>
                    <div> {staffer.adress} </div>
                </div>
            </div>
            <div id="div_for_button_list">
                <ul className="tracks">
                    {Object.entries(textsNames).map(([k, v]) => (v &&
                            <li key={k}>
                                <button
                                    style={{backgroundColor: (activeText === v ? "white" : "#EEEEEE")}}
                                    key={k}
                                    onClick={() =>
                                    {
                                        setActiveText(v)

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
            <p>
                {activeText}
            </p>
        </div>
    )
});

export default StafferItem;
