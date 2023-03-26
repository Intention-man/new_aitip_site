import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import CreateProgram from "./CreateProgram";
import {fetchPartners} from "../../http/partnersAPI";
import CreatePartner from "./CreatePartner";



const PartnerEditor = observer(() => {
    const [partners, setPartners] = useState([]);
    const [chosenPartner, setChosenPartner] = useState({});
    const [partnerId, setPartnerId] = useState(0);

    useEffect(() => {
        fetchPartners().then(data => {
            setPartners(data.rows)
        })
    }, []);

    useEffect(() => {
        setChosenPartner(Array.from(partners.filter(partner => partner.id === partnerId))[0])
    }, [partnerId]);

    useEffect(() => {
        console.log(chosenPartner)
    }, [chosenPartner]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenPartner ? chosenPartner.name : "Выберите партнера, данные которого вы хотите изменить"} onChange={e => {
                setPartnerId(Number(e.target.value))
                console.log(e.target.value)
            }}>
                <option value="">Выберите партнера, данные которого вы хотите изменить</option>
                {partners.map(partner => (
                    <option key={partner.id} value={partner.id}>{partner.name}</option>
                ))}
            </select>

            {chosenPartner && chosenPartner.hasOwnProperty("name")  &&
                <CreatePartner partner={chosenPartner} mode="edit"/>
            }
        </div>
    );
});


export default PartnerEditor;