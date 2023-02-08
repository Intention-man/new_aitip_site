// Пока несделанная панель с фильтрами для страницы Персоналии

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import "../../../css/component_styles/Personalities.css"



const PersonalitiesFilterBar = observer(({filteredDirections, setFilteredDirections, filteredPrograms, setFilteredPrograms}) => {
    const {admission_store} = useContext(Context)

    return (
        <div style={{display: "block", margin: "0 1%", justifyContent: "left", background: "white"}}>
            <div style={{background: "white", padding: "10px"}}>
                <p className="filter_name">По направлениям:</p>


                {/*{(admission_store.directionsBachelor && admission_store.directionsBachelor.length !== 0) && admission_store.directionsBachelor.map(direction =>*/}
                {/*    <button className="filter_button"*/}
                {/*            key={direction.name}*/}
                {/*            onClick={() => {*/}
                {/*                filteredDirections.includes(direction)*/}
                {/*                    ? setFilteredDirections(filteredDirections => filteredDirections.filter(i => i !== direction))*/}
                {/*                    : setFilteredDirections(filteredDirections => [...filteredDirections, direction])*/}
                {/*            }*/}
                {/*            }*/}
                {/*    >*/}
                {/*        {direction.name}*/}
                {/*    </button>*/}
                {/*    <div className="squaredOne">*/}
                {/*        <input type="checkbox" value="None" id="squaredOne"/>*/}
                {/*        <label htmlFor="squaredOne"></label>*/}
                {/*    </div>*/}
                <div className="squaredOne">
                    <input type="checkbox" id="squaredOne" style={{zIndex: "1000"}}/>
                    <label htmlFor="squaredOne"></label>

                    {/*<label><input type="checkbox"/>Менеджмент</label><br/>*/}
                    {/*<label><input type="checkbox"/>Экономика</label><br/>*/}
                </div>

                {/*)}*/}

                <p className="filter_name">По программам ДПО:</p>

                {(admission_store.additionalPrograms && admission_store.additionalPrograms.length !== 0) && admission_store.additionalPrograms.map(program =>
                    <button className="filter_button"
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

                <button className="undo_filters">
                    Сбросить фильтры
                </button>
            </div>

        </div>
    );
})

export default PersonalitiesFilterBar;
