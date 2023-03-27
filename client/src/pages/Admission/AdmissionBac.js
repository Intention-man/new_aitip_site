import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import Block from '../../components/permanent/Block';
import BlockContainer from '../../components/permanent/BlockContainer';
import { Context } from "../../index";
import "../../css/main.css"
import "../../css/main.css";
import AdmissionBacContent2 from "./AdmissionBacParts/AdmissionBacContent2";
import {fetchDirectionsBachelor} from "../../http/admissionAPI";

const AdmissionBac = observer(() => {
    const {block_store} = useContext(Context);
    const {admission_store} = useContext(Context);

    const [text, setText] = useState("");
    const [myBlocks, setMyBlocks] = useState([]);
    let myAddress = ""

    useEffect(() => {
        myAddress = "/" + window.location.href.split("/")[3]
        setMyBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === myAddress)))
    }, [block_store.blocks]);

    useEffect(() => {
        fetchDirectionsBachelor().then(data =>
            admission_store.setDirectionsBachelor(data.rows)
        )
    }, []);


    // document.onselectionchange = function() {
    //     let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();
    //     console.log(anchorNode, anchorOffset, focusNode, focusOffset)
    // };

    return (
        <div>
            {/*<ExtendedTextEditor text={text} setText={setText}/>*/}
            {/*<MDEditor.Markdown source={text} style={{whiteSpace: 'pre-wrap'}}/>*/}
            {/*<BlockContainer>*/}
            {/*    {*/}
            {/*        myBlocks.map(block =>*/}
            {/*            <Block key={block.id} block={block}/>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</BlockContainer>*/}
            <AdmissionBacContent2/>
        </div>
    );
})

export default AdmissionBac;