import '../../css/component_styles/Block.css';

/**
 * Компонент картинки, которая заполняется всю линию и имеет эффект исчезновения сверху и снизу.
 * 
 * @param {string} imgSrc - изображение (либо импортированное, либо путь к нему). 
 */
const BigImg = ({ imgSrc }) => {
    return (
        <img
            src={imgSrc}
            className='FadingImg-top-and-bottom BigImg'
        />
    );
}

export default BigImg;