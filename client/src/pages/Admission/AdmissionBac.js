import React, {useContext, useEffect, useState} from 'react';
import { findDOMNode } from 'react-dom';
import Card from '../../components/card/Card';
import Block from '../../components/Block';
import BlockContainer from '../../components/BlockContainer';
import StyledText from '../../components/card/StyledText';
import Content5Img from '../../local_assets/Content2_photo.png';
import { fetchDirectionsBachelor } from "../../http/admissionAPI";
import { Context } from "../../index";
import ContentContext from '../../components/contexts/ContentContext';
import "../../css/main.css";
import BigImg from '../../components/card/BigImg';

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
            admission_store.setDirectionsBachelor(data.rows);
            console.log(1);
            console.log(admission_store.directionsBachelor);
        });
        // setContent(contentBlocksData); // Вызываем callback 
    }, []);

    /**
     * Это callback для того, чтобы обработчик React ref передал от каждого компонента из contentBlocksData свою DOM-ноду и она была записана
     * 
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
        // <CardContainer>
        //     {/* Проп handeRef передаётся, чтобы обработчик React ref вызвал callback setDomNode и был записана DOM-нода каждого компонента */}
        //     <AdmissionBacContent1 handleRef={element => setDomNode(element, 0)}/> 
        //     <AdmissionBacContent2 handleRef={element => setDomNode(element, 1)}/>
        //     <AdmissionBacContent3 handleRef={element => setDomNode(element, 2)}/>
        //     <AdmissionBacContent4 handleRef={element => setDomNode(element, 3)}/>
        //     <AdmissionBacContent5 handleRef={element => setDomNode(element, 4)}/>
        //     <AdmissionBacContent6 handleRef={element => setDomNode(element, 5)}/>
        //     <AdmissionBacContent7/>
        // </CardContainer>
        <BlockContainer>
            <Block linkName='Test 1'>
                <StyledText><p>Id ut amet quis irure aliquip quis eiusmod culpa proident irure consequat sint elit. Proident et ullamco esse culpa nulla. Do id nisi duis exercitation eu. Occaecat voluptate amet laborum cupidatat incididunt magna consequat ex excepteur minim veniam nostrud. Do non dolor mollit qui. Exercitation nulla culpa eu sunt irure do nisi in fugiat in sint consequat et ullamco. Consectetur laborum elit ad consequat dolor nisi ex aute adipisicing consectetur.</p></StyledText>
                <StyledText><p>Laborum et veniam proident ad. Qui excepteur fugiat laborum non cillum. Anim aute in aute elit pariatur Lorem culpa dolor ea deserunt pariatur in adipisicing in. Commodo amet cupidatat nulla incididunt. Sit non dolor labore quis non cupidatat consequat amet mollit laborum occaecat velit.</p></StyledText>
                <Card 
                    imgPos='left'
                    imgType='fading'
                    imgSrc={Content5Img}
                >
                    <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>    
                    <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>
                </Card>
                <StyledText><p>Laborum et veniam proident ad. Qui excepteur fugiat laborum non cillum. Anim aute in aute elit pariatur Lorem culpa dolor ea deserunt pariatur in adipisicing in. Commodo amet cupidatat nulla incididunt. Sit non dolor labore quis non cupidatat consequat amet mollit laborum occaecat velit.</p></StyledText>
            </Block>
            <Block linkName='Test 2'>
                <Card 
                    imgPos='left'
                    imgType='rounded'
                    imgSrc={Content5Img}
                >
                    <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>    
                    <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>
                </Card>
                <StyledText><p>Laborum et veniam proident ad. Qui excepteur fugiat laborum non cillum. Anim aute in aute elit pariatur Lorem culpa dolor ea deserunt pariatur in adipisicing in. Commodo amet cupidatat nulla incididunt. Sit non dolor labore quis non cupidatat consequat amet mollit laborum occaecat velit.</p></StyledText>
            </Block>
            <Block linkName='Test 3'>
                <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>
                <BigImg
                    imgSrc={Content5Img}
                />  
                <StyledText><p>Aute dolor aute ullamco dolore. Pariatur eu eu cupidatat consectetur excepteur irure nisi exercitation cupidatat exercitation. Fugiat minim magna ex incididunt enim fugiat magna laborum veniam esse ullamco cillum. Quis mollit sit magna duis consectetur sunt ullamco mollit et elit minim cillum. Amet elit magna culpa proident eiusmod reprehenderit quis. Excepteur aliquip laborum quis pariatur ea ad. Voluptate dolore sit occaecat anim.</p></StyledText>
            </Block>
        </BlockContainer>
    );
}

export default AdmissionBac;