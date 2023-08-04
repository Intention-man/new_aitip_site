import {useEffect, useState} from "react"
import EyeIcon from "../../local_assets/eye.png"
import "../../css/component_styles/Menu.css"


/**
 * Компонент переключателя версии для слабовидящих.
 */
const BlindVersionSwitcher = () => {

    const BLIND_VERSION_FONT_SIZE = '25px';  // Размер шрифта в версии для слабовидящих

    const [isBlindVersionActive, setIsBlindVersionActive] = useState(false);
    const [defaultFontSize, setDefaultFontSize] = useState('20px');  /* Размер шрифта в обычной версии,
                                                                        помещён в стейт, так как его желательно
                                                                        подгружать из CSS-константы */

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
        let newValue;  
        if (isBlindVersionActive) {
            newValue = defaultFontSize;  // Если был режим для слабовидящих - возвращаем стандартный шрифт
        } else {
            newValue = BLIND_VERSION_FONT_SIZE;  // Если был стандартный режим - устанавливаем увеличенный шрифт
            // Далее твик, чтобы подгрузить значение константы --font_size_const в defaultFontSize
            setDefaultFontSize(root.style.getPropertyValue('--font_size_const'));
        }
        root.style.setProperty('--font_size_const', newValue);  // Обновляем размер шрифта
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
            Версия для слабовидящих
            <img
                src={EyeIcon}
                style={{color: "white", paddingLeft: "10px", paddingTop: "12px"}}
            />
        </button>
    );
}

export default BlindVersionSwitcher;