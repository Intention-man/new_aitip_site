import { useEffect, useState } from "react";
import ExtendedTextEditor from "../../lines/ExtendedTextEditor";
import "../../../css/component_styles/Editor.css";


const TwoColumnTextEditor = ({setExternalText, line, changeLine, index}) => {
    
    /**
     * Функция, возвращающая массив с изначальными текстами для каждой колонок (которые были переданы в пропе line) 
     * 
     * @returns Возвращает массив из двух значений: нулевое - значение текста левой колонки, первое - правой 
     */
    const getInitialText = () => {
        return (Array.isArray(line.params) && line.params.length >= 2) ? 
            [line.params[0], line.params[1]]
        : 
            ["", ""];
    }
    
    const [leftColumnText, setLeftColumnText] = useState(getInitialText()[0]);
    const [rightColumnText, setRightColumnText] = useState(getInitialText()[1]);
    
    useEffect(() => {  // Вызывается при изменении leftColumtText или rightColumnText
        setExternalText(getBothColumnsText());
        constructLine("params", [], index);
        constructLine("text", getBothColumnsText(), index);
    }, [leftColumnText, rightColumnText]);
    
    /**
     * Функция для объединения текста с двух полей в одно для линии
     * 
     * @param {String} key 
     * @param {*} value 
     * @param {*} index 
     */
    const constructLine = (key, value, thisIndex) => {
        if (key == "params")
            value = [leftColumnText, rightColumnText];
        if (key == "text")
            value = getBothColumnsText();
        
        changeLine(key, value, thisIndex);
    }

    /**
     * Функция, возвращающая отформатированный текст обеих колонок
     * 
     * @returns Отформатированный текст обеих колонок (в формате Markdown)
     */
    const getBothColumnsText = () => {
        return (leftColumnText.trim().length + rightColumnText.trim().length) > 0 ?  // Проверить ввод пользователя на пустоту
            `${leftColumnText}\n${rightColumnText}`
        : 
            ""; 
    }

    return (
        <div className="TwoColumnTextEditor-columnsContainer">
            <div className="TwoColumnTextEditor-leftColumnContainer">
                <h3>Левая колонка</h3>
                <ExtendedTextEditor
                    text={leftColumnText}
                    setText={setLeftColumnText}
                    changeLine={constructLine}
                    index={index}
                />
            </div>
            <div className="TwoColumnTextEditor-rightColumnContainer">
                <h3>Правая колонка</h3>
                <ExtendedTextEditor 
                    text={rightColumnText}
                    setText={setRightColumnText}
                    changeLine={constructLine}
                    index={index}
                />
            </div>
        </div>
    );
}

export default TwoColumnTextEditor;