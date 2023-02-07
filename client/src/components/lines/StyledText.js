import '../../css/component_styles/Block.css';

/**
 * Линия текстового контента. Она нужна для того, чтобы применять необходимые стили для текста.
 * 
 * Допустимые дочерние теги:
 * - `<p>`
 * - `<h1>`,`<h2>`,`<h3>`
 * - `<ul>`, `<ol>`, `<li>`
 */
const StyledText = ({ children }) => {
    return (
        <div className="StyledText">
            { children }
        </div>
    );
}

export default StyledText;