import React from "react";
import FadingImg from "./FadingImg";
import "../../css/component_styles/Card.css";

/** 
 * Компонент линии вида "Карточка". Она содержит изображение (слева или справа) и часть с основным контентом.
 * 
 * Пример использования:
 * ```
    <Card 
        imgPos='left'
        imgType='fading'
        imgSrc={ImportedImage}
    >
        <StyledText>
            <h1>Title</h1>
            <p>Some content...</p>
        </StyledText>
    </Card>
 * ```
 * Данный код задаёт карточку с изображением ImportedImage, расположенным слева ("left"). 
 * У изображения будет установлен эффект исчезновения ("fading").
 * Контент передаётся как дочерние элементы.
 * 
 * Props:
 * @param {File | string} imgSrc - изображение, которое помещается в отведённое для него место (либо импортированное, либо путь к нему). Можно не указывать, если imgPos="none".
 * @param {"left" | "right"} imgPos - позиция изображения в карточке (top, right, bottom, left, none). imgPos="none" указывает на отсутствие изображения.
 * @param {"fading" | "rounded" | "normal"} imgType - тип изображения: fading - исчезающее, rounded - круглое, normal - без эффектов.
*/
class Card extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        className: '',
        imgPos: 'left',
        width: 12,
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div 
                className={`Card Card-${this.props.imgPos} Card-width_${this.props.width} ${this.props.className}`} 
                style={{...this.props.style}}
            >
                {
                    this.props.imgPos !== 'none' &&
                    
                    <div className={`Card-image Card-image-${this.props.imgPos}`}> 
                    <FadingImg
                        imgPos={this.props.imgPos}
                        imgSrc={this.props.imgSrc}
                    /> 
                    </div>
                }
                <div className={`Card-body Card-body-${this.props.imgPos}`}>
                    {
                        this.props.title && 
                        
                        <h1>{this.props.title}</h1>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Card;