import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchOneBlock} from "../../http/blockAPI";
import CreateOrEditBlock from "./CreateOrEditBlock";


const NewsEditor = observer(() => {
    const {block_store} = useContext(Context);
    const [chosenNewsBlock, setChosenNewsBlock] = useState({});


    return (
        <div>
            {/*Выбор новости*/}
            <select value={chosenNewsBlock.header} onChange={e => {
                fetchOneBlock(e.target.value).then(data => {
                    setChosenNewsBlock(data)
                        console.log(data)
                    })
                }}>
                <option value="">Выберите новость, которую вы хотите изменить</option>
                {block_store.blocks.filter(block => block.isNews === true).map((block) => (
                    <option key={block.id} value={block.id}>{block.header}</option>
                ))}
            </select>


            {chosenNewsBlock.hasOwnProperty("lines") && chosenNewsBlock.lines.length > 0 &&
                <CreateOrEditBlock block={chosenNewsBlock} mode="edit"/>
            }
        </div>
    );
});

export default NewsEditor;