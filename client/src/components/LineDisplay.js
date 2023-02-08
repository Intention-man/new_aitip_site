import React from 'react';
import {observer} from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import Card from "./card/Card";
import Carusel from "./Carusel";


const LineDisplay = observer(({line}) => {
    return (
        <div>
            <div key={line.lineOrdinal}>
                {(line.kind === 1 && line.text.length > 0) &&
                    <MDEditor.Markdown source={line.text} style={{whiteSpace: 'pre-wrap'}}/>
                }

                {(line.kind === 2 && (line.filesNames.length > 0)) && (line.addressFileType === "global" ?
                        <img style={{width: "60%"}} src={line.filesNames[0]}/> :
                        <img style={{width: "60%"}} src={process.env.REACT_APP_API_URL + line.filesNames[0]}/>
                )
                }

                {(line.kind === 3 && (line.filesNames.length > 0) && (line.addressFileType.length > 0)) &&
                    <Card
                        imgType={line.params[0]}
                        imgSrc={line.addressFileType === "global" ? line.filesNames[0] : process.env.REACT_APP_API_URL + line.filesNames[0]}
                        imgPos={line.params[1]}>
                        <MDEditor.Markdown source={line.text} style={{whiteSpace: 'pre-wrap'}}/>
                    </Card>
                }

                {(line.kind === 4 && (line.filesNames.length > 0) && (line.addressFileType.length > 0) && line.params.length === 2) &&
                    <Carusel photos={line.filesNames} adressFileType={line.addressFileType}
                             params={line.params}></Carusel>
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
            </div>
        </div>
    );
});

export default LineDisplay;