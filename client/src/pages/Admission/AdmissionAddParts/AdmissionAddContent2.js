import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {fetchOneAdditionalProgram, } from "../../../http/admissionAPI";
import Card from "../../../components/card/Card"
import {observer} from "mobx-react-lite";


const AdmissionAddContent2 = observer(() => {
    const {admission_store} = useContext(Context)
    const [chosenRetrainingProgram, setChosenRetrainingProgram] = useState({});

    useEffect(() => {
        if (admission_store.selectedRetrainingProgram) {
            fetchOneAdditionalProgram(admission_store.selectedRetrainingProgram).then(data => {
                setChosenRetrainingProgram(data)
            })}
    }, [admission_store.selectedRetrainingProgram])


    return (
        <Card
            width={12}
            imgPos="none"
            className="admission-add-content2"
        >
            <ul className="tracks">
                {admission_store.additionalPrograms.filter(program => program.kind === "Программа профессиональной переподготовки").map(d =>
                    <li key={"small_div_" + d.id}>
                        <button
                            key={d.id}
                            onClick={() => {
                                admission_store.setSelectedRetrainingProgram(d.id)
                                console.log(d.id)
                            }}
                        >
                            {d.name}
                        </button>
                    </li>
                )}
            </ul>
            {chosenRetrainingProgram.hasOwnProperty("name") &&
                <div>
                    <p>{chosenRetrainingProgram.description}</p>
                    <img src={process.env.REACT_APP_API_URL + chosenRetrainingProgram.programImg}/>
                </div>
                }
        </Card>
    );
});

export default AdmissionAddContent2;