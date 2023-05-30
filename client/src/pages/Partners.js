import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchPartners} from "../http/partnersAPI";

const Partners = observer(() => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setPartners(data.rows))
    },[])

    return (
        <div>
            {partners.map(partner =>
                <div key={partner.id}>
                    <p>{partner.name} {partner.description}</p>
                    <img src={process.env.REACT_APP_API_URL + partner.img}/>
                </div>
            )}
        </div>
    );
});

export default Partners;
