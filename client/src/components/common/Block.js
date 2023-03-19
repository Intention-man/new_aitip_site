import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../index';
import LineDisplay from './LineDisplay';
import '../../css/component_styles/Block.css';

/**
 * Компонент блока контента. 
 * 
 * Блок - это группа линий. Все переданные блоку линии располагаются на одном прямоугольнике, обособленном от других блоков. 
 * 
 * @param {string} linkName - имя данного блока, которое будет отображаться в виде ссылки в боковой панели с ссылками на все блоки страницы
 */
const Block = observer(({ block, useDatabase }) => {
    // TODO: отрефакторить этот код, так как хотелось бы создавать блок необязательно обращаясь к БД.
    // Например, когда мы хотим показать превью блока, ещё не сохранённого пользователем.
    // Нужно убрать проп block, заменив его на важные для блока пропы (header, lines и др.).
    console.log('Block:', block)
    const {block_store} = useContext(Context);

    const [myLines, setMyLines] = useState([]);

    useEffect(() => {
        if (useDatabase) {
            console.log(block.id)
            setMyLines(block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal))
            console.log(block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal))
        } else {
            if (block.lines)
                setMyLines(block.lines);
            else
                setMyLines([]);
        }
    },[block]);

    // FIXME: ставить проп в аттрибут элемента - это костыль ;(
    return (
        <div className="Block" linkname={block.header}>
            <h1>{block.header}</h1>
            {
                myLines.length > 0 && myLines.map(line =>
                    <LineDisplay key={line.id} line={line}/>
                )
            }
        </div>
    );
})

export default Block;
