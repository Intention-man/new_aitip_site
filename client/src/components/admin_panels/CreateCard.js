// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Button, Col, Dropdown, FormControl, Modal, Row} from "react-bootstrap";


const CreateCard = observer(({show, onHide}) => {
    const [cardName, setCardName] = useState("");
    
    const addCard = () => {
        const formData = new FormData()
        formData.append("name", cardName)
        // createDirectionBachelor(formData).then(() => onHide())
    };

    return (
        <Modal show={show} onHide={onHide}>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor="name">Название</label>
                        <input type="name" id="name" onChange={e => setCardName(e.target.value)}/>
                    </div>
                    <footer style={{margin: "0 0 50px"}}>
                        <Button variant="outline-danger" onClick={onHide}>
                            Закрыть
                        </Button>
                        <Button variant="outline-success" onClick={() => addCard()}>
                            Добавить направление
                        </Button>
                    </footer>
                    <p>*Костыль ради отступа*</p>
                </fieldset>
            </form>
        </Modal>
    );
});

export default CreateCard;

// import React, {useState} from 'react';
// import {observer} from "mobx-react-lite";
// import {Button, Modal} from "react-bootstrap";
// import CONTACTS from '../../consts/pageConsts';


// const CreateCard = observer(({show, onHide}) => {
//     const [pageName, setPageName] = useState("")

//     return (
//         <div>
//             <div>
//                 <label htmlFor="name">Название партнера</label>
//                     <textarea style={{width: 400, height: 100}} id="name"
//                             onChange={e => pageName(e.target.value)}/>
//             </div>
//         </div>
//     );
// })

// export default CreateCard;