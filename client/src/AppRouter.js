// Отвечает за то, какие страницы доступны, для каких нужно быть авторизованным (Admin) и какая запускается по умолчанию (Main)

import React, {useContext, useEffect} from 'react';
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {fetchBlocks, fetchLines} from "./http/blockAPI";
import {authRoutes, publicRoutes} from "./routes";
import Main from "./pages/Main";


const AppRouter = observer(() => {
    const {block_store} = useContext(Context);
    const {user_store} = useContext(Context);
    console.log(user_store.isAuth)

    useEffect(() => {
        fetchLines().then(data => {
            block_store.setLines(data.rows)
            console.log(data.rows)
        })
        fetchBlocks().then(data => {
            block_store.setBlocks(data.rows)
            console.log(data.rows)
        })
    }, [])

    const aRoutes = authRoutes.map(
        ({path, Component}, key) =>
            <Route key={key} path={path} element={Component}/>
    );

    const pRoutes = publicRoutes.map(
        ({path, Component}, key) =>
            <Route key={key} path={path} element={Component}/>
    );

    return (
        <Routes>
            {aRoutes}
            {pRoutes}
            <Route path="*" element={<Main/>}/>
        </Routes>
    );
})


export default AppRouter;