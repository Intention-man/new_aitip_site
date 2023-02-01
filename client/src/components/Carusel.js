import React, {useState} from "react";
import "../css/component_styles/Carusel.css"
import vector from "../local_assets/Vector.png"
import vector1 from "../local_assets/Vector1.png"



const Carusel = ({photos, adressFileType}) => {
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    // const [photos, setPhotos] = useState([]);
    //
    // useEffect(() => {
    //
    // }, []);

    document.addEventListener('DOMContentLoaded', function(e){
        setInterval(function(){
            const myElement = document.querySelector('.next')
            myElement.click()
        }, 5000)
    })


    return (
        <div className="carusel">
            <div className="slideshow-container">
                <a className="prev" onClick={() => setCurrentSlideNumber(prev => (prev > 0 ? prev-1 : photos.length-1))}><img src={vector} style={{margin: "0"}} width="7" height="12"/></a>
                <div className="mySlides">
                    <img className="slide" src={adressFileType === "global" ? photos[currentSlideNumber] : process.env.REACT_APP_API_URL + photos[currentSlideNumber]} style={{width: "100%"}}/>
                </div>
                <a className="next" onClick={() => setCurrentSlideNumber(prev => (prev < photos.length-1 ? prev+1 : 0))}><img src={vector1} width="7" height="12"/></a>
            </div>
            <br/>

            <div style={{textAlign: "center"}}>
                {photos.map(photo =>
                    <span key={photos.indexOf(photo)} className="dot" style={{backgroundColor: (photos.indexOf(photo) === currentSlideNumber ? "blue" : "grey")}} onClick={() => setCurrentSlideNumber(photos.indexOf(photo))}/>
                )}
            </div>
        </div>
    );
};


export default Carusel;