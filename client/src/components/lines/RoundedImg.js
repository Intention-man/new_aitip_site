import '../../css/component_styles/Block.css'

/** 
 * Компонент круглой картинки.
 * 
 * Пример использования:
 * ```
    <RoundedImg
        imgSrc='path/to/img'
    />
 * ```
 * 
 * Props:
 * @param {Object | string} imgSrc - изображение (либо импортированное, либо путь к нему).
*/
const RoundedImg = ({ imgSrc, style }) => {
    return (
        <div className='RoundedImg'>
            <div
                className='RoundedImg-img'
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    ...style
                }}
            />
        </div>
    );
}

export default RoundedImg;
