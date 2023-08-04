import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import CommonPagesDisplay from "../components/display/CommonPagesDisplay";

/**
 * Единый компонент страницы для всех страниц, содержащих только конструкторские блоки
 */

const UsualPage = observer(() => {
    const [blockList, setBlockList] = useState({});

    const handMadeBlocksCount = 0

    return (
        <>
            <CommonPagesDisplay blockList={blockList} setBlockList={setBlockList} handMadeBlocksCount={handMadeBlocksCount}/>
        </>
    );
});

export default UsualPage;