import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchPartners} from "../../http/partnersAPI";

const EducationalPartners = observer(() => {

    const [educationalPartners, setEducationalPartners] = useState([]);

    useEffect(() => {
        fetchPartners().then(data   =>
            setEducationalPartners(data.rows.filter(partner => partner.kind === "Образовательный"))
        )
    },[])

    return (
        <div>
            {educationalPartners.map(partner =>
                <div>
                    <p>{partner.name} {partner.description}</p>
                    <img src={process.env.REACT_APP_API_URL + partner.img}/>
                </div>
            )}
        </div>
    );
});

export default EducationalPartners;
