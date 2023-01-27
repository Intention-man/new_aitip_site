import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchPartners} from "../../http/partnersAPI";

const EmployersPartners = observer(() => {

    const [employersPartners, setEmployersPartners] = useState([]);

    useEffect(() => {
        fetchPartners().then(data =>
            setEmployersPartners(data.rows.filter(partner => partner.kind === "Работодатели"))
        )
    })

    return (
        <div>
            {employersPartners.map(partner =>
                <div>
                    <p>{partner.name} {partner.description}</p>
                    <img src={process.env.REACT_APP_API_URL + partner.img}/>
                </div>
            )}
        </div>
    );
});

export default EmployersPartners;
