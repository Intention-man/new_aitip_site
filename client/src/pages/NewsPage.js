import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import Default from "../local_assets/logo-in-round.svg";
import {refetchAllContent} from "../additional_commands/commonPanelsFunctions";
import {fetchBlocks} from "../http/blockAPI";
import {useNavigate} from "react-router";
import {observer} from 'mobx-react-lite';
import {Container} from "react-bootstrap";
import BigImg from "../components/lines/BigImg";


const NewsPage = observer(() => {
    const {block_store} = useContext(Context);
    const navigate = useNavigate();
    const [chosenNews, setChosenNews] = useState({});

    useEffect(() => {
        fetchBlocks().then(data => {
            block_store.setLines(data.rows)
        })
        refetchAllContent(block_store);
    }, [])

    const getNewsCover = (item) => {
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
        <Container className="mt-md-4">
            <div className="news_container" >
                {block_store.news && Array.from(block_store.news).sort((e1, e2) => e2.createdAt - e1.createdAt).map(e =>
                    <a onClick={() => navigate("/article/" + e.id)}>
                        {/*<img src={getNewsCover(e)} alt=""/>*/}
                        <BigImg imgSrc={getNewsCover(e)} alt=""/>
                        <p>{e.header}</p>
                    </a>
                )}
            </div>
        </Container>
    );
});

export default NewsPage;