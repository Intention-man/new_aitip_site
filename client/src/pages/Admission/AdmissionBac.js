import React, {useContext, useEffect, useState} from 'react';
import { findDOMNode } from 'react-dom';
import Card from '../../components/lines/Card';
import Block from '../../components/Block';
import BlockContainer from '../../components/BlockContainer';
import StyledText from '../../components/lines/StyledText';
import Content5Img from '../../local_assets/Content2_photo.png';
import { fetchDirectionsBachelor } from "../../http/admissionAPI";
import { Context } from "../../index";
import "../../css/main.css";
import BigImg from '../../components/lines/BigImg';

const AdmissionBac = () => {
    const {admission_store} = useContext(Context);
    
    useEffect(() => {
        fetchDirectionsBachelor(1, 10).then(data => {
            admission_store.setDirectionsBachelor(data.rows);
            console.log(1);
            console.log(admission_store.directionsBachelor);
        });
        // setContent(contentBlocksData); // Вызываем callback 
    }, []);

    return (
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