import React, {useContext} from 'react';
import {useNavigate, useParams} from "react-router";
import {Context} from "../index";
import Block from "../components/display/Block";
import {observer} from "mobx-react-lite";

const DefinedNews = observer(() => {
    const {block_store} = useContext(Context);
    const {id} = useParams();
    const newsBlock = Array.from(block_store.news.filter(el => el.id === Number(id)))[0];
    console.log(newsBlock)
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate(-1)}>Назад</div>
            <Block key={newsBlock.id} block={newsBlock} header={newsBlock.header}/>
        </>

    );
});

export default DefinedNews;
