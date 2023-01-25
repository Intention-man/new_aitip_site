import React from 'react';

/**
 * Это React Context, содержащий callback для изменения текущих активных блоков страницы (нужен в `App.js`)
 * TODO: возможно, это костыль
 */
const ContentContext = React.createContext({
    setContent: (newContent) => {}
});

export default ContentContext;
