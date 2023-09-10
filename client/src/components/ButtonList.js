import React from 'react';
import "../css/page_styles/AdminPanel.css"
import {observer} from "mobx-react-lite";
import "../css/component_styles/ButtonList.css";


// принимает словарь со значением
const ButtonList = observer(({className, buttonList, setChosenValue, isStretchLastButton}) => {
    return (
        <ul className={"button_list "+(className !== undefined ? className : "")}>
            {(Array.isArray(buttonList)?buttonList:Object.keys(buttonList)).map((key, index, arr) =>
                <button className={"button-admin" + (arr.length-1 === index) && arr.length % 2 === 1 ? "stretch" : ""} key={key} onClick={() => setChosenValue(key)}>
                    {key}
                </button>
            )}
        </ul>
    );
});

export default ButtonList;