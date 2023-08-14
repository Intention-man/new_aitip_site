import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchOneStaffer, fetchStaff} from "../../http/staffAPI";
import {observer} from "mobx-react-lite";
import {fetchAdditionalPrograms, fetchDirectionsBachelor} from "../../http/admissionAPI";
import RoundedImg from "../../components/lines/RoundedImg";
import "../../css/component_styles/PersonalitiesFilter.css"
import "../../css/page_styles/PersonalityList.css"
import test from "../../local_assets/logo-noincome.png"
import email from "../../local_assets/sms (1).png";
import phone from "../../local_assets/Vector (2).png";
import address from "../../local_assets/location (1).png";
import ButtonList from "../../components/ButtonList";
import {DotLoader} from "react-spinners";


const SmallStafferItem = observer(({staffer}) => {
    return (
        <div className="block_content" style={{minWidth: "250px"}}>
            <RoundedImg imgSrc={process.env.REACT_APP_API_URL + staffer.img || test}
                        style={{width: "90px", backgroundPosition: "center"}}
                        className="ava_img"/>
            <div>
                <div> {staffer.name} </div>
                <div> {staffer.post} </div>
            </div>
        </div>
    );
});


const StafferItem = observer(({staffer, closeStaffer}) => {

    const textsNames = {
        "Биография": staffer.bio_text,
        "Дисциплины и курсы": staffer.disciplines_and_courses_text,
        "Публикации": staffer.publications_text,
        "Проекты": staffer.projects_text
    }

    const [activeText, setActiveText] = useState(Object.keys(textsNames)[0]);

    console.log(staffer.name)

    return (
        <div className="staffer_item_opened">
            <div id={staffer.id} style={{
                cursor: "pointer",
                margin: "0",
                padding: "0",
                borderColor: "lightgray",
                display: "flex",
                flexWrap: "wrap"
            }}
                // onClick={() => viewDiv(staffer.id)}
            >


                <div className="description_block">
                    <img src={process.env.REACT_APP_API_URL + staffer.img}
                         className="big_avatar m-auto m-md-0"
                         alt="картинка чет не загрузилась"/>
                    <div>
                        <div className="staffer_name"> {staffer.name} </div>
                        <button className="close-btn"
                                onClick={() => closeStaffer(staffer.id)}>
                            Х
                        </button>


                        <div className="general_desc"> {staffer.post} </div>
                        <div className="general_desc"> {staffer.academic_degree} {staffer.title}</div>
                        <div className="personal_data">
                            <div className="data_part">
                                <img src={email} className="data_icon"/>
                                <div> {staffer.email} </div>
                            </div>
                            <div className="data_part">
                                <img src={phone} className="data_icon"/>
                                <div> {staffer.phone_number} </div>
                            </div>
                            <div className="data_part">
                                <img src={address} className="data_icon"/>
                                <div>{staffer.adress}</div>
                            </div>
                        </div>


                    </div>

                </div>
                <ButtonList className="small_button_list" buttonList={textsNames} setChosenValue={setActiveText}/>
            </div>
            <div className="text_block">
                <p className="text_desc">
                    {textsNames[activeText]}
                </p>
            </div>
        </div>
    )
});


const PersonalitiesList = observer(params => {
    const {staff_store} = useContext(Context)
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
    }, [])

    function changeChosenStaffer(clickedId) {
        if (params.chosenStaffer && params.chosenStaffer.id === clickedId) {
            staff_store.setSelectedStaffer("")
        } else {
            staff_store.setSelectedStaffer(clickedId)
        }
    }


    function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
    }


    return (
        <div>
            {(params.filteredStaff.length !== 0) ?
                (() => {
                    let rows = []
                    const lenGroup = size[0] > 800 ? 2 : 1
                    const count = Math.ceil(params.filteredStaff.length / lenGroup) * lenGroup
                    for (let i = 0; i < count; i += lenGroup) {
                        let staffers = []
                        for (let l = 0; l < lenGroup; l++) {
                            staffers.push((params.filteredStaff.length > i + l ? params.filteredStaff[i + l] : undefined))
                        }

                        let list = staffers.filter(i => i !== undefined)

                        rows.push(<Row style={{display: "grid", gridTemplateColumns: "1fr ".repeat(lenGroup)}}>
                            {list.map(staffer =>
                                <div>
                                    <div key={staffer.id}
                                         className="person_block"
                                         onClick={() => {
                                             changeChosenStaffer(staffer.id)
                                         }
                                         }>

                                        <SmallStafferItem staffer={staffer}/>
                                    </div>
                                </div>
                            )}
                        </Row>)
                        rows.push(params.chosenStaffer && list.map(e => e.id).includes(params.chosenStaffer.id) &&
                            <StafferItem key={params.chosenStaffer.id} staffer={params.chosenStaffer}
                                         closeStaffer={changeChosenStaffer}/>)
                    }
                    return rows
                })() : <h2 className="list_is_empty">Сотрудников, преподающих на данных программах и направлениях, нет</h2>
            }
        </div>
    );
});


