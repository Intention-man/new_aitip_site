import React, {useEffect, useState} from "react";
import "../css/component_styles/Carusel.css"
import vector from "../local_assets/Vector.png"
import vector1 from "../local_assets/Vector1.png"



const Carusel = ({photos, adressFileType, size, dotColor}) => {
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    // setInterval(() => {
    //     if (currentSlideNumber < photos.length-1) {
    //         setCurrentSlideNumber(prev => prev+1)
    //     }
    //     else {
    //         setCurrentSlideNumber(0)
    //     }
    // }, 7000)

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function(e){
            setInterval(function(){
                const myElement = document.querySelector('.next')
                myElement.click()
            }, 5000)
        })
    }, [])


    return (
        <div className="carusel">
            <div className="slideshow-container">
                <a className="prev" onClick={() => setCurrentSlideNumber(prev => (prev > 0 ? prev-1 : photos.length-1))}><img src={vector} style={{margin: "0"}} width="7" height="12"/></a>
                <div className="mySlides">
                    <img src={adressFileType === "global" ? photos[currentSlideNumber] : process.env.REACT_APP_API_URL + photos[currentSlideNumber]} width={window.innerWidth*0.5} height={size*window.innerWidth*0.5}/>
                </div>
                <a className="next" onClick={() => setCurrentSlideNumber(prev => (prev < photos.length-1 ? prev+1 : 0))}><img src={vector1} width="7" height="12"/></a>
            </div>
            <br/>

            <div id="123" style={{textAlign: "center"}}>
                {photos.map(photo =>
                    <span key={photos.indexOf(photo)} className="dot" style={{backgroundColor: (photos.indexOf(photo) === currentSlideNumber ? dotColor : "grey")}} onClick={() => setCurrentSlideNumber(photos.indexOf(photo))}/>
                )}
            </div>
        </div>
    );
};


export default Carusel;