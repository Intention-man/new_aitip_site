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

import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Context} from '../../index';
import LineDisplay from './LineDisplay';
import '../../css/component_styles/Block.css';


const Block = observer(({block, header, children}) => {
    // TODO: отрефакторить этот код, так как хотелось бы создавать блок необязательно обращаясь к БД.
    // Например, когда мы хотим показать превью блока, ещё не сохранённого пользователем.
    // Нужно убрать проп block, заменив его на важные для блока пропы (header, lines и др.).
    // console.log(block)
    const {block_store} = useContext(Context);

    const monthList = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]

    // FIXME: ставить проп в аттрибут элемента - это костыль ;(
    return (
        <div className="Block" linkname={block === undefined ? header : block.header}>
            {
                (block === undefined) ?
                    ((children) ?
                            <>
                                <h1 className="Block-header">{header}</h1>
                                {children}
                            </>
                            :
                            <></>
                    )

                    :
                    <>
                        {((block.hasOwnProperty('id') && block_store.lines.filter(line => line.blockId === block.id).length > 0) || (!block.hasOwnProperty('id') && block.lines.length === 0)) && (
                            !block.isNews && <h1 className="Block-header">{block.header}</h1>
                        )
                        }
                        {block.hasOwnProperty('id') ?
                            (block_store.lines.filter(line => line.blockId === block.id).length > 0 ?
                                    block_store.lines.filter(line => line.blockId === block.id).sort((a, b) => a.lineOrdinal - b.lineOrdinal).map(line =>
                                        <LineDisplay key={line.id} line={line}/>
                                    ) : <></>
                            )
                            : (block.lines.length > 0 ?
                                    block.lines.map(line =>
                                        <LineDisplay key={line.id} line={line}/>
                                    ) : <></>
                            )
                        }
                        {
                            block.isNews && <div className="news_date">{Number(block.createdAt.substring(8, 10)) + " " + monthList[Number(block.createdAt.substring(5, 7))] + " " + Number(block.createdAt.substring(0, 4))}</div>
                        }
                    </>
            }
        </div>
    );
})


export default Block;