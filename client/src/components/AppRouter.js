// Отвечает за то, какие страницы доступны, для каких нужно быть авторизованным (Admin) и какая запускается по умолчанию (Main)

import React, {useContext, useEffect} from 'react';
import {authRoutes, publicRoutes} from "../routes";
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import {Context} from "../index";
import Main from "../pages/Main";
import {fetchBlocks, fetchLines} from "../http/blockAPI";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {block_store} = useContext(Context);

    useEffect(() => {
        fetchBlocks().then(data => {
            block_store.setBlocks(data.rows)
            console.log(data.rows)
        })
        fetchLines().then(data => {
            block_store.setLines(data.rows)
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
