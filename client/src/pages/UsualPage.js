import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {addConstructorBlocks} from "../additional_commands/commonPanelsFunctions";
import Block from "../components/display/Block";
import CommonBlocksDisplay from "../components/display/CommonBlocksDisplay";

const UsualPage = observer(() => {
    const [blockList, setBlockList] = useState({});

    const handMadeBlocksCount = 0

    return (
        <CommonBlocksDisplay blockList={blockList} setBlockList={setBlockList} handMadeBlocksCount={handMadeBlocksCount}/>
    );
});

export default UsualPage;