const PersonalitiesFilterBar = observer(({
                                             filteredDirections,
                                             setFilteredDirections,
                                             filteredPrograms,
                                             setFilteredPrograms
                                         }) => {
    const {admission_store} = useContext(Context)

    return (
        <div className="external_filter_block">
            <div className="inner_filter_block">
                <p className="filter_name_first">По направлениям:</p>
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
                )}

                <p className="filter_name">По программам ДПО:</p>

                {(admission_store.additionalPrograms && admission_store.additionalPrograms.length !== 0) && admission_store.additionalPrograms.map(program =>
                    <div className="squaredOne">
                        <input type="checkbox" id={program.id + 10} className="small_box" onChange={
                            () => {
                                filteredPrograms.includes(program)
                                    ? setFilteredPrograms(filteredPrograms => filteredPrograms.filter(i => i !== program))
                                    : setFilteredPrograms(filteredPrograms => [...filteredPrograms, program])
                            }
                        }/>
                        <label htmlFor={program.id + 10}></label>
                        <p className="filter_text_long">{program.name}</p>
                    </div>
                )}

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


const Personalities = observer(() => {

        const {staff_store} = useContext(Context)
        const {admission_store} = useContext(Context)

        const [filteredDirections, setFilteredDirections] = useState([]);
        const [filteredPrograms, setFilteredPrograms] = useState([]);

        const [chosenStaffer, setChosenStaffer] = useState();
        const [filteredStaff, setFilteredStaff] = useState([]);


        useEffect(() => {
            fetchStaff(1, 100).then(data => {
                    staff_store.setStaff(data.rows)
                    staff_store.setTotalCount(data.count)
                }
            )
            fetchDirectionsBachelor().then(data => {
                admission_store.setDirectionsBachelor(data.rows)
            })
            fetchAdditionalPrograms().then(data => {
                admission_store.setAdditionalPrograms(data.rows)
            })
        }, [])

        useEffect(() => {
            (async () => {
                fetchStaff(staff_store.page, staff_store.limit).then(data => {
                    staff_store.setStaff(data.rows)
                    staff_store.setTotalCount(data.count)
                })
            })()
        }, [staff_store, staff_store.page])

        useEffect(() => {
            setFilteredStaff(staff_store.staff)
            console.log(staff_store.staff)
        }, [staff_store.staff])

        useEffect(() => {
            fetchOneStaffer(staff_store.selectedStaffer).then(data => {
                setChosenStaffer(data)
            })
        }, [staff_store.selectedStaffer])

        useEffect(() => {
            console.log(filteredDirections)
            console.log(filteredPrograms)
            if (filteredDirections.length > 0 || filteredPrograms.length > 0) {
                setFilteredStaff(staff_store.staff.filter(staffer =>
                    (staffer.directions_bac && filteredDirections && filteredDirections.some(direction => staffer.directions_bac.includes(direction.name))) || (staffer.programs_add && filteredPrograms && filteredPrograms.some(program => staffer.programs_add.includes(program.name)))
                ))
            } else {
                setFilteredStaff(staff_store.staff)
            }
        }, [filteredDirections, filteredPrograms])

        if (!staff_store.staff || (staff_store.staff && staff_store.staff.length === 0)) {
            return (<Container className="mt-md-5" style={{display: "flex"}}>
                <DotLoader color="#497AD8" size={200} cssOverride={{margin: "15% 30%"}}/>
            </Container>)
        }

        return (
            <Container className="mt-md-5" style={{display: "flex"}}>
                <Row>
                    <Col lg={3} style={{display: "inline-block", right: 0}}>
                        <PersonalitiesFilterBar filteredDirections={filteredDirections}
                                                setFilteredDirections={setFilteredDirections}
                                                filteredPrograms={filteredPrograms}
                                                setFilteredPrograms={setFilteredPrograms}/>
                    </Col>
                    <Col lg={9} className="mt-2 mt-lg-0" style={{display: "inline-block", left: 0}}>
                        <PersonalitiesList chosenStaffer={chosenStaffer} setChosenStaffer={setChosenStaffer}
                                           filteredStaff={filteredStaff} setFilteredStaff={setFilteredStaff}/>
                    </Col>
                </Row>
            </Container>
        );
    }
);


export default Personalities;