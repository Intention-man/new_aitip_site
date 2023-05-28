// Пока несделанная панель с фильтрами для страницы Персоналии

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import "../../../css/component_styles/PersonalitiesFilter.css"



const PersonalitiesFilterBar = observer(({filteredDirections, setFilteredDirections, filteredPrograms, setFilteredPrograms}) => {
    const {admission_store} = useContext(Context)

    return (
        <div className="external_filter_block">
            <div className="inner_filter_block">
                <p className="filter_name_first">По направлениям:</p>


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
                {(admission_store.directionsBachelor && admission_store.directionsBachelor.length !== 0) && admission_store.directionsBachelor.map(direction =>
                    <div className="squaredOne">
                        <input type="checkbox" id={direction.id} className="small_box" onChange={
                            () => {
                                filteredDirections.includes(direction)
                                    ? setFilteredDirections(filteredDirections => filteredDirections.filter(i => i !== direction))
                                    : setFilteredDirections(filteredDirections => [...filteredDirections, direction])
                            }
                        }/>
                        <label htmlFor={direction.id}></label>
                        <p className="filter_text">{direction.name}</p>
                    </div>
                    // <div className="squaredOne">
                    //     <input type="checkbox" id="squaredTwo" className="small_box"/>
                    //     <label htmlFor="squaredTwo"></label>
                    //     <p className="filter_text">Менеджмент</p>
                    // </div>
                    //
                    // <div className="squaredOne">
                    //     <input type="checkbox" id="squaredThree" className="small_box"/>
                    //     <label htmlFor="squaredThree"></label>
                    //     <p className="filter_text">Юриспруденция</p>
                    // </div>

                )}

                <p className="filter_name">По программам ДПО:</p>

                {(admission_store.additionalPrograms && admission_store.additionalPrograms.length !== 0) && admission_store.additionalPrograms.map(program =>
                <div className="squaredOne">
                    <input type="checkbox" id={program.id+10} className="small_box" onChange={
                        () => {
                            filteredPrograms.includes(program)
                                ? setFilteredPrograms(filteredPrograms => filteredPrograms.filter(i => i !== program))
                                : setFilteredPrograms(filteredPrograms => [...filteredPrograms, program])
                        }
                    }/>
                    <label htmlFor={program.id+10}></label>
                    <p className="filter_text_long">{program.name}</p>
                </div>
                )}

                {/*<div className="squaredOne">*/}
                {/*    <input type="checkbox" id="squared5" className="small_box"/>*/}
                {/*    <label htmlFor="squared5"></label>*/}
                {/*    <p className="filter_text">Оценка стоимости предприятия (бизнеса)</p>*/}
                {/*</div>*/}
                {/*{(admission_store.additionalPrograms && admission_store.additionalPrograms.length !== 0) && admission_store.additionalPrograms.map(program =>*/}
                {/*    <button className="filter_button"*/}
                {/*            key={program.name}*/}
                {/*            onClick={() => {*/}
                {/*                filteredPrograms.includes(program)*/}
                {/*                    ? setFilteredPrograms(filteredPrograms => filteredPrograms.filter(i => i !== program))*/}
                {/*                    : setFilteredPrograms(filteredPrograms => [...filteredPrograms, program])*/}
                {/*            }}*/}
                {/*    >*/}
                {/*        {program.name}*/}
                {/*    </button>*/}
                {/*)}*/}

                <button className="undo_filters" onClick={
                    () => {
                        setFilteredDirections([])
                        setFilteredPrograms([])
                        /*Delete ticks from all checkboxes on the form*/
                        let checkboxes = document.getElementsByClassName("small_box");
                        for (let i = 0; i < checkboxes.length; i++) {
                            checkboxes[i].checked = false;
                        }
                    }

                }>
                    Сбросить фильтры
                </button>
            </div>

        </div>
    );
})

export default PersonalitiesFilterBar;
