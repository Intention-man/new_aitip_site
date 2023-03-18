import ColorBlueIcon from "../local_assets/icons/color-blue.svg";
import ColorRedIcon from "../local_assets/icons/color-red.svg";
import ColorGreyIcon from "../local_assets/icons/color-grey.svg";
import ColorBlackIcon from "../local_assets/icons/color-black.svg";


export const ourColorsOptions = [
    {value: null, label: 'Отсутствует', icon: ColorGreyIcon, types: ['background', 'border']},  // FIXME
    {value: 'blue', label: 'Синий', icon: ColorBlueIcon, types: ['text', 'border']},
    {value: 'red', label: 'Красный', icon: ColorRedIcon, types: ['text', 'border']},
    {value: 'grey', label: 'Серый', icon: ColorGreyIcon, types: ['text', 'background', 'border']},
    {value: 'black', label: 'Чёрный', icon: ColorBlackIcon, types: ['text']},
];