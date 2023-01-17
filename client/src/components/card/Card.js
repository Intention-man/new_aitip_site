import React from "react";
import FadingImg from "./FadingImg";
import "../../css/component_styles/Card.css";

/** 
 * Компонент карточки с закруглёнными углами и местом для изображения (опционально).
 * 
 * Пример использования:
 * ```
     <Card
        className="FeedbackPage-bigCard"
        title="Card title"
        imgSrc={ImportedImage}
        imgPos="left"
        width={3}
    >
        <p>Card text</p>
    </Card>
 * ```
 * Данный код задаёт карточку с заголовком "Card title", изображением ImportedImage, расположенным слева ("left"). 
 * Причём эта карточка при помещении её в CardContainer будет иметь ширину, равную 3-ём столбцам грида,
 * и у неё будет дополнительный CSS-класс `.FeedbackPage-bigCard`.
 * 
 * Props:
 * @param {string} className - CSS-класс для корневого div карточки.  
 * @param {string} title - заголовок карточки (помещается в стилизованный <h1>).
 * @param {File | string} imgSrc - изображение, которое помещается в отведённое для него место (либо импортированное, либо путь к нему). Можно не указывать, если imgPos="none".
 * @param {"left" | "right" | "top" | "bottom" | "none"} imgPos - позиция изображения в карточке (top, right, bottom, left, none). imgPos="none" указывает на отсутствие изображения.
 * @param {int} width - сколько столбцов грида должна занимать карточка (число от 1 до 12).
 * @param {Object} style - дополнительные стили
*/
class Card extends React.Component {
    // TODO: сделать компонент ColoredText, который будет брать цвет для текста из пропа primaryColor своей карточки

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

        // Для каждого расположения (top, right, bottom, left, none) определены особые стили в CSS-классах, оканчивающиеся на эти расположения
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