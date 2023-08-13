import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import "../../css/component_styles/Carusel.css"
import "../../css/component_styles/Block.css"
import vector from "../../local_assets/Vector.png"
import vector1 from "../../local_assets/Vector1.png"


const Carusel = ({photos, addressFileType, ratio, color}) => {
    if (photos && typeof photos === "string") {photos = [photos]}

    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    ratio = ratio || 16/9
    color = color || "blue"
    const ref = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);



    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function(e){
            setInterval(function(){
                const myElement = document.querySelector('.next')
                myElement.click()
            }, 5000)
        })
    }, []);

    useEffect(() => {  // Проверяем, вдруг изменился размер массива photos, и индекс слайда теперь выходит за пределы массива 
        if (Array.isArray(photos) && photos.length <= currentSlideNumber)
            setCurrentSlideNumber(photos.length - 1);  // Просто ставим индекс на последний слайд
    }, [photos]);

    const borderStyle = {
        width:`${window.innerWidth*0.5}px`, height: `${ratio * window.innerWidth*0.5}px`
    }

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
    }, []);

    return (
        <div className="carusel">
            <div className="slideshow-container BigImg">
                <div className="prev" onClick={() => setCurrentSlideNumber(prev => (prev > 0 ? prev-1 : photos.length-1))}><img src={vector} width="7" height="12"/></div>
                <div className="mySlides">
                    <img ref={ref} src={addressFileType === "global" ? photos[currentSlideNumber] : process.env.REACT_APP_API_URL + photos[currentSlideNumber]}/>
                </div>
                <div className="next" onClick={() => setCurrentSlideNumber(prev => (prev < photos.length-1 ? prev+1 : 0))}><img src={vector1} width="7" height="12"/></div>
            </div>
            <br/>
            {photos.length > 0 &&
                <div id="123" style={{textAlign: "center"}}>
                    {photos.map(photo =>
                    <span 
                        key={photos.indexOf(photo)}
                        className="dot"
                        style={{backgroundColor: (photos.indexOf(photo) === currentSlideNumber ? `var(--aitip_${color})` : "grey")}}
                        onClick={() => setCurrentSlideNumber(photos.indexOf(photo))}/>)}
            </div>}
        </div>
    );
};


export default Carusel;