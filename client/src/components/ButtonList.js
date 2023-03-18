import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import "../css/page_styles/AdminPanel.css"
import {observer} from "mobx-react-lite";
import {Context} from "../index";



// принимает словарь со значением
const ButtonList = observer(({buttonList, chosenValue, setChosenValue}) => {
    const {admission_store} = useContext(Context)
    return (
        <ul className="buttonList">
            {(Array.isArray(buttonList)?buttonList:Object.keys(buttonList)).map(key =>
                <Button className="button-admin" key={key} onClick={() => setChosenValue(key)}>
                    {key}
                </Button>
            )}
        </ul>
    );
});

export default ButtonList;