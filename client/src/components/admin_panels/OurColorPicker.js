import Select, { components } from 'react-select';
import { ourColorsOptions } from '../../consts/ourColorOptionsConsts';


const OurColorPicker = ({ type, isDisabled, onColorPick }) => {

    
    const getOurColors = () => {
        // TODO: вынести объявление наших цветов в едином хранилище для них
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