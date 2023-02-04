import React, {useEffect, useState} from 'react';
import {publicRoutes} from "../routes";
import {useContext} from "react";
import {Context} from "../index";
import Block from "../components/Block";
import {useParams} from "react-router";


const Main = () => {
    const {block_store} = useContext(Context);
    
    const [myBlocks, setMyBlocks] = useState([]);
    let myAddress = ""

    useEffect(() => {
        myAddress = "/" + window.location.href.split("/")[3]
        setMyBlocks(block_store.blocks.filter(block => block.pageLink === myAddress))
        console.log(myAddress, myBlocks, block_store.blocks)
    }, [block_store]);

    return (
        <div>
            {myBlocks.map(block =>
                <Block block={block}/>
            )}
        </div>
    );
};

export default Main;