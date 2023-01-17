// BrowserRouter - обертка для запуска всех страниц. На каждой странице будут меню (NavBar), а также компонент-страница (какую страницу запускать решает AppRouter)

import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import Menu from "./components/Menu";
import {useContext} from "react";
import {Context} from "./index";
import Footer from "./components/Footer";


const App = observer(() => {
    const {user} = useContext(Context)
    return (
        <BrowserRouter>
            <Menu/>
            <div className='rootContainer'>
                <AppRouter/>
            </div>
            <Footer/>
        </BrowserRouter>
    )
})

export default App;
