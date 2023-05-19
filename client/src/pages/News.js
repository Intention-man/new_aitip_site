import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";


const News = () => {
    const {block_store} = useContext(Context);
    const [news, setNews] = useState([])

    useEffect(() => {
        setNews(block_store.news)
    })

    const getCover = (item) => {
        console.log(item.header)
        for (let line of block_store.lines.filter(line => line.blockId === item.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal)) {
            if (line.filesNames.length > 0) return line.filesNames[0]
        }
    }

    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            {news.length > 0 && news.map(item =>
                <div style={{border: "solid green 3px"}}>
                    <img src={process.env.REACT_APP_API_URL + getCover(item)} style={{width: '100%'}}/>
                    <p>{item.header}</p>
                </div>
            )}
        </div>
    );
};

export default News;