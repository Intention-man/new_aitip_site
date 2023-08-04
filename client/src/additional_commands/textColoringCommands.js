/**
 * Команды для MDEdtior (он внутри компонента ExtendedTextEditor) для изменения цвета текста
 */
import React from "react";
import {ourColorsOptions} from "../consts/ourColorOptionsConsts";

const ourTextColorsOptions = ourColorsOptions.filter(color => color.types.includes('text'));

/**
 * Внутренняя функция, меняющая цвет текста из выделенной области с помощью HTML-тегов
 */
const changeColor = (state, api, color) => {
    if (state.selectedText) {
        let toReplace = state.selectedText.replace('\n\n', '\n');
        ourTextColorsOptions.forEach(e => {
            toReplace = toReplace
                            .replace(`<${e.value}>`, '')
                            .replace(`</${e.value}>`, '');
        });
        api.replaceSelection(`<${color}>${toReplace}</${color}>`);
    }
}               
                
/**
 * Функция для получения готового набора команд для измененя цвета текста.
 * Цвета берутся из определённого набора констант, задающих общие цвета на сайте.
 * 
 * @returns Массив из объектов команд для MDEditor, позволяющих менять цветы выделенного текста
 */
export const getTextColorCommands = () => {
    return ourTextColorsOptions
                    .filter(color => color.types.includes('text'))
                    .map(color => new Object({
                        name: `${color.value}Text`,
                        keyCommand: `${color.value}`,
                        buttonProps: `${color.label}`,
                        icon: (
                            <img src={color.icon} style={{width: '12px', height: '12px'}}/>
                        ),
                        execute: (state, api) => changeColor(state, api, color.value)
                    }));
}