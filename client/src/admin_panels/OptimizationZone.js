import React from 'react';
import {deleteAllUnusedFiles} from "../http/commonAPI";

const OptimizationZone = () => {
    return (
        <div>
            <button onClick={deleteAllUnusedFiles}>Удалить все неиспользующиеся файлы</button>
        </div>
    );
};

export default OptimizationZone;
