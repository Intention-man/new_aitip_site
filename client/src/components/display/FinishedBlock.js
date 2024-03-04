import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../index";
import LineDisplay from "./LineDisplay";

const FinishedBlock = observer(({blockData}) => {
    const {block_store} = useContext(Context);
    const shouldDisplay = (blockData.hasOwnProperty('id') && block_store.lines.filter(line => line.blockId === blockData.id).length > 0)
    const blockLines = block_store.lines.filter(line => line.blockId === blockData.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal)
    
    return (
        <div className="Block" linkname={blockData.header}>
            {shouldDisplay &&
                <>
                    <h1 className="Block-header">{blockData.header}</h1>
                    {blockLines.map(line => <LineDisplay key={line.id} line={line}/>)
                    }
                </>
            }
        </div>
    );
})

export default FinishedBlock;
