import ColorBlueIcon from "../local_assets/icons/color-blue.svg";
import ColorRedIcon from "../local_assets/icons/color-red.svg";
import ColorGreyIcon from "../local_assets/icons/color-grey.svg";
import ColorBlackIcon from "../local_assets/icons/color-black.svg";


/**
 * Константы, содержащие общие цвета сайта. Представляет собой массив из объектов следующего вида:
 * 
 * @param {string} value Идентификатор цвета, должен совпадать с название цвета в CSS-файле
 * @param {string} label Название цвета для отображения пользователю
 * @param {string} icon Иконка текста
 * @param {array} types Типы контента, для которых может использоваться данный цвет (text, background, border)
 */
export const ourColorsOptions = [
    {value: null, label: 'Отсутствует', icon: ColorGreyIcon, types: ['background', 'border']},  // FIXME: загрузить иконку для отсутствия цвета
    {value: 'blue', label: 'Синий', icon: ColorBlueIcon, types: ['text', 'border']},
    {value: 'red', label: 'Красный', icon: ColorRedIcon, types: ['text', 'border']},
    {value: 'grey', label: 'Серый', icon: ColorGreyIcon, types: ['text', 'background', 'border']},
    {value: 'black', label: 'Чёрный', icon: ColorBlackIcon, types: ['text']},
];