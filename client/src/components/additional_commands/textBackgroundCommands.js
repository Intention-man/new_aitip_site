import PickColorIcon from '../../local_assets/icons/palette.svg';
import RemoveIcon from '../../local_assets/icons/delete.svg';
import { inputColor } from './textBorderCommands';

const changeBackgroundColor = (state, api, color) => {

}

const removeBackground = (state, api) => {
    
}

export const setTextBackgroundColor = {
    name: 'setTextBackgroundColor',
    keyCommand: 'setTextBackgroundColor',
    buttonProps: {
        'aria-label': 'Установить цвет фона выделенного текста',
        'title': 'Установить цвет фона выделенного текста'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={PickColorIcon} />
    ),
    execute: (state, api) => changeBackgroundColor(state, api, inputColor()),
}

export const removeTextBackground = {
    name: 'removeTextBackground',
    keyCommand: 'removeTextBackground',
    buttonProps: {
        'aria-label': 'Удалить фон у выделенного текста',
        'title': 'Удалить фон у выделенного текста'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={RemoveIcon} />
    ),
    execute: (state, api) => removeBackground(state, api),
}