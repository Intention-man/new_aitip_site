import React, {useContext, useEffect} from 'react';
import {fetchAdditionalPrograms} from "../../http/admissionAPI";
import {Context} from "../../index";
import AdmissionAddContent2 from "./AdmissionAddParts/AdmissionAddContent2";
import {observer} from "mobx-react-lite";
import AdmissionAddContent3 from "./AdmissionAddParts/AdmissionAddContent3";


const AdmissionAdd = observer(() => {
    const {admission_store} = useContext(Context)

    useEffect(() => {
        fetchAdditionalPrograms().then(data => {
            admission_store.setAdditionalPrograms(data.rows)
            console.log(admission_store.additionalPrograms)
        })
    }, [])

    return (
        <></>
    );
});

export default AdmissionAdd;