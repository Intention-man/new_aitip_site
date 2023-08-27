import React from 'react';
import "../../css/component_styles/VideoWrapper.css"


const YTVideoWrapper = ({relativeLink}) => {
    console.log(relativeLink.split("/")[3].split("=")[0])
    const last = relativeLink.split("/")[3];
    const usefulPart = last.includes("=") ? last.split("=")[1] : last
    return (
        <div className="video-wrapper">
            <iframe
                    src={"https://www.youtube.com/embed/" +  usefulPart}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
        </div>
    );
};

export default YTVideoWrapper;