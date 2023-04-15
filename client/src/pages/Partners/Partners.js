import React, {useEffect, useState} from 'react';
import ButtonList from "../../components/ButtonList";
import Ind from "./IndustrialPartners";
import EmployersPartners from "./EmployersPartners";
import EducationalPartners from "./EducationalPartners";
import SciencePartners from "./SciencePartners";
import {fetchPartners} from "../../http/partnersAPI";
import "../../css/page_styles/Partners.css";


const Partners = () => {
    const vocab = {"Индустриальный":<Ind/>, "Научный":<SciencePartners/>, "Работодатель":<EmployersPartners/>, "Образовательный":<EducationalPartners/> }
    const [choosenPartner, setChoosenPartner] = new useState("");
    const [allPartners, setAllPartners] = new useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setAllPartners(data.rows)
        )
    },[])



    return (
        <div className="main_block">
            <h3 className="block_title">Наши партнёры</h3>
            <ButtonList buttonList={vocab} setChosenValue={setChoosenPartner}/>
            <p className="comment">
                Алтайский институт труда и права сотрудничает с компаниями в том числе и в научной сфере. Совместно ведутся разработки новейших экономических моделей, производится анализ рынка, а также регулярно публикуются научные статьи. Более того, на базе Алтайского института труда и права проходят научные конференции и форумы.</p>
            <div className="logos">
                {choosenPartner && allPartners.filter(partner => partner.kind === choosenPartner).map(e =>
                    <div className="logo_container">
                        <img src={process.env.REACT_APP_API_URL + e.logo}/>
                        <p>{e.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Partners;