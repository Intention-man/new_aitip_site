import React, {useEffect, useState} from 'react';
import {fetchNews} from "../http/newsAPI";
import MDEditor from "@uiw/react-md-editor";


const Main = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews().then(data => {
            setNews(data.rows)
            console.log(data)
        })
    }, [])

    return (
        <div key={news.name}>
            {news.length > 0 && news.map(n =>
                <div>
                    <h1>{n.name}</h1>
                    <MDEditor.Markdown source={n.content} style={{ whiteSpace: 'pre-wrap' }} />
                </div>
            )}
        </div>
    );
};

export default Main;
