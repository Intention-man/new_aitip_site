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
*/
const RoundedImg = ({imgSrc}) => {
    return (
        // <div
        //     className="RoundedImg"
        //     style={{
        //         backgroundImage: `url(${imgSrc})`,
        //     }}
        // />
        <img
            className="RoundedImg"
            src={imgSrc}
        />
    );
}

export default RoundedImg;
