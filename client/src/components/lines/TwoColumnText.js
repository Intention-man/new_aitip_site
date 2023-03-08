import MDEditor from "@uiw/react-md-editor";
import '../../css/component_styles/TwoColumnText.css';


const TwoColumnText = ({leftColumnText, rightColumnText}) => {

    return (
        <div className="TwoColumnText-container">
            <div className="TwoColumnText-leftColumn">
                <MDEditor.Markdown 
                    source={leftColumnText} 
                    style={{whiteSpace: 'pre-wrap'}}
                />
            </div>
            <div className="TwoColumnText-rightColumn">
                <MDEditor.Markdown 
                    source={rightColumnText} 
                    style={{whiteSpace: 'pre-wrap'}}
                />
            </div>
        </div>
    );
}

export default TwoColumnText;