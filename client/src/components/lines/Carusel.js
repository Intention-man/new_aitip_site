import React, {useEffect, useState} from "react";
import "../../css/component_styles/Carusel.css"
import vector from "../../local_assets/Vector.png"
import vector1 from "../../local_assets/Vector1.png"


const Carusel = ({photos, addressFileType, getRatio, color}) => {
    if (photos && typeof photos === "string") {photos = [photos]}
    console.log(photos);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    const [ratio, setRatio] = useState(getRatio ? getRatio : 1);
    const [dotColor, setDotColor] = useState(color ? color : "blue");


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
                    <img src={addressFileType === "global" ? photos[currentSlideNumber] : process.env.REACT_APP_API_URL + photos[currentSlideNumber]} width={window.innerWidth*0.5} height={ratio*window.innerWidth*0.5}/>
                </div>
                <a className="next" onClick={() => setCurrentSlideNumber(prev => (prev < photos.length-1 ? prev+1 : 0))}><img src={vector1} width="7" height="12"/></a>
            </div>
            <br/>

            {photos.length > 0 &&
                <div id="123" style={{textAlign: "center"}}>
                    {photos.map(photo =>
                    <span key={photos.indexOf(photo)} className="dot" style={{backgroundColor: (photos.indexOf(photo) === currentSlideNumber ? dotColor : "grey")}} onClick={() => setCurrentSlideNumber(photos.indexOf(photo))}/>)}
            </div>}
        </div>
    );
};


export default Carusel;