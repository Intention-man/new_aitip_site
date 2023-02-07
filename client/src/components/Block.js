import '../css/component_styles/Block.css';

/**
 * Компонент блока контента. 
 * 
 * Блок - это группа линий. Все переданные блоку линии располагаются на одном прямоугольнике, обособленном от других блоков. 
 * 
 * @param {string} linkName - имя данного блока, которое будет отображаться в виде ссылки в боковой панели с ссылками на все блоки страницы
 */
const Block = ({ children, linkName }) => {
    // FIXME: ставить проп в аттрибут элемента - это костыль ;(
    return (
        <div className="Block" linkname={linkName}>
            { children }
        </div>
    );
}

export default Block;