import MDEditor from '@uiw/react-md-editor';
import "../../css/component_styles/StyledText.css"


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
        
        const backgroundColor = line.params !== null && line.params.backgroundColor;
        if (backgroundColor != null)
            className.push('StyledText-mdText-bg', `StyledText-mdText-bg-${backgroundColor}`)

        const borderColor = line.params !== null && line.params.borderColor;
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
                        data-color-mode="light"  /* Выключение установки тёмной темы MDEditor'ом */
                    >
                        <MDEditor.Markdown
                            className={getMarkdownClassname()}
                            source={columnText}
                            style={{
                                fontSize: 'var(--default_font_size)',
                            }}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default StyledText;