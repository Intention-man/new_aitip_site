import MDEditor from '@uiw/react-md-editor';
import '../../css/component_styles/StyledText.css';


const StyledText = ({ line }) => {
    

    return (
        <div className="StyledText-container">
            {
                line.text.map((columnText, i) =>
                    <div 
                        key={i}
                        className="StyledText-column"
                    >
                        <MDEditor.Markdown 
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