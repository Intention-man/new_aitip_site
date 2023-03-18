import React from "react";
import { ourColorsOptions } from "../../consts/ourColorOptionsConsts";

const ourTextColorsOptions = ourColorsOptions.filter(color => color.types.includes('text'));

/**
 * Функция, меняющие выделенную область текста
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
 * Созданные и переопределенные команды ExtendedTextEditor (в нем есть и другие команды, но они взяты в изначальном виде)
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