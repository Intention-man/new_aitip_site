import '../../css/component_styles/Block.css';
import {useState} from "react";

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
            style={{objectFit: "contain"}}
        />
    );
}

export default BigImg;