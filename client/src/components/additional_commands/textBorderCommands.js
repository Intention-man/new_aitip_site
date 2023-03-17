import PickColorIcon from '../../local_assets/icons/palette.svg';
import RemoveIcon from '../../local_assets/icons/delete.svg';

export const inputColor = () => {

}

const changeBorderColor = (state, api, color) => {

}


const removeBorder = (state, api) => {

}

export const setTextBorderColor = {
    name: 'setTextBorderColor',
    keyCommand: 'setTextBorderColor',
    buttonProps: {
        'aria-label': 'Установить цвет рамки выделенного текста',
        'title': 'Установить цвет рамки выделенного текста'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={PickColorIcon} />
    ),
    execute: (state, api) => changeBorderColor(state, api, inputColor()),
}

export const removeTextBorder = {
    name: 'removeTextBorder',
    keyCommand: 'removeTextBorder',
    buttonProps: {
        'aria-label': 'Удалить рамку вокруг текста',
        'title': 'Удалить рамку вокруг текста'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={RemoveIcon} />
    ),
    execute: (state, api) => removeBorder(state, api),
}