import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BlockContainer from "../components/common/BlockContainer";
import Block from "../components/common/Block";



const Main = observer(() => {
    const {block_store} = useContext(Context);

    const [text, setText] = useState("");
    const [myBlocks, setMyBlocks] = useState([]);
    let myAddress = ""

    useEffect(() => {
        myAddress = "/" + window.location.href.split("/")[3]
        setMyBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === myAddress)))
    }, [block_store.blocks]);


    // document.onselectionchange = function() {
    //     let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();
    //     console.log(anchorNode, anchorOffset, focusNode, focusOffset)
    // };

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