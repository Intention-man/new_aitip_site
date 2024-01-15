import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import Menu from "./components/permanent/Menu";
import SideBar from './components/permanent/SideBar';
import {Context} from "./index";
import ContentContext from './components/contexts/ContentContext';
import LinksPanel from "./components/permanent/LinksPanel";
import "./css/component_styles/SocialMedia.css"
import Feedback from "./components/permanent/Feedback";
import Footer from "./components/permanent/Footer";
import {refetchAllContent} from "./additional_commands/commonPanelsFunctions";

import {fetchLines} from "./http/blockAPI";
import {DotLoader} from "react-spinners";


const App = observer(() => {
    const {block_store} = useContext(Context);

    const [loading, setLoading] = useState(true);
    const [currentContent, setCurrentContent] = useState([]);  // Стейт с текущими блоками страницы (нужны для LinksPanel)
    const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);

    useEffect(() => {
        const locationDataArr = window.location.href.split("/").slice(3);
        const forbidList = ["article", "personalities", "news"];
        setLeftSidebarVisible(!forbidList.includes(locationDataArr[0]));
    }, [window.location.href]);

    useEffect(() => {
        refetchAllContent(block_store);
        fetchLines().then(data => {
            block_store.setLines(data.rows)
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    });

    if (loading) {
        return <DotLoader color="#497AD8" size={200} cssOverride={{marginTop: "20%", marginLeft: "40%"}}/>
    }

    const updateContent = (newContent) => {  /* Это callback, который будет передан в ContentContext.Provider, чтобы внутренние компоненты могли передавать сюда блоки контента */
        // Изменяем currentContent только тогда, когда newContent отличается от него. Это нужно, чтобы избежать бесконечного ререндера.
        if (newContent.length !== currentContent.length) {
            setCurrentContent(newContent);
        } else {
            for (const i in newContent) {
                if (newContent[i].name !== currentContent[i].name) {
                    setCurrentContent(newContent);
                    break;
                }
            }
        }
    };

    return (
        <BrowserRouter>
            <Menu/>
            <div className='rootContainer' id="rootCont">
                {leftSidebarVisible &&
                    <SideBar
                        alignment='left'
                        isSticky={true}
                    >
                        <LinksPanel
                            links={currentContent.map(x => new Object({id: x.id, name: x.name, domNode: x.domNode}))}
                        />
                    </SideBar>
                }
                <ContentContext.Provider value={updateContent}>
                    <AppRouter/>
                </ContentContext.Provider>
                <SideBar
                    alignment='right'
                    isSticky={false}
                >
                    <h1>Электронные ресурсы</h1>
                    <Feedback/>
                </SideBar>
            </div>
            <Footer/>
        </BrowserRouter>
    )
})

export default App;
