import '../../css/component_styles/Card.css'

/** 
 * Компонент круглой картинки.
 * 
 * Пример использования:
 * ```
    <RoundedImg
        imgSrc='path/to/img'
        size={100}
    />
 * ```
 * Данный код задаёт круглую картинку с диаметром, равным 100 пикселям.
 * 
 * Props:
 * @param {Object | string} imgSrc - изображение (либо импортированное, либо путь к нему).
 * @param {number} size - размер картинки в `px` (диаметр круга).
*/
const RoundedImg = ({imgSrc, size}) => {
    return (
        <div 
            className="RoundedImg"
            style={{
                backgroundImage: `url(${imgSrc})`,
                width: `${size}px`,
                height: `${size}px`
            }}
        />
    );
}

export default RoundedImg;
