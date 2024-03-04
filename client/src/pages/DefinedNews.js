import React, {useContext} from 'react';
import {useNavigate, useParams} from "react-router";
import {Context} from "../index";
import Block from "../components/display/Block";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

const DefinedNews = observer(() => {
    const {block_store} = useContext(Context);
    const {id} = useParams();
    const newsBlock = Array.from(block_store.news.filter(el => el.id === Number(id)))[0];
    console.log(newsBlock)
    const navigate = useNavigate();


    return (
        <Container className="mt-md-4">
            <p className="blue_page_title">{newsBlock.header}</p>
            <Block key={newsBlock.id} block={newsBlock} header={newsBlock.header}/>
            <p style={{fontWeight: 700, color: "var(--aitip_blue)", cursor: "pointer"}}
               onClick={() => navigate("/news")}>⬅️ Ко всем новостям</p>
        </Container>

    );
});

export default DefinedNews;
