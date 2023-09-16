import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchPartners} from "../http/partnersAPI";
import ButtonList from "../components/ButtonList";
import "../css/page_styles/Partners.css"
import Carusel from "../components/lines/Carusel";
import Block from "../components/display/Block";
import CommonPagesDisplay from "../components/display/CommonPagesDisplay";


const PartnerCard = ({partner}) => {
    return (
        <div className="partner_card" style={{boxSizing: "border-box"}}>
            {partner.description && <p className="comment">{partner.description}</p>}
            {partner.jointProjectsPhotos.length > 0 && <Carusel photos={partner.jointProjectsPhotos} addressFileType="local" ratio={1} color="red"/>}
            {partner.jointProjectsDescription &&
                <>
                    <p className="blue_section_title">Совместные проекты</p>
                    <p className="joint_projects_description">{partner.jointProjectsDescription}</p>
                </>
            }

        </div>
    )
}

const OurPartners = observer(() => {
    const singularForm = {"Индустриальные":"Индустриальный",
        "Научные":"Научный", "Работодатели":"Работодатель", "Образовательные":"Образовательный"}
    const [chosenType, setChosenType] = new useState("");
    const [allPartners, setAllPartners] = new useState([]);
    const [chosenPartner, setChosenPartner] = useState({});

    useEffect(() => {
        fetchPartners().then(data =>
            setAllPartners(data.rows)
        )
    },[])

    useEffect(() => {
        setChosenPartner({})
    }, [chosenType]);

    return (
        <Block className="main_block" header="Наши партнеры">
            <ButtonList buttonList={singularForm} setChosenValue={setChosenType}/>
            <p className="comment">
                Алтайский институт труда и права сотрудничает с компаниями в том числе и в научной сфере. Совместно ведутся разработки новейших экономических моделей, производится анализ рынка, а также регулярно публикуются научные статьи. Более того, на базе Алтайского института труда и права проходят научные конференции и форумы.</p>
            <div className="logos">
                {chosenType && allPartners.filter(partner => partner.kind === singularForm[chosenType]).map(partner =>
                    <div className="logo_container" onClick={() => setChosenPartner(partner)}>
                        <img src={process.env.REACT_APP_API_URL + partner.logo}/>
                        <p>{partner.name}</p>
                    </div>
                )}
            </div>
            {chosenPartner.hasOwnProperty("kind") && chosenType !== undefined && chosenPartner.kind.substring(0, 3) === chosenType.substring(0, 3) && <PartnerCard partner={chosenPartner}/>}
        </Block>
    );
});

const Partners = observer(() => {
    let blockList = {
        1: <OurPartners/>
    }
    const handMadeBlocksCount = 1;
    return (
        <CommonPagesDisplay blockList={blockList} handMadeBlocksCount={handMadeBlocksCount}/>
    )
})

export default Partners;
