import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchPartners} from "../../http/partnersAPI";


const IndustrialPartners = observer(() => {

    const [industrialPartners, setIndustrialPartners] = useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setIndustrialPartners(data.rows.filter(partner => partner.kind === "Индустриальный"))
        )
    })

    return (
        <div>
            {industrialPartners.map(partner =>
                <div>
                    <p>{partner.name} {partner.description}</p>
                    <img src={process.env.REACT_APP_API_URL + partner.logo}/>
                    {partner.jointProjectsPhotoes.map(photo =>
                        <img src={process.env.REACT_APP_API_URL + photo}/>
                    )}
                </div>
            )}
        </div>
    );
});

export default IndustrialPartners;
