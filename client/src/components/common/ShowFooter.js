import React, { useState, useEffect } from 'react';
import MobileFooter from "./MobileFooter";
import ProFooter from "./ProFooter";

const ShowFooter = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);

        // убираем обработчик события после размонтирования компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isSmallScreen) {
        return <div>
            <MobileFooter/>
        </div>;
    } else {
        return <div>
            <ProFooter/>
        </div>;
    }
};

export default ShowFooter;