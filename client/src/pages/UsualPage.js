import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {fetchAdditionalPrograms} from "../http/admissionAPI";
import {addConstructorBlocks} from "../additional_commands/commonPanelsFunctions";
import Block from "../components/display/Block";

const UsualPage = observer(() => {
    const {block_store} = useContext(Context);

    const [blockList, setBlockList] = useState({});

    const handMadeBlocksCount = 0
    const myAddress = "/" + window.location.href.split("/")[3]


    useEffect(() => {
        addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)
    }, [block_store.blocks, block_store.lines]);

    return (
        <>
            {Object.values(blockList).map((block, index) => {
                if (block.hasOwnProperty("id")) {
                    return <Block key={index} block={block} header={block.header}/>
                } else {
                    return <>{block}</>
                }
            })}
        </>
    );
});

export default UsualPage;