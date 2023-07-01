import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchPartners} from "../http/partnersAPI";
import ButtonList from "../components/ButtonList";
import "../css/page_styles/Partners.css"


const Partners = observer(() => {
    const singularForm = {"Индустриальные":"Индустриальный",
        "Научные":"Научный", "Работодатели":"Работодатель", "Образовательные":"Образовательный"}
    const [chosenType, setChosenType] = new useState("");
    const [allPartners, setAllPartners] = new useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setAllPartners(data.rows)
        )
    },[])

    return (
        <div className="main_block">
            <h3 className="block_title">Наши партнёры</h3>
            <ButtonList buttonList={singularForm} setChosenValue={setChosenType}/>
            <p className="comment">
                Алтайский институт труда и права сотрудничает с компаниями в том числе и в научной сфере. Совместно ведутся разработки новейших экономических моделей, производится анализ рынка, а также регулярно публикуются научные статьи. Более того, на базе Алтайского института труда и права проходят научные конференции и форумы.</p>
            <div className="logos">
                {chosenType && allPartners.filter(partner => partner.kind === singularForm[chosenType]).map(e =>
                    <div className="logo_container">
                        <img src={process.env.REACT_APP_API_URL + e.logo}/>
                        <p>{e.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Partners;
