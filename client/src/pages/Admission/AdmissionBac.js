import React, {useContext, useEffect, useState} from 'react';
import { findDOMNode } from 'react-dom';
import AdmissionBacContent1 from "./AdmissionBacParts/AdmissionBacContent1";
import AdmissionBacContent2 from "./AdmissionBacParts/AdmissionBacContent2";
import AdmissionBacContent3 from "./AdmissionBacParts/AdmissionBacContent3";
import AdmissionBacContent4 from "./AdmissionBacParts/AdmissionBacContent4";
import AdmissionBacContent5 from "./AdmissionBacParts/AdmissionBacContent5";
import AdmissionBacContent6 from "./AdmissionBacParts/AdmissionBacContent6";
import CardContainer from '../../components/card/CardContainer';
import { fetchDirectionsBachelor } from "../../http/admissionAPI";
import { Context } from "../../index";
import ContentContext from '../../components/contexts/ContentContext';
import "../../css/main_style.css"

const AdmissionBac = () => {
    const {admission_store} = useContext(Context);
    const setContent = useContext(ContentContext);  // Получаем callback из ContentContext для передачи текущих активных блоков
    
    /* 
        Этот state будет содержать следующие данные о блоках страницы:
        name - подпись текущего блока в панели с ссылками
        domNode - DOM-нода блока, чтобы была возможность ссылаться на него
        index - порядковый номер
    */
    const [contentBlocksData, setContentBlocksData] = useState([
        {name: 'Поступление в АИТИП'},
        {name: 'Выбрать направление'},
        {name: 'Траектория поступления'},
        {name: 'Важные даты'},
        {name: 'Про оплату обучения'},
        {name: 'Важные документы'},
    ]);

    useEffect(() => {
        fetchDirectionsBachelor(1, 10).then(data => {
            admission_store.setDirections_bachelor(data.rows);
            console.log(1);
            console.log(admission_store.directions_bachelor);
        });
        setContent(contentBlocksData); // Вызываем callback 
    }, []);

    /**
     * Это callback для того, чтобы обработчик React ref передал от каждого компонента из contentBlocksData свою DOM-ноду и она была записана
     * TODO: возможно это костыль
     * @param {React.Component} element 
     * @param {Number} index 
     */
    const setDomNode = (element, index) => {
        if (contentBlocksData[index].domNode)
            return;
        const updatedContentBlocksData = [...contentBlocksData];  // Копируем текущее значение contentBlocksData
        updatedContentBlocksData[index].domNode = findDOMNode(element);  // Сохраняем DOM-ноду компонента по переданному индексу
        updatedContentBlocksData[index].id = index;  // Сохраняем индекс компонента (просто его порядковый номер)
        setContentBlocksData(updatedContentBlocksData);  // Обновляем contentBlocksData
    };
    
    return (
        <CardContainer>
            {/* Проп handeRef передаётся, чтобы обработчик React ref вызвал callback setDomNode и был записана DOM-нода каждого компонента */}
            <AdmissionBacContent1 handleRef={element => setDomNode(element, 0)}/> 
            <AdmissionBacContent2 handleRef={element => setDomNode(element, 1)}/>
            <AdmissionBacContent3 handleRef={element => setDomNode(element, 2)}/>
            <AdmissionBacContent4 handleRef={element => setDomNode(element, 3)}/>
            <AdmissionBacContent5 handleRef={element => setDomNode(element, 4)}/>
            <AdmissionBacContent6 handleRef={element => setDomNode(element, 5)}/>
        </CardContainer>
    );
}

export default AdmissionBac;