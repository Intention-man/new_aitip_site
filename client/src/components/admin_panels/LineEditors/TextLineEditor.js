import { useEffect, useState } from "react";
import ExtendedTextEditor from "../../lines/ExtendedTextEditor";
import "../../../css/component_styles/Editor.css";

const TextLineEditor = ({ line, changeLine, index }) => {

    const [columnsNumber, setColumnsNumber] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("");
    const [borderColor, setBorderColor] = useState("");
    
    const setColumnText = (columnIndex, newText) => {
        const newColumnsTexts = line.text;
        if (columnIndex < newColumnsTexts.length)
            newColumnsTexts[columnIndex] = newText;
        else
            newColumnsTexts.push(newText);
        changeLine('text', newColumnsTexts, index);
    }

    const changeColumnsNumber = (newColumnsNumber) => {
        if (newColumnsNumber > columnsNumber) {
            for (let i = columnsNumber + 1; i <= newColumnsNumber; i++)
                setColumnText(i, "");
        } else {
            const newColumnsTexts = line.text.slice(0, newColumnsNumber);
            changeLine('text', newColumnsTexts, index);
        }
        setColumnsNumber(newColumnsNumber);
    }

    return (
       <div className="TextLineEditor-rootContainer">
            <div className="TextLineEditor-settingsPanel">
                <form>
                    <label>
                        Количество колонок:
                        <input 
                            type="number" 
                            min={1} 
                            max={3}
                            value={columnsNumber}
                            onChange={e => changeColumnsNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        Цвет фона текста:
                        <input 
                            type="color" 
                        />
                    </label>
                    <label>
                        Цвет рамки вокруг текста:
                        <input 
                            type="color" 
                        />
                    </label>
                </form>
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
                                setText={(t) => setColumnText(i, t)}
                            />
                        </div>
                    )
                }
            </div>
       </div> 
    );
}

export default TextLineEditor;