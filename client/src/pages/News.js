import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import { useNavigate } from 'react-router';
import Block from "../components/display/Block";
import Default from "../local_assets/logo-in-round.svg";


const News = () => {
    const {block_store} = useContext(Context);
    // const [news, setNews] = useState([])
    const [chosenNews, setChosenNews] = useState({});

    // useEffect(() => {
    //     setNews(block_store.news)
    // })

    const getCover = (item) => {
        console.log(item.header)
        for (let line of block_store.lines.filter(line => line.blockId === item.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal)) {
            if ([2, 3, 4].includes(line.kind) && line.filesNames.length > 0) {
                if (line.addressFileType === "global"){
                    return line.filesNames[0]
                } else {
                    return process.env.REACT_APP_API_URL + line.filesNames[0]
                }

            }
        }
        return Default;
    }

    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            {block_store.news.length > 0 && block_store.news.map(item =>
                <div style={{border: "solid green 3px"}} onClick={() => setChosenNews(item)}>
                    <img src={getCover(item)} style={{width: '100%'}}/>
                    <p>{item.header}</p>
                </div>
            )}
            <Block key={chosenNews.id} block={chosenNews}/>
        </div>
    );
};

export default News;