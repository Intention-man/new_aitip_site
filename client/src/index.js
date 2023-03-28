// Код, который запускается в index.html (последний запускается при запуске проекта). Взаимосвязь с index.html по ключевому слову root. Здесь создается 2 набора переменных (store-ы) и App.js


import ReactDOM from "react-dom";
import App from "./App";
import {createContext} from "react";
import StaffStore from "./store/StaffStore";
import AdmissionStore from "./store/AdmissionStore";
import UserStore from "./store/UserStore";
import BlockStore from "./store/BlockStore";


// const stores = {
//     staff_store: new StaffStore(),
//     admission_store: new AdmissionStore(),
//     block_store: new BlockStore(),
// };

// export const Context = createContext(null);
// export const UserContext = createContext(null);

//
// const Root = () => {
    // const [isAuth, setIsAuth] = useState(false);
    // const [user, setUser] = useState({});
    // const user_store = useMemo(() => new UserStore(), []);
    // const contextValue = useMemo(() => ({...stores, user_store}), [user_store]);
    //
    // return (
    //     <UserContext.Provider value={{isAuth, setIsAuth, user, setUser}}>
    //         <Context.Provider value={contextValue}>
    //             <App/>
    //         </Context.Provider>
    //     </UserContext.Provider>
    // );
    // const user_store = useMemo(() => new UserStore(), []);
    // const contextValue = useMemo(() => ({ ...stores, user_store }), [user_store]);
    //
    // return (
    //     <Context.Provider value={contextValue}>
    //         <App />
    //     </Context.Provider>
    // );
// };

// ReactDOM.render(<Root/>, document.getElementById('root'));


export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

ReactDOM.render(
    <Context.Provider
        value={{
            staff_store: new StaffStore(),
            admission_store: new AdmissionStore(),
            user_store: new UserStore(),
            block_store: new BlockStore()
        }}
    >
        <App />
    </Context.Provider>,
    document.getElementById('root')
);