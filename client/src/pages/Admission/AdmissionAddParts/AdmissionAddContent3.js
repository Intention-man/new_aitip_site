import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {fetchOneAdditionalProgram, } from "../../../http/admissionAPI";
import Card from "../../../components/card/Card"
import {observer} from "mobx-react-lite";


const AdmissionAddContent3 = observer(() => {
    const {admission_store} = useContext(Context)
    const [chosenDevelopmentProgram, setChosenDevelopmentProgram] = useState({});


    useEffect(() => {
        if (admission_store.selectedDevelopmentProgram) {
            fetchOneAdditionalProgram(admission_store.selectedDevelopmentProgram).then(data => {
                setChosenDevelopmentProgram(data)
            })}
    }, [admission_store.selectedDevelopmentProgram])


    return (
        <Card
            width={12}
            imgPos="none"
            className="admission-add-content2"
        >
            <ul className="tracks">
                {admission_store.additionalPrograms.filter(program => program.kind === "Программа повышения квалификации").map(d =>
                    <li key={"small_div_" + d.id}>
                        <button
                            key={d.id}
                            onClick={() => {
                                admission_store.setSelectedDevelopmentProgram(d.id)
                                console.log(d.id)
                            }}
                        >
                            {d.name}
                        </button>
                    </li>
                )}
            </ul>
            {chosenDevelopmentProgram.hasOwnProperty("name") &&
                <p>{chosenDevelopmentProgram.description}</p>}
        </Card>
);
});

export default AdmissionAddContent3;
