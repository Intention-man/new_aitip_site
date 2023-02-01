// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import CreateLine from "./CreateLine";


const CreateCard = observer(() => {

    const [cardName, setCardName] = useState("");
    const [pageName, setPageName] = useState("");
    const [pageIndex, setPageIndex] = useState(-1);
    const [header, setHeader] = useState("");
    const [lines, setLines] = useState([]);


    const addCard = () => {
        const formData = new FormData()
        formData.append("name", cardName)
        // createDirectionBachelor(formData).then(() => onHide())
    };

    return (
        <div>
            <CreateLine/>
            {/*<div style={{backgroundColor: "#EEEEEE", margin: "30px 0", borderRadius: 10}}>*/}
            {/*    <div>*/}
            {/*        <h3>Название/заголовок новости</h3>*/}
            {/*        <input type="name" id="name" style={{borderColor: "black", margin: 10, width: "90%"}} onChange={e => setHeader(e.target.value)}/>*/}
            {/*    </div>*/}

            {/*    <div style={{display:"flex", marginTop: 30}}>*/}
            {/*    /!*    <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', width: 400}} />*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
});


export default CreateCard;