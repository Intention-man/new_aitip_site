import React, {useContext, useEffect, useState} from 'react';
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
    const [mode, setMode] = useState("edit");

    useEffect(() => {
        setPageBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === chosenPageLink).sort((a, b) => a.ordinal - b.ordinal)))
        console.log(Array.from(block_store.blocks.filter(block => block.pageLink === chosenPageLink).sort((a, b) => a.ordinal - b.ordinal)))
    }, [block_store.blocks, chosenPageLink]);


    return (
        <div>
            {/*Выбор режима*/}
            <select value={mode} onChange={e => {
                setMode(e.target.value)
            }}>
                <option value="edit">Редактировать блок</option>
                <option value="useAsPattern">Использовать блок как шаблон для нового блока</option>
            </select>

            {/*Выбор страницы*/}
            <label style={{marginTop: "20px"}} className="custom_select">
                <select style={{background:"white"}} value={chosenPageLink} onChange={e => {
                    setChosenPageLink(e.target.value)
                }}>
                    <option value="" disabled="disabled" selected="selected">Выберите страницу, на которой находится
                        блок, который вы хотите изменить
                    </option>
                    {publicRoutes.map((publicRoute) => (
                        <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                    ))}
                </select>
                <svg><use xlinkHref="#select-arrow-down"></use></svg>
            </label>

            {/*Выбор блока*/}
            {pageBlocks.length > 0 ?
                <label style={{margin: "20px 0"}} className="custom_select">
                    <select style={{background:"white"}} value={chosenBlock.header} onChange={e => {
                        fetchOneBlock(e.target.value).then(data => {
                            setChosenBlock(data)
                            console.log(data)
                        })
                    }}>
                        <option value="" disabled="disabled" selected="selected">Выберите блок, который хотите изменить</option>
                        {pageBlocks.map((block) => (
                            <option key={block.id} value={block.id}>{block.header}</option>
                        ))}
                    </select>
                    <svg><use xlinkHref="#select-arrow-down"></use></svg>
                </label>
                : <p>Блоки еще загружаются или на выбранной странице пока нет блоков</p>}

            {pageBlocks.length > 0 && chosenBlock.hasOwnProperty("lines") && chosenBlock.lines.length > 0 &&
                <CreateOrEditBlock block={chosenBlock} mode={mode}/>
            }
            <svg className="sprites">
                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
});

export default BlockEditor;