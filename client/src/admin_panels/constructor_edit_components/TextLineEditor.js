import {useEffect, useState} from "react";
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

    // const [columnsNumber, setColumnsNumber] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [borderColor, setBorderColor] = useState(null);
    const [textList, setTextList] = useState(line.text);

    useEffect(() => {
        setTextList(line.text)
    }, [line])

    const onColumnTextChange = (columnIndex, newText) => {
        if (columnIndex < textList.length)
            textList[columnIndex] = newText;
        changeLine('text', textList, index);
    };

    const onColumnNumberChange = (newColumnsNumber) => {
        console.log(textList, line.text)
        if (newColumnsNumber > 0 && newColumnsNumber < 4){
            console.log(newColumnsNumber + " is normal")
            if (newColumnsNumber > textList.length) {
                // console.log(newColumnsTexts)
                const count = newColumnsNumber - textList.length
                for (let i = 0; i < count; i++) {
                    textList.push("");
                }
                console.log(textList)
                changeLine('text', textList, index);
                setTextList((prevState) => textList)
                // setColumnsNumber(newColumnsTexts.length);
            } else if (textList.length > 0){
                textList.slice(0, newColumnsNumber)
                console.log(textList.slice(0, newColumnsNumber))
                changeLine('text', textList.slice(0, newColumnsNumber), index);
                setTextList((prevState) => textList.slice(0, newColumnsNumber));
            }
        }
    };

    const onColorChange = (newBackgroundColor, newBorderColor) => {
        // Так как нельзя выбрать одновременно и цвет фона, и цвет границы, то при изменении одного из них сбрасываем второй

        // Находим, что действительно изменилось
        if (newBackgroundColor !== backgroundColor) {
            newBorderColor = null;
            line.params["backgroundColor"] = newBackgroundColor
        }
        else if (newBorderColor !== borderColor) {
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
                        // min={1}
                        // max={3}
                        value={textList.length}
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
                    Array.apply(null, { length: textList.length }).map((e, i) =>   // Данная конструкция позволяет повторить элемент columnNumber раз, i - индекс текущего перебираемого элемента
                        <div className="TextLineEditor-editorColumn">
                            {
                                textList.length > 1 &&
                                <h3>Столбец {i + 1}</h3>
                            }
                            <ExtendedTextEditor
                                key={i}
                                text={textList[i]}
                                setText={(t) => onColumnTextChange(i, t)}
                                changeLine={changeLine}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TextLineEditor;