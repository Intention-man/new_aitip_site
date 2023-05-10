import React from 'react';
import "../css/page_styles/AdminPanel.css"
import {observer} from "mobx-react-lite";
import "../css/component_styles/Button.css";


// принимает текст надписи, функцию устанвливаемого значения и устанвливаемое значение(опционально)
const Button = observer(({className, buttonName, valueToSet, setChosenValue}) => {
    return (
        <button className={"custom_button "+className} key={valueToSet ? valueToSet : buttonName} onClick={() => setChosenValue(valueToSet ? valueToSet : buttonName)}>
            {buttonName}
        </button>
    );
});

export default Button;