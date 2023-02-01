import React, {useState} from "react";
import "../../../css/component_styles/Carusel.css"
import photo1 from "../../../local_assets/Content_3.png"
import photo2 from "../../../local_assets/Content.png"
import photo3 from "../../../local_assets/Content_2.png"
import photo4 from "../../../local_assets/Content_5.png"
import photo5 from "../../../local_assets/Content_6.png"
import photo6 from "../../../local_assets/Content_7.png"
import vector from "../../../local_assets/Vector.png"
import vector1 from "../../../local_assets/Vector1.png"



const AdmissionBacContent7 = () => {
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    let photos = [photo1, photo2, photo3, photo4, photo5, photo6]

    document.addEventListener('DOMContentLoaded', function(e){
        setInterval(function(){
            const myElement = document.querySelector('.next')
            myElement.click()
        }, 5000)
    })


    return (
        <div>
            <div className="slideshow-container">
                <div className="mySlides">
                    <img src={photos[currentSlideNumber]} style={{width: "100%"}}/>
                </div>

                <a className="prev" onClick={() => setCurrentSlideNumber(prev => (prev > 0 ? prev-1 : photos.length-1))}><img src={vector} style={{margin: "0"}} width="7" height="12"/></a>
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


export default AdmissionBacContent7;