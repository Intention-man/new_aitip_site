import React from 'react';

const ContentContext = React.createContext({
    setContent: (newContent) => {}
});

export default ContentContext;
