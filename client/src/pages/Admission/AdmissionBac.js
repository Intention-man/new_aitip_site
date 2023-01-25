import React, {useContext, useEffect, useState} from 'react';
import {findDOMNode} from 'react-dom';
import AdmissionBacContent1 from "./AdmissionBacParts/AdmissionBacContent1";
import AdmissionBacContent2 from "./AdmissionBacParts/AdmissionBacContent2";
import AdmissionBacContent3 from "./AdmissionBacParts/AdmissionBacContent3";
import AdmissionBacContent4 from "./AdmissionBacParts/AdmissionBacContent4";
import AdmissionBacContent5 from "./AdmissionBacParts/AdmissionBacContent5";
import AdmissionBacContent6 from "./AdmissionBacParts/AdmissionBacContent6";
import CardContainer from '../../components/card/CardContainer';
import SideBar from '../../components/SideBar';
import LinksPanel from '../../components/LinksPanel';
import {fetchDirectionsBachelor} from "../../http/admissionAPI";
import {Context} from "../../index";
import "../../css/main_style.css"

const AdmissionBac = () => {
    const {admission_store} = useContext(Context);
    
    const [contentCards, setContentCards] = useState([
        {name: 'Поступление в АИТИП', component: <AdmissionBacContent1 handleRef={element => setOffsetTopCallback(element, 0)}/>},
        {name: 'Выбрать направление', component: <AdmissionBacContent2 handleRef={element => setOffsetTopCallback(element, 1)}/>},
        {name: 'Траектория поступления', component: <AdmissionBacContent3 handleRef={element => setOffsetTopCallback(element, 2)}/>},
        {name: 'Важные даты', component: <AdmissionBacContent4 handleRef={element => setOffsetTopCallback(element, 3)}/>},
        {name: 'Про оплату обучения', component: <AdmissionBacContent5 handleRef={element => setOffsetTopCallback(element, 4)}/>},
        {name: 'Важные документы', component: <AdmissionBacContent6 handleRef={element => setOffsetTopCallback(element, 5)}/>},
    ]);

    useEffect(() => {
        fetchDirectionsBachelor(1, 10).then(data => {
            admission_store.setDirections_bachelor(data.rows);
            console.log(1);
            console.log(admission_store.directions_bachelor);
        });
    }, []);
    
    const setOffsetTopCallback = (element, index) => {
        const updatedContentCards = [...contentCards];
        updatedContentCards[index].domNode = findDOMNode(element);
        updatedContentCards[index].id = index;
        setContentCards(updatedContentCards);
    };
    
    return (
        <div className='rootContainer'>
            <SideBar
                alignment='left'
                isSticky={true}
            >
                <LinksPanel
                    links={contentCards.map(x => new Object({id: x.id, name: x.name, domNode: x.domNode}))}
                />
            </SideBar>
            <CardContainer>
                {
                    contentCards.map(x => x.component)
                }
            </CardContainer>
            <SideBar 
                alignment='right'
                isSticky={false}
            >
                <h1>Электронные ресурсы</h1>
                <a href="">ЭБС</a>
                <a href="">ЕОИС</a>
            </SideBar>
        </div>
    );
}

export default AdmissionBac;