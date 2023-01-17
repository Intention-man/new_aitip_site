// Код, который запускается в index.html (последний запускается при запуске проекта). Взаимосвязь с index.html по ключевому слову root. Здесь создается 2 набора переменных (store-ы) и App.js


import ReactDOM from "react-dom";
import App from "./App";
import {createContext} from "react";
import StaffStore from "./store/StaffStore";
import AdmissionStore from "./store/AdmissionStore";
import UserStore from "./store/UserStore";


export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

ReactDOM.render(
    <Context.Provider value={{
        staff_store: new StaffStore(),
        admission_store: new AdmissionStore(),
        user_store: new UserStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);