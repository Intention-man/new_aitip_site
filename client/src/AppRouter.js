// Отвечает за то, какие страницы доступны, для каких нужно быть авторизованным (Admin) и какая запускается по умолчанию (Main)

import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Route} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {fetchBlocks, fetchLines} from "./http/blockAPI";
import {authRoutes, publicRoutes} from "./routes";
import {check} from "./http/userAPI";


const AppRouter = observer(() => {
    console.log(localStorage)
    console.log(sessionStorage)
    const {block_store} = useContext(Context);
    const {user_store} = useContext(Context);
    // const isAdmin = useMemo(() => user_store.isAuth, [user_store.isAuth]);
    // console.log(user_store.isAuth)
    // console.log(user_store.user)


    useEffect(() => {
        fetchLines().then(data => {
            block_store.setLines(data.rows)
            // console.log(data.rows)
        })
        fetchBlocks().then(data => {
            block_store.setBlocks(data.rows)
            // console.log(data.rows)
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
            {user_store.isAuth && aRoutes}
            {pRoutes}
            <Route
                path="*"
                element={<Navigate to="/" replace={true} />}
            />
            {/*<Redirect path="*" element={<Main/>}/>*/}
        </Routes>
    );
})


export default AppRouter;

