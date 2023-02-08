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
const Block = observer(({ block }) => {
    const {block_store} = useContext(Context);

    const [myLines, setMyLines] = useState([]);

    useEffect(() => {
        setMyLines(block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal))
    },[block_store]);

    // FIXME: ставить проп в аттрибут элемента - это костыль ;(
    return (
        <div className="Block" linkname={block.header}>
            <h1>{block.header}</h1>
            {
                myLines.length > 0 && myLines.map(line =>
                    {
                        console.log(line.lineOrdinal)
                        return (
                            <LineDisplay key={line.id} line={line}/>
                        )
                    }
                )
            }
        </div>
    );
})

export default Block;
