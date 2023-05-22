/**
 * Компонент блока контента.
 *
 * Блок - это группа линий. Все переданные блоку линии располагаются на одном прямоугольнике, обособленном от других блоков.
 *
 * @param {object} block Объект блока (???) TODO
 * @param {boolean} useDatabase Стоит ли загружать блок из базы данных. Если нет,
 * то передавайте в пропе block поле lines с линиями и heading c заголовком блока (это временный костыль :/)
 * @returns Компонент блока для размещения в BlockContainer
 */

import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../index';
import LineDisplay from './LineDisplay';
import '../../css/component_styles/Block.css';


const Block = observer(({block, useDatabase, children}) => {
    // TODO: отрефакторить этот код, так как хотелось бы создавать блок необязательно обращаясь к БД.
    // Например, когда мы хотим показать превью блока, ещё не сохранённого пользователем.
    // Нужно убрать проп block, заменив его на важные для блока пропы (header, lines и др.).
    
    const {block_store} = useContext(Context);

    const [myLines, setMyLines] = useState([]);

    useEffect(() => {
        if (block == undefined)
            return;

        if (useDatabase) {
            setMyLines(block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal))
        } else {
            if (block.lines)
                setMyLines(block.lines);
            else
                setMyLines([]);
        }
    },[block]);

    // FIXME: ставить проп в аттрибут элемента - это костыль ;(
    return (
        <div className="Block" linkname={block == undefined ? "Test" : block.header}>
        {
            (block == undefined) ?
                <div>{children}</div>
            :
                <>
                    <h1>{block.header}</h1>
                    {
                        myLines.length > 0 && myLines.map(line =>
                            <LineDisplay key={line.id} line={line}/>
                        )
                    }
                </>
        }
        </div>
    );
})


export default Block;