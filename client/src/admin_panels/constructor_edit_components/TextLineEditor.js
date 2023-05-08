import {useState } from "react";
import OurColorPicker from "../OurColorPicker";
import "../../css/component_styles/Editor.css";
import ExtendedTextEditor from "../../components/lines/ExtendedTextEditor";

/**
 * Компонент редактора текстовой линии
 * 
 * Пропы:
 * @param {Object} line Объект линии, которую редактирует в данный момент этот компонент
 * @param {function} changeLine Callback для вызова каждый раз, когда меняется line
 * @param {*} index Индекс данной линии (???) TODO
 * @returns Компонент редактора линии
 */
const TextLineEditor = ({ line, changeLine, index }) => {

    const [columnsNumber, setColumnsNumber] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [borderColor, setBorderColor] = useState(null);
    
    const onColumnTextChange = (columnIndex, newText) => {
        const newColumnsTexts = line.text;
        if (columnIndex < newColumnsTexts.length)
            newColumnsTexts[columnIndex] = newText;
        else
            newColumnsTexts.push(newText);
        changeLine('text', newColumnsTexts, index);
    };

    const onColumnNumberChange = (newColumnsNumber) => {
        if (newColumnsNumber > columnsNumber) {
            for (let i = columnsNumber + 1; i <= newColumnsNumber; i++)
                onColumnTextChange(i, "");
        } else {
            const newColumnsTexts = line.text.slice(0, newColumnsNumber);
            changeLine('text', newColumnsTexts, index);
        }
        setColumnsNumber(newColumnsNumber);
    };

    const onColorChange = (newBackgroundColor, newBorderColor) => {
        // Так как нельзя выбрать одновременно и цвет фона, и цвет границы, то при изменении одного из них сбрасываем второй

        // Находим, что действительно изменилось 
        if (newBackgroundColor != backgroundColor) {
            newBorderColor = null;
            line.params["backgroundColor"] = newBackgroundColor
        }
        else if (newBorderColor != borderColor) {
            newBackgroundColor = null;
            line.params["borderColor"] = newBorderColor
        }
        changeLine("params", line.params, index)
        setBackgroundColor(newBackgroundColor);
        setBorderColor(newBorderColor);
    }

    return (
       <div className="TextLineEditor-rootContainer">
            <div className="TextLineEditor-settingsPanel">
                <label>
                    Количество колонок:
                    <input 
                        type="number" 
                        min={1} 
                        max={3}
                        value={columnsNumber}
                        onChange={e => onColumnNumberChange(e.target.value)}
                    />
                </label>
                <label>
                    Цвет фона текста:
                    <OurColorPicker 
                        type='background'
                        isDisabled={backgroundColor == null && borderColor != null}
                        onColorPick={e => onColorChange(e, borderColor)}
                    />
                </label>
                <label>
                    Цвет рамки вокруг текста:
                    <OurColorPicker 
                        type='border'
                        isDisabled={backgroundColor != null && borderColor == null}
                        onColorPick={e => onColorChange(backgroundColor, e)}
                    />
                </label>
            </div>
            <div className="TextLineEditor-editorPanel">
                {
                    Array.apply(null, { length: columnsNumber }).map((e, i) =>   // Данная конструкция позволяет повторить элемент columnNumber раз, i - индекс текущего перебираемого элемента
                        <div className="TextLineEditor-editorColumn">
                            {
                                columnsNumber > 1 &&
                                <h3>Столбец {i + 1}</h3>
                            }
                            <ExtendedTextEditor
                                key={i}
                                text={line.text[i]}
                                setText={(t) => onColumnTextChange(i, t)}
                            />
                        </div>
                    )
                }
            </div>
       </div> 
    );
}

export default TextLineEditor;