import {useEffect, useState} from "react"
import EyeIcon from "../../local_assets/eye.png"
import "../../css/component_styles/Menu.css"


/**
 * Компонент переключателя версии для слабовидящих.
 */
const BlindVersionSwitcher = () => {

    const BLIND_VERSION_FONT_INCREMENT = 6;  // На сколько увеличивать весь шрифт (в пикселях)
    const FONT_SIZE_CONSTS = [  // Названия CSS-констант, которые будут изменяться
        'default_font_size',
        'subheading_font_size',
        'heading_font_size'
    ]

    const [isBlindVersionActive, setIsBlindVersionActive] = useState(false);

    useEffect(() => {  // При загрузке компонента вызываем необходимые функции
        restoreSavedState();
    }, []);

    /**
     * Восстановление сохранённого стейта `isBlindVersionActive`.
     * 
     * Нужно для того, чтобы сохранять в память, была ли включена версия для слабовидящих.
     * Это позволяет сохранять включённую пользователем версию после перезагрузки страницы
     * или при переходе на другие.
     */
    const restoreSavedState = () => {
        const savedState = localStorage.getItem('isBlindVersionActive');
        if (savedState == 'true')
            toggleBlindVersion();
    }

    /**
     * Обработчик переключения версии для слабовидящих.
     */
    const toggleBlindVersion = () => {
        const root = document.documentElement;  // Селектор элемента :root
        for (const constName of FONT_SIZE_CONSTS) {
             let currentValue = parseInt(
                getComputedStyle(root)
                .getPropertyValue(`--${constName}`)
                .replace('px', '')
            )
            if (Number.isNaN(currentValue))
                currentValue = 19
        
            let newValue;  
            if (isBlindVersionActive) {
                newValue = currentValue - BLIND_VERSION_FONT_INCREMENT;  // Если был режим для слабовидящих - возвращаем стандартный шрифт
            } else {
                newValue = currentValue + BLIND_VERSION_FONT_INCREMENT;  // Если был стандартный режим - устанавливаем увеличенный шрифт
            }
            const newValueWithUnits = `${newValue}px`
            root.style.setProperty(`--${constName}`, newValueWithUnits);  // Обновляем размер шрифта
        }
        localStorage.setItem('isBlindVersionActive', !isBlindVersionActive);
        setIsBlindVersionActive(!isBlindVersionActive);
    };

    return (
        <button 
            className={  // В зависимости от isBlindVersionActive выбираем доп. CSS-класс 
                "blindversion " +
                (isBlindVersionActive ? "blindversion-active" : "blindversion-inactive")
            }
            onClick={toggleBlindVersion}
        >
            <span style={{width: "min-content"}}>Версия для слабовидящих</span>
            <img
                src={EyeIcon}
                style={{color: "white", paddingLeft: "10px", paddingTop: "12px"}}
            />
        </button>
    );
}

export default BlindVersionSwitcher;