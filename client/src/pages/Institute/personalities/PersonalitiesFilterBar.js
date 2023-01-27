// Пока несделанная панель с фильтрами для страницы Персоналии

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";


const PersonalitiesFilterBar = observer(({filteredDirections, setFilteredDirections, filteredPrograms, setFilteredPrograms}) => {
    const {admission_store} = useContext(Context)

    return (
        <div style={{display: "block", margin: "0 1%", justifyContent: "left"}}>

            <p>По направлениям бакалавриата</p>

            {(admission_store.directionsBachelor && admission_store.directionsBachelor.length !== 0) && admission_store.directionsBachelor.map(direction =>
                <button
                    style={{cursor: "pointer", borderColor: "lightgray"}}
                    key={direction.name}
                    onClick={() => {
                        filteredDirections.includes(direction)
                            ? setFilteredDirections(filteredDirections => filteredDirections.filter(i => i !== direction))
                            : setFilteredDirections(filteredDirections => [...filteredDirections, direction])
                    }
                    }
                >
                    {direction.name}
                </button>
            )}

            <p>По программам ДПО</p>

            {(admission_store.additionalPrograms && admission_store.additionalPrograms.length !== 0) && admission_store.additionalPrograms.map(program =>
                <button
                    style={{cursor: "pointer", borderColor: "lightgray"}}
                    key={program.name}
                    onClick={() => {
                        filteredPrograms.includes(program)
                            ? setFilteredPrograms(filteredPrograms => filteredPrograms.filter(i => i !== program))
                            : setFilteredPrograms(filteredPrograms => [...filteredPrograms, program])
                    }}
                >
                    {program.name}
                </button>
            )}
        </div>
    );
})

export default PersonalitiesFilterBar;
