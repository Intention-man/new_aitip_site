import {observer} from "mobx-react-lite";
import React from "react";
import CommonPagesDisplay from "../components/display/CommonPagesDisplay";

/**
 * Единый компонент страницы для всех страниц, содержащих только конструкторские блоки
 */

const UsualPage = observer(() => {
    return (
        <>
            <CommonPagesDisplay blockList={{}} handMadeBlocksCount={0}/>
        </>
    );
});

export default UsualPage;