import MDEditor from '@uiw/react-md-editor';
import '../../css/component_styles/StyledText.css';


/**
 * Компонент линии текста, стилизованного с помощью Markdown.
 * Текст может быть разбит в несколько колонок, иметь цвет границы или фона.
 * 
 * @param {line} Объект линии (???) TODO 
 * @returns Компонент линии стилизованного текста
 */
const StyledText = ({ line }) => {
    
    
    const getMarkdownClassname = () => {
        const className = ['StyledText-mdText'];
        
        const backgroundColor = line.params[0];
        if (backgroundColor != null)
            className.push('StyledText-mdText-bg', `StyledText-mdText-bg-${backgroundColor}`)

        const borderColor = line.params[1];
        if (borderColor != null)
            className.push('StyledText-mdText-border', `StyledText-mdText-border-${borderColor}`);
        
        return className.join(' ');
    }

    return (
        <div className="StyledText-container">
            {
                line.text.map((columnText, i) =>
                    <div 
                        key={i}
                        className="StyledText-column"
                    >
                        <MDEditor.Markdown 
                            className={getMarkdownClassname()}
                            source={columnText} 
                            style={{whiteSpace: 'pre-wrap'}}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default StyledText;