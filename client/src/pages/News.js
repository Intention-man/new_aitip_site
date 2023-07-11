import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Block from "../components/display/Block";
import Default from "../local_assets/logo-in-round.svg";
import {useEffect} from "react";
import {refetchAllContent} from "../additional_commands/commonPanelsFunctions";
import {fetchBlocks} from "../http/blockAPI";


const News = () => {
    const {block_store} = useContext(Context);
    const [chosenNews, setChosenNews] = useState({});

    useEffect(() => {
        fetchBlocks().then(data => {
            block_store.setLines(data.rows)
        })
        refetchAllContent(block_store);
    }, [])

    const getCover = (item) => {
        console.log(item.header)
        for (let line of block_store.lines.filter(line => line.blockId === item.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal)) {
            if ([2, 3, 4].includes(line.kind) && line.filesNames.length > 0) {
                if (line.addressFileType === "global") {
                    return line.filesNames[0]
                } else {
                    return process.env.REACT_APP_API_URL + line.filesNames[0]
                }

            }
        }
        return Default;
    }

    return (
        <Block header="Новости">
            <div className="news_container">
                {block_store.news && block_store.news.sort((e1, e2) => e2.id - e1.id).map(e =>
                    <a href="#">
                        <img src={getCover(e)} alt=""/>
                        <p>{e.header}</p>
                    </a>
                )}
            </div>
        </Block>
    );
};

export default News;