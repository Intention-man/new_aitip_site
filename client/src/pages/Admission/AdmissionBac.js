import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import Block from '../../components/Block';
import BlockContainer from '../../components/BlockContainer';
import { Context } from "../../index";
import "../../css/main.css"
import "../../css/main.css";

const AdmissionBac = observer(() => {
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
            <BlockContainer>
                {
                    myBlocks.map(block =>
                        <Block key={block.id} block={block}/>
                    )
                }
            </BlockContainer>
        </div>
    );
})

export default AdmissionBac;