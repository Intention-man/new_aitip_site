import { useContext, useRef } from 'react';
import { selectFile } from '../additional_commands/commonPanelsFunctions';
import { Context } from "../index";
import Carusel from '../components/lines/Carusel';
import '../css/page_styles/AdminPanel.css';


const FilesPicker = ({ pickedFiles, setPickedFiles, isMultiple, isRequired, isImage }) => {
    
    const { block_store } = useContext(Context);
    const localPickerForm = useRef();
    const serverPickerForm = useRef();

    const processFiles = async (rawFiles) => {
        const processedFiles = [];
        for (const file of rawFiles)
            processedFiles.push(await selectFile(file, block_store));

        return processedFiles;
    }

    const checkIsSingleImage = () => {
        return pickedFiles && isImage && !isMultiple && (typeof pickedFiles === 'string');
    }

    const checkIsCarousel = () => {
        return pickedFiles && isImage && isMultiple && Array.isArray(pickedFiles);
    }

    const checkIsSingleFile = () => {
        return pickedFiles && !isImage && !isMultiple && (typeof pickedFiles === 'string');
    }
    
    const checkIsMultipleFiles = () => {
        return pickedFiles && !isImage && isMultiple && Array.isArray(pickedFiles);
    }
    
    return (
        <>
            <h5>Загрузить {isMultiple ? 'новые файлы' : 'новый файл'}</h5>
            <form ref={localPickerForm}> {/* Используем <form>, так как этот элемент обладает методом reset(), позволяющий очищать все дочерние <input> */}
                <input 
                    className="picture-getter"
                    type="file"
                    accept={isImage ? "image/*" : undefined}
                    multiple={isMultiple}
                    required={isRequired}
                    onChange={e => {
                        serverPickerForm.current.reset();
                        processFiles(e.target.files).then(files => {
                            setPickedFiles(isMultiple ? files : files[0]);
                        });
                    }} 
                />
            </form>
            
            <h5>Выбрать {isMultiple ? 'файлы' : 'файл'} с сервера</h5>
            <form ref={serverPickerForm}>
                <select 
                    size="7"    
                    multiple={isMultiple}
                    onChange={e => {
                        localPickerForm.current.reset(); // Вызываем reset над формой выше, чтобы очистить выбранный файл 
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

            {/* Превью выбранных элементов */}
            {
                checkIsSingleImage() && 
                <img src={process.env.REACT_APP_API_URL + pickedFiles} /> 
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
                pickedFiles.map(file => <p>{file}</p>)       
            }
        </>
    );
}

export default FilesPicker;
