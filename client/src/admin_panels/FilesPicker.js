import { useContext, useRef } from 'react';
import { selectFile } from '../additional_commands/commonPanelsFunctions';
import { Context } from "../index";
import Carusel from '../components/lines/Carusel';
import { Card } from 'react-bootstrap';
import '../css/page_styles/AdminPanel.css';


/**
 * Компонент для выбора файлов и картинок.
 * Поддерживает два поля для выбора: выбор локального файла и выбор из списка доступных на сервере файлов.
 * Показывает превью выбранных файлов.
 * Этот компонент можно использовать для выбора одной/нескольких картинок или одного/нескольких файлов.
 * 
 * @param {array | string} pickedFiles Текущие выбранные файл/файлы. Если файл один, то следует передавать строку с именем файла, если несколько - массив с именами
 * @param {function} setPickedFiles Callback сеттера текущих выбранных файлов
 * @param {boolean} isMultiple Доступен ли выбор нескольких файлов, иначе только одного
 * @param {boolean} isRequired Обязательно ли заполнение данного поля (т.е. файл необязательно выбирать)
 * @param {boolean} isImage Выбирается ли изображение, инчае любой файл
 */
const FilesPicker = ({ pickedFiles, setPickedFiles, isMultiple, isRequired, isImage }) => {
    
    const { block_store } = useContext(Context);
    const localPickerForm = useRef();
    const serverPickerForm = useRef();

    /**
     * Функция обработки файлов, выбранных пользователем.
     * Она асинхронная, так как требует отработки всех асинхронных функций загрузки файлов на сервер.
     * 
     * @param {array} rawFiles Простой массив имён выбранных файлов
     * @returns Массив обработанных сервером файлов, готовых для использования
     */
    const processFiles = async (rawFiles) => {
        const processedFiles = [];
        for (const file of rawFiles)
            processedFiles.push(await selectFile(file, block_store));

        return processedFiles;
    }

    /**
     * 
     * @returns Выбрал ли пользователь файл
     */
    const checkIsAnythingSelected = () => {
        return pickedFiles;
    }

    /**
     * 
     * @returns Проверка на режим выбора одного изображения
     */
    const checkIsSingleImage = () => {
        return checkIsAnythingSelected() && isImage && !isMultiple && (typeof pickedFiles === 'string');
    }
    
    /**
     * 
     * @returns Проверка на режим выбора нескольких изображений
     */
    const checkIsCarousel = () => {
        return checkIsAnythingSelected() && isImage && isMultiple && Array.isArray(pickedFiles);
    }

    /**
     * 
     * @returns Проверка на режим выбора одного файла
     */
    const checkIsSingleFile = () => {
        return checkIsAnythingSelected() && !isImage && !isMultiple && (typeof pickedFiles === 'string');
    }
    
    /**
     * 
     * @returns Проверка на режим выбора нескольких файлов
     */
    const checkIsMultipleFiles = () => {
        return checkIsAnythingSelected() && !isImage && isMultiple && Array.isArray(pickedFiles);
    }
    
    return (
        <Card 
            style={{border: 'none', borderRadius: 'var(--default_border_radius)', padding: '20px'}}  // FIXME: костыль, чтобы переопределить навязанные Bootstrap'ом стили
        >
            <div className='picker-forms-container'>
                <form 
                    ref={localPickerForm}
                    className='picker-forms-client'
                >  {/* Используем <form>, так как этот элемент обладает методом reset(), позволяющий очищать все дочерние <input> */}
                    <h5>Загрузить {isMultiple ? 'новые файлы' : 'новый файл'}</h5>
                    <input 
                        className="picture-getter"
                        type="file"
                        accept={isImage ? "image/*" : undefined}
                        multiple={isMultiple}
                        required={isRequired}
                        onChange={e => {
                            serverPickerForm.current.reset();  // Вызываем reset над формой ниже, чтобы очистить выбранный файл
                            processFiles(e.target.files).then(files => {
                                setPickedFiles(isMultiple ? files : files[0]);
                            });
                        }} 
                    />
                </form>
                
                <form 
                    ref={serverPickerForm}
                    className='picker-forms-server'
                >
                    <h5>Выбрать {isMultiple ? 'файлы' : 'файл'} с сервера</h5>
                    <select 
                        size="7"    
                        multiple={isMultiple}
                        onChange={e => {
                            localPickerForm.current.reset();  // Вызываем reset над формой выше, чтобы очистить выбранный файл 
                            const files = Array.from(e.target.selectedOptions).map(option => option.value);
                            setPickedFiles(isMultiple ? files : files[0]);
                        }}
                    >
                        {
                            block_store.allFiles.map((file, index) =>
                                <option 
                                    key={index}
                                    value={file.fileLink}
                                >
                                    {file.name}
                                </option>
                            )
                        }
                    </select>
                </form>
            </div>

            {/* Превью выбранных элементов */}
            {
                checkIsAnythingSelected() &&
                <h5>Выбранные файлы</h5>
            }
            {
                checkIsSingleImage() && 
                <img 
                    src={process.env.REACT_APP_API_URL + pickedFiles} 
                    className='single-image-preview'
                /> 
            }
            {
                checkIsCarousel() &&
                <Carusel photos={pickedFiles} addressFileType="local"/>
            }
            {
                checkIsSingleFile() &&
                <p>{pickedFiles}</p>
            }
            {
                checkIsMultipleFiles() &&
                pickedFiles.map((file, index) => <p key={index}>{file}</p>)  // TODO: сделать красивое отображение списка документов, а не просто в <p> 
            }
        </Card>
    );
}

export default FilesPicker;
