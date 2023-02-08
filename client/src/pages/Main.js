import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import Block from "../components/Block";
import {observer} from "mobx-react-lite";
import ExtendedTextEditor from "../components/ExtendedTextEditor";
import MDEditor from "@uiw/react-md-editor";


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
        <div>
            {/*<ExtendedTextEditor text={text} setText={setText}/>*/}
            {/*<MDEditor.Markdown source={text} style={{whiteSpace: 'pre-wrap'}}/>*/}
            {myBlocks.map(block =>
                <Block key={block.id} block={block}/>
            )}
        </div>
    );
});

export default Main;