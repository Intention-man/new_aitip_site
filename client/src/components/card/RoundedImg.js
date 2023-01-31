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
const RoundedImg = ({imgSrc, size}) => {
    return (
        <div style={{padding: '50px'}}>
            <div 
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'cover',
                    borderRadius: '100%',
                    aspectRatio: '1 / 1',
                }}
            />
        </div>
    );
}

export default RoundedImg;
