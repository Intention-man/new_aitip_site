import Select, { components } from 'react-select';
import ColorBlueIcon from "../../local_assets/icons/color-blue.svg";
import ColorRedIcon from "../../local_assets/icons/color-red.svg";
import ColorGreyIcon from "../../local_assets/icons/color-grey.svg";
import ColorBlackIcon from "../../local_assets/icons/color-black.svg";


const OurColorPicker = ({ type, isDisabled, onColorPick }) => {

    
    const getOurColors = () => {
        // TODO: вынести объявление наших цветов в едином хранилище для них
        const ourColorsOptions = [
            {value: null, label: 'Отсутствует', icon: ColorGreyIcon, types: ['text', 'background', 'border']},  // FIXME
            {value: 'blue', label: 'Синий', icon: ColorBlueIcon, types: ['text', 'border']},
            {value: 'red', label: 'Красный', icon: ColorRedIcon, types: ['text', 'border']},
            {value: 'grey', label: 'Серый', icon: ColorGreyIcon, types: ['text', 'background', 'border']},
            {value: 'black', label: 'Чёрный', icon: ColorBlackIcon, types: ['text']},
        ];
        return ourColorsOptions.filter(e => e.types.includes(type));
    }

    return (
        <Select
            defaultValue={getOurColors()[0]}
            options={getOurColors()}
            components={{ Option: IconOption }}
            onChange={e => onColorPick(e.value)}
            isDisabled={isDisabled}
        />  
    );
}

const { Option } = components;

const IconOption = props => (
    <Option {...props}>
        <img
            src={props.data.icon}
            style={{ width: 12 }}
            alt={props.data.label}
        />
        {props.data.label}
    </Option>
);

export default OurColorPicker;