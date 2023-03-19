import Select, { components } from 'react-select';
import { ourColorsOptions } from '../../consts/ourColorOptionsConsts';


/**
 * Компонент разворачивающегося списка с выбором цветов, указанных в константах сайта
 * 
 * Пропсы:
 * @param {string} type Тип контента, для которого выбирается цвет (text, background, border) 
 * @param {boolean} isDiabled Сделать ли данное поле неактивным (оно станет недоступным для выбора) 
 * @param {function} onColorPick Callback, который должен вызываться при изменении цвета. Получает значение выбранного цвета
 * @returns Компонент списка цветов
 */
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
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    minHeight: '27px',
                    height: '27px',
                    border: 'none'
                }),

                valueContainer: (provided, state) => ({
                    ...provided,
                    height: '27px',
                    padding: '0 6px 10px 2px'
                }),

                input: (provided, state) => ({
                    ...provided,
                    margin: '-3px',
                }),
                indicatorSeparator: state => ({
                    display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: '27px',
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