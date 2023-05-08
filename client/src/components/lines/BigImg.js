import '../../css/component_styles/Block.css';

/**
 * Компонент картинки, которая заполняется всю линию и имеет эффект исчезновения сверху и снизу.
 *
 * @param {string} imgSrc - изображение (либо импортированное, либо путь к нему).
 * @param {string} imgType - исчезающее (по краям), либо обычное
 */
const BigImg = ({ imgSrc , imgType}) => {
    return (
        <img
            src={imgSrc}
            className={imgType === "fading" ? 'FadingImg-top-and-bottom BigImg' : "BigImg"}
        />
    );
}

export default BigImg;