import {useContext, useRef} from 'react';
import {selectFile} from '../additional_commands/commonPanelsFunctions';
import {Context} from "../index";
import Carusel from '../components/lines/Carusel';
import '../css/page_styles/AdminPanel.css';
import load from "../local_assets/icons/directbox-receive.svg"


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
const FilesPicker = ({pickedFiles, setPickedFiles, isMultiple, isRequired, isImage}) => {

    const {block_store} = useContext(Context);
    const localPickerForm = useRef();
    const serverPickerForm = useRef();
    const urlPickerForm = useRef();

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

    const isFilesAreLinks = () => {
        const file = (Array.isArray(pickedFiles) ? pickedFiles[0] : pickedFiles);
        return file && file.includes("/");
    }

    return (
        <>
            <div className='picker-forms-container'>
                <form
                    ref={localPickerForm}
                    className='picker-forms-client'
                >  {/* Используем <form>, так как этот элемент обладает методом reset(), позволяющий очищать все дочерние <input> */}
                    <h5>Загрузить {isMultiple ? 'новые файлы' : 'новый файл'}</h5>
                    <label className="file_chooser">
                        <input
                            className="picture-getter"
                            type="file"
                            accept={isImage ? "image/*" : undefined}
                            multiple={isMultiple}
                            required={isRequired}
                            onChange={e => {
                                serverPickerForm.current.reset();  // Вызываем reset над формой ниже, чтобы очистить выбранный файл
                                urlPickerForm.current.reset();
                                processFiles(e.target.files).then(files => {
                                    setPickedFiles(isMultiple ? files : files[0]);
                                });
                            }}
                        />
                        <p><img alt="" src={load}/><br/>{"Загрузить " + (isImage ? "изображение" : "файл")}</p>
                    </label>
                </form>
                
                <form 
                    ref={serverPickerForm}
                    className='picker-forms-server'
                >
                    <h5>Выбрать {isMultiple ? 'файлы' : 'файл'} с сервера</h5>
                    <label className="custom_select multiline_select">
                        <select
                            size="10"
                            multiple={isMultiple}
                            onChange={e => {
                                localPickerForm.current.reset();  // Вызываем reset над формой выше, чтобы очистить выбранный файл '
                                urlPickerForm.current.reset();
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
                    </label>
                </form>

                <form
                    ref={urlPickerForm}
                    className="picker-forms-url"
                >
                    <label>
                        <h5>Загрузить по ссылке</h5>
                        <input className="pretty_inputs" type="text"
                               placeholder={isMultiple ? "Введите одну или несколько ссылок разделённых \";\"" : "Введите ссылку на файл"}
                               value={isFilesAreLinks() ? isMultiple ? pickedFiles.join(";") : pickedFiles : ""}
                               onChange={(e) => {
                                   serverPickerForm.current.reset();
                                   localPickerForm.current.reset();
                                   const files = e.target.value.split(";").map(e => e.trim());
                                   setPickedFiles(isMultiple ? files : files[0])
                               }}/>
                    </label>
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
                    src={isFilesAreLinks() ? pickedFiles : process.env.REACT_APP_API_URL + pickedFiles}
                    className='single-image-preview'
                />
            }
            {
                checkIsCarousel() &&
                <Carusel photos={pickedFiles} addressFileType={isFilesAreLinks() ? "global" : "local"}/>
            }
            {
                checkIsSingleFile() &&
                <p>{pickedFiles}</p>
            }
            {
                checkIsMultipleFiles() &&
                pickedFiles.map((file, index) => <p key={index}>{file}</p>)  // TODO: сделать красивое отображение списка документов, а не просто в <p> 
            }
        </>
    );
}

export default FilesPicker;
