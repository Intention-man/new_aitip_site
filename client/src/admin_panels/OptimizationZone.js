import React, {useContext} from 'react';
import {deleteAllUnusedFiles} from "../http/commonAPI";
import {Context} from "../index";

const OptimizationZone = () => {
    const {user_store} = useContext(Context)
    return (
        <div>
            {user_store.user.email === "great" &&
                <button onClick={deleteAllUnusedFiles}>Удалить все неиспользующиеся файлы</button>
            }
        </div>
    );
};

export default OptimizationZone;
