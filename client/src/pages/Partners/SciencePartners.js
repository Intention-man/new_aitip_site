import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchPartners} from "../../http/partnersAPI";

const SciencePartners = observer(() => {

    const [sciencePartners, setSciencePartners] = useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setSciencePartners(data.rows.filter(partner => partner.kind === "Научный"))
        )
    },[])

    return (
        <div>
            {sciencePartners.map(partner =>
                <div>
                    <p>{partner.name} {partner.description}</p>
                    <img src={process.env.REACT_APP_API_URL + partner.img}/>
                </div>
            )}
        </div>
    );
});

export default SciencePartners;