import React from 'react';

const YTVideoWrapper = ({relativeLink}) => {
    return (
        <div className="video-wrapper">
            <iframe width="560" height="315"
                    src={"https://www.youtube.com/embed/" + relativeLink.split("/")[3]}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
        </div>
    );
};

export default YTVideoWrapper;
