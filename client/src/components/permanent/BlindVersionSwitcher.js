import { useState } from "react"
import EyeIcon from "../../local_assets/eye.png"
import "../../css/component_styles/Menu.css"


const BlindVersionSwitcher = () => {

    const BLIND_VERSION_FONT_SIZE = '25px';

    const [isBlindVersionActive, setIsBlindVersionActive] = useState(false);
    const [defaultFontSize, setDefaultFontSize] = useState('20px');

    const toggleBlindVersion = () => {
        const root = document.documentElement;
        let newValue;
        if (isBlindVersionActive) {
            newValue = defaultFontSize;
        } else {
            newValue = BLIND_VERSION_FONT_SIZE;
            setDefaultFontSize(root.style.getPropertyValue('--font_size_const'));
        }
        root.style.setProperty('--font_size_const', newValue);
        setIsBlindVersionActive(!isBlindVersionActive);
    };

    return (
        <button 
            className={
                "blindversion " + 
                (isBlindVersionActive ? "blindversion-active" : "blindversion-inactive")
            }
            onClick={toggleBlindVersion}
        >
            Версия для слабовидящих
            <img
                src={EyeIcon}
                style={{color: "white", paddingLeft: "10px", paddingTop: "12px"}}
            />
        </button>
    );
}

export default BlindVersionSwitcher;