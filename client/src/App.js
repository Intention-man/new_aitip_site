// BrowserRouter - обертка для запуска всех страниц. На каждой странице будут меню (NavBar), а также компонент-страница (какую страницу запускать решает AppRouter)

import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import Menu from "./components/permanent/Menu";
import SideBar from './components/permanent/SideBar';
import {Context} from "./index";
import ContentContext from './components/contexts/ContentContext';
import LinksPanel from "./components/permanent/LinksPanel";
import {check} from "./http/userAPI";
import "./css/component_styles/SocialMedia.css"
import Feedback from "./components/permanent/Feedback";
import Footer from "./components/permanent/Footer";
import {refetchAllContent} from "./additional_commands/commonPanelsFunctions";

import {fetchLines} from "./http/blockAPI";
import BlockContainer from "./components/display/BlockContainer";
import {DotLoader} from "react-spinners";


const App = observer(() => {
    const {block_store} = useContext(Context);
    const {user_store} = useContext(Context);

    const [loading, setLoading] = useState(true);
    const [currentContent, setCurrentContent] = useState([]);  // Стейт с текущими блоками страницы (нужны для LinksPanel)

    
    useEffect(() => {
        refetchAllContent(block_store);
        fetchLines().then(data => {
            block_store.setLines(data.rows)
        })
    }, [])
    
    useEffect(() => {
        setTimeout(() => {
            try {
                check().then(response => {
                    if (response !== undefined && typeof response === "object" && response.hasOwnProperty("email")) {
                        user_store.setIsAuth(true)
                        user_store.setUser(response)
                    } else {
                        user_store.setIsAuth(false)
                    }
                }).finally(() => setLoading(false))
            } catch (error) {
                const {response} = error;
                const {request, ...errorObject} = response; // take everything but 'request'
                console.log(errorObject);
            }
        }, 1000)
    });

    if (loading) {
        return <DotLoader color="#497AD8" size={200} cssOverride={{marginTop: "20%", marginLeft: "40%"}}/>
    }

    const updateContent = (newContent) => {  /* Это callback, который будет передан в ContentContext.Provider, 
                                                чтобы внутренние компоненты могли передавать сюда блоки контента */
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
                <SideBar
                    alignment='left'
                    isSticky={true}
                >
                    <LinksPanel
                        links={currentContent.map(x => new Object({id: x.id, name: x.name, domNode: x.domNode}))}
                    />
                </SideBar>
                <ContentContext.Provider value={updateContent}>
                    <BlockContainer>
                        <AppRouter/>
                    </BlockContainer>
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
