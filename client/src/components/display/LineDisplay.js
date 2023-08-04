import React from 'react';
import {observer} from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import Card from "../lines/Card";
import Carusel from "../lines/Carusel";
import BigImg from "../lines/BigImg";
import StyledText from '../lines/StyledText';
import "../../css/component_styles/VideoWrapper.css"
import YTVideoWrapper from "../lines/YTVideoWrapper";
import DocumentLine from "../lines/DocumentLine";

/**
 * Line display component. Depending on the line kind and other fields' values, draws line
 * @type {React.FunctionComponent<{readonly line?: *}>}
 * @param {object} line
 */

const LineDisplay = observer(({line}) => {

    const getDocumentName = () => {
        return line.params !== null && line.params.hasOwnProperty("documentName") && line.params.documentName
    }

    const getImgType = () => {
        if (line.params !== null && line.params.imgType)
            return line.params.imgType;
        else
            return 'normal';
    }

    return (
        // TODO: желательно отрефакторить этот код, разнести этот контент в компоненты в самих линий

        <>
            {line.hasOwnProperty("kind") &&
                <>
                    {(line.kind === 1 && line.text.length > 0 && line.text[0].length > 0) &&
                        <StyledText
                            line={line}
                        />
                    }

                    {(line.kind === 2 && (line.filesNames.length > 0)) && (line.addressFileType === "global" ?
                            <BigImg imgSrc={line.filesNames[0]} imgType={getImgType()}/> :
                            <BigImg imgSrc={process.env.REACT_APP_API_URL + line.filesNames[0]} imgType={getImgType()}/>
                    )
                    }

                    {(line.kind === 3 && (line.filesNames.length > 0) && (line.addressFileType.length > 0)) &&
                        <Card
                            imgType={getImgType()}
                            imgSrc={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]}
                            imgPos={line.params.side}>
                            <MDEditor.Markdown source={Array.isArray(line.text) ? line.text[0] : line.text} style={{whiteSpace: 'pre-wrap'}}/>
                        </Card>
                    }

                    {(line.kind === 4 && (line.filesNames.length > 0) && line.addressFileType.length > 0) &&
                        <Carusel photos={line.filesNames} addressFileType={line.addressFileType} color={line.params.color} ratio={line.params.ratio}/>
                    }

                    {(line.kind === 5 && (line.filesNames.length > 0)) &&
                        <YTVideoWrapper relativeLink={line.filesNames[0]}/>
                    }
                    {(line.kind === 6 && (line.filesNames.length > 0)) &&
                        <DocumentLine documentLink={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]} documentName={getDocumentName()}/>
                    }
                </>
            }
        </>
    );
});

export default LineDisplay;