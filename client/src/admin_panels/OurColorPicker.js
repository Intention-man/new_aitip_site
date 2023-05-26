import Select, { components } from 'react-select';
import { ourColorsOptions } from '../consts/ourColorOptionsConsts';
import { useState } from 'react';


/**
 * Компонент разворачивающегося списка с выбором цветов, указанных в константах сайта
 * 
 * Пропсы:
 * @param {string} type Тип контента, для которого выбирается цвет (text, background, border, dots) 
 * @param {boolean} isDiabled Сделать ли данное поле неактивным (оно станет недоступным для выбора) 
 * @param {function} onColorPick Callback, который должен вызываться при изменении цвета. Получает значение выбранного цвета
 * @returns Компонент списка цветов
 */
const OurColorPicker = ({ type, isDisabled, onColorPick }) => {

    const getOurColors = () => {
        return ourColorsOptions.filter(e => e.types.includes(type));
    }

    const [selectedColor, setSelectedColor] = useState(getOurColors()[0].value);

    return (
        <Select
            defaultValue={getOurColors()[0]}
            options={getOurColors()}
            components={{ Option: IconOption }}
            classNames={{
                container: (state) => 'pretty_inputs',
            }}
            onChange={e => {
                setSelectedColor(e.value);
                onColorPick(e.value);
            }}
            isDisabled={isDisabled}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    border: '1px solid black',
                    boxShadow: 'none',
                    ':hover': {
                        boxShadow: '0 0 0 1px black',
                        borderColor: 'black',
                    },
                    ':target': {
                        boxShadow: '0 0 0 1px black',
                        borderColor: 'black',
                    }
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                }),
                input: (provided, state) => ({
                    ...provided,
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    ':before': {
                        backgroundColor: `var(--aitip_${selectedColor})`,
                        borderRadius: 10,
                        content: '" "',
                        display: 'block',
                        marginRight: 10,
                        height: 10,
                        width: 10,
                    }
                }),
                indicatorSeparator: state => ({
                    display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                }),
            }}
        />
    );
}

const { Option } = components;

const IconOption = props => (
    <Option {...props}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0 10px',
        }}>
            <img  // TODO: сделать это не изображениями, а с помощью svg/css, динамически устанавливающих свой цвет
                src={props.data.icon}
                style={{ width: 12 }}
                alt={props.data.label}
            />
            {props.data.label}
        </div>
    </Option>
);

export default OurColorPicker;