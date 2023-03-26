import React from 'react';
import "../css/page_styles/AdminPanel.css"
import {observer} from "mobx-react-lite";
import "../css/component_styles/ButtonList.css";



// принимает словарь со значением
const ButtonList = observer(({buttonList, chosenValue, setChosenValue}) => {
    return (
        <ul className="button_list">
            {(Array.isArray(buttonList)?buttonList:Object.keys(buttonList)).map(key =>
                <button className="button-admin" key={key} onClick={() => setChosenValue(key)}>
                    {key}
                </button>
            )}
        </ul>
    );
});

export default ButtonList;