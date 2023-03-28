import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import Card from "../lines/Card";
import Carusel from "../lines/Carusel";
import BigImg from "../lines/BigImg";
import StyledText from '../lines/StyledText';

/**
 * Line display component. Depending on the line kind and other fields' values, draws line
 * @type {React.FunctionComponent<{readonly line?: *}>}
 * @param {object} line
 */

const LineDisplay = observer(({line}) => {
    // let [line, setLine] = useState({});
    //
    // useEffect(() => {
    //     setLine(currentLine)
    // }, []);
    // console.log((line.kind === 4) + (line.filesNames.length > 0) + line.addressFileType.length > 0)

    return (
        // TODO: желательно отрефакторить этот код, разнести этот контент в компоненты в самих линий

        <>
            {line !== undefined && line.hasOwnProperty("kind") &&
                <>
                    {(line.kind === 1 && line.text.length > 0 && line.text[0].length > 0) &&
                        <StyledText
                            line={line}
                        />
                    }

                    {(line.kind === 2 && (line.filesNames.length > 0)) && (line.addressFileType === "global" ?
                            <BigImg imgSrc={line.filesNames[0]}/> :
                            <BigImg imgSrc={process.env.REACT_APP_API_URL + line.filesNames[0]}/>
                    )
                    }

                    {(line.kind === 3 && (line.filesNames.length > 0) && (line.addressFileType.length > 0)) &&
                        <Card
                            imgType={line.params.imgType}
                            imgSrc={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]}
                            imgPos={line.params.side}>
                            <MDEditor.Markdown source={line.text} style={{whiteSpace: 'pre-wrap'}}/>
                        </Card>
                    }

                    {(line.kind === 4 && (line.filesNames.length > 0) && line.addressFileType.length > 0) &&
                        <Carusel photos={line.filesNames} addressFileType={line.addressFileType}
                                 ratio={line.params.ratio} color={line.params.color}></Carusel>
                    }

                    {(line.kind === 5 && (line.filesNames.length > 0)) &&
                        <iframe width="560" height="315"
                                src={"https://www.youtube.com/embed/" + line.filesNames[0].split("/")[3]}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    }
                    {(line.kind === 6 && (line.filesNames.length > 0)) &&
                        <div>
                            <a href={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]}
                               download target="_blank">Скачать документ</a>
                        </div>
                    }
                </>
            }
        </>
    );
});

export default LineDisplay;