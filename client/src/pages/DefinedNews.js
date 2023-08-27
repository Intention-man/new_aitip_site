import React, {useContext} from 'react';
import {useNavigate, useParams} from "react-router";
import {Context} from "../index";
import Block from "../components/display/Block";
import {observer} from "mobx-react-lite";
import BlockContainer from "../components/display/BlockContainer";

const DefinedNews = observer(() => {
    const {block_store} = useContext(Context);
    const {id} = useParams();
    const newsBlock = Array.from(block_store.news.filter(el => el.id === Number(id)))[0];
    console.log(newsBlock)
    const navigate = useNavigate();


    return (
        <BlockContainer>
            {/*<p style={{fontWeight: 700, color: "var(--aitip_blue)", cursor: "pointer"}}*/}
            {/*   onClick={() => navigate("/news")}>Ко всем новостям</p>*/}
            <p className="blue_page_title">{newsBlock.header}</p>
            <Block key={newsBlock.id} block={newsBlock} header={newsBlock.header}/>
            {/*<div className="news_date">{Number(newsBlock.createdAt.substring(8, 10)) + " " + monthList[Number(newsBlock.createdAt.substring(5, 7))]}</div>*/}
        </BlockContainer>

    );
});

export default DefinedNews;
