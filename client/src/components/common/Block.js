import React, {useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import Card from "./card/Card";
import Carusel from "./Carusel";
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import LineDisplay from "./LineDisplay";


const Block = observer(({block}) => {
    const {block_store} = useContext(Context);
    console.log("in block")

    const [myLines, setMyLines] = useState([]);

    useEffect(() => {
        setMyLines(block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal))
    },[block_store]);


    return (
        <div style={{margin: "50px 0"}}>
            <h1>{block.header}</h1>
            {myLines.length > 0 && myLines.map(line =>
                {
                    console.log(line.lineOrdinal)
                    return (
                        <LineDisplay line={line}/>
                    )
                }
            )}
        </div>
    );
});

export default Block;
