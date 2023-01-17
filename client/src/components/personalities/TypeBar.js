// Пока несделанная панель с фильтрами для страницы Персоналии

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const TypeBar = observer(() => {
    const {admission_store} = useContext(Context)

    useEffect(() => {}, [admission_store.directions_bachelor, admission_store.programs_additional])

    return (
        <div style={{display: "block", margin: "0 1%", justifyContent: "left"}}>

            <p>По направлениям бакалавриата</p>

            {(admission_store.directions_bachelor && admission_store.directions_bachelor.length !== 0) && admission_store.directions_bachelor.map(direction =>
                <button
                    style={{cursor: "pointer", borderColor: "lightgray"}}
                    key={direction.name}
                    onClick={() => {
                        admission_store.selectedDirections_bachelor.includes(direction)
                            ? admission_store.setSelectedDirections_bachelor(admission_store.selectedDirections_bachelor.filter(i => i !== direction))
                            : admission_store.setSelectedDirections_bachelor([...admission_store.selectedDirections_bachelor, direction])
                    }
                    }
                >
                    {direction.name}
                </button>
            )}

            <p>По программам ДПО</p>

            {(admission_store.directions_bachelor && admission_store.directions_bachelor.length !== 0) && admission_store.programs_additional.map(program =>
                <button
                    style={{cursor: "pointer", borderColor: "lightgray"}}
                    key={program.name}
                    onClick={() => {
                        admission_store.selectedPrograms_additional.includes(program)
                            ? admission_store.setSelectedPrograms_additional([...admission_store.selectedPrograms_additional.filter(i => i !== program)])
                            : admission_store.setSelectedPrograms_additional([...admission_store.selectedPrograms_additional, program])
                    }}
                >
                    {program.name}
                </button>
            )}
        </div>
    );
})

export default TypeBar;
