// Отвечает за то, какие страницы доступны, для каких нужно быть авторизованным (Admin) и какая запускается по умолчанию (Main)

import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {authRoutes, publicRoutes} from "./routes";


const AppRouter = observer(() => {
    const {user_store} = useContext(Context);


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

