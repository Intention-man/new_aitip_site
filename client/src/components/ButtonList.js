import React from 'react';
// принимает словарь со значением
const ButtonList = ({buttonList}) => {
    return (
        <ul>
            {buttonList}
        </ul>
    );
};

export default ButtonList;