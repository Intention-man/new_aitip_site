import React from 'react';
import {Button} from "react-bootstrap";
import "../css/page_styles/AdminPanel.css"


// принимает словарь со значением
const ButtonList = ({buttonList, chosenValue, setChosenValue}) => {
    return (
        <ul>
            {Object.keys(buttonList).map(key =>
                <Button className="button-admin" onClick={() => setChosenValue(key)}>
                    {key}
                </Button>
            )}
        </ul>
    );
};

export default ButtonList;