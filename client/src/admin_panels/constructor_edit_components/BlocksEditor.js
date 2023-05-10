import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../../index";
import {publicRoutes} from "../../routes";
import {observer} from "mobx-react-lite";
import {fetchOneBlock} from "../../http/blockAPI";
import CreateOrEditBlock from "./CreateOrEditBlock";



const BlockEditor = observer(() => {
    const {block_store} = useContext(Context);
    const [chosenPageLink, setChosenPageLink] = useState("");
    const [pageBlocks, setPageBlocks] = useState([]);
    const [chosenBlock, setChosenBlock] = useState({});

    useEffect(() => {
        setPageBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === chosenPageLink)))
        console.log(Array.from(block_store.blocks.filter(block => block.pageLink === chosenPageLink)))
    }, [block_store.blocks, chosenPageLink]);


    return (
        <div>
            {/*Выбор страницы*/}
            <select value={chosenPageLink} onChange={e => {
                setChosenPageLink(e.target.value)
                console.log(e.target.value)
            }}>
                <option value="">Выберите страницу, на которой находится блок, который вы хотите изменить</option>
                {publicRoutes.map((publicRoute) => (
                    <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                ))}
            </select>

            {/*Выбор блока*/}
            {pageBlocks.length > 0 ?
                <select value={chosenBlock.header} onChange={e => {
                    fetchOneBlock(e.target.value).then(data => {
                        setChosenBlock(data)
                        console.log(data)
                    })
                }}>
                    <option value="">Выберите блок, который хотите изменить</option>
                    {pageBlocks.map((block) => (
                        <option key={block.id} value={block.id}>{block.header}</option>
                    ))}
                </select>
                : <p>Блоки еще загружаются или на выбранной странице пока нет блоков</p>}

            {pageBlocks.length > 0 && chosenBlock.hasOwnProperty("lines") && chosenBlock.lines.length > 0 &&
                <CreateOrEditBlock block={chosenBlock} mode="edit"/>
            }
        </div>
    );
});

export default BlockEditor;