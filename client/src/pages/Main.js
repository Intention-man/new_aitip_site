import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BlockContainer from "../components/common/BlockContainer";
import Block from "../components/common/Block";



const Main = observer(() => {
    const {block_store} = useContext(Context);

    const [myBlocks, setMyBlocks] = useState([]);
    let myAddress = ""

    useEffect(() => {
        console.log(block_store.blocks)
        myAddress = "/" + window.location.href.split("/")[3]
        setMyBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === myAddress).sort((block1, block2) => block1.ordinal - block2.ordinal)))
    }, [block_store.blocks, block_store.lines]);


    return (
        <BlockContainer>
            {
                myBlocks.map(block =>
                    <Block key={block.id} block={block}/>
                )
            }
        </BlockContainer>
    );
});

export default Main;