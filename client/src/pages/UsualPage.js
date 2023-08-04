import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import CommonBlocksDisplay from "../components/display/CommonBlocksDisplay";

const UsualPage = observer(() => {
    const [blockList, setBlockList] = useState({});

    const handMadeBlocksCount = 0

    return (
        <>
            <CommonBlocksDisplay blockList={blockList} setBlockList={setBlockList} handMadeBlocksCount={handMadeBlocksCount}/>
        </>
    );
});

export default UsualPage;