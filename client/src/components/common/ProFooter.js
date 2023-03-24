import React from 'react';
import "../../css/component_styles/Footer.css"
import location from "../../local_assets/location.png"
import internet from "../../local_assets/global.png"
import phone from "../../local_assets/icons/svg white/Phone.svg"
import mail from "../../local_assets/sms.png"


function getHeight(){
    window.addEventListener('load', function() {
        // Дожидаемся полной загрузки страницы
        const body = document.body;
        const footer = document.querySelector('footer');
        const bodyHeight = body.offsetHeight;
        const footerHeight = footer.offsetHeight;
        console.log(bodyHeight - footerHeight)
        if (bodyHeight - footerHeight < 0.75 * window.innerHeight) {
            footer.style.position = 'fixed';
        } else {
            footer.style.position = 'relative';
        }
    });
}


const ProFooter = () => {
    return (
        <div>
            <footer className="main_footer" ref={getHeight}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Где нас найти?</h3>
                            <ul>
                                <li>
                                    <img src={location} width="20px" height="20px" style={{paddingRight: "2px"}}/>
                                    город Барнаул, улица Сизова, дом 28а
                                </li>
                                <li>
                                    <img src={location} width="20px" height="20px" style={{paddingRight: "2px"}}/>
                                    проспект Ленина, дом 23, каб. 219.
                                </li>
                                <li>
                                    <img src={internet} width="20px" height="18px" style={{paddingRight: "2px"}}/>
                                    <a href={"http://www.aitip.ru/"} style={{color: "white", textDecoration: "none"}}>aitip.ru - старая версия сайта</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <h3>Остались вопросы?</h3>
                            <ul>
                                <li>
                                    <img src={phone} width="30px" height="20px" style={{paddingRight: "2px"}}/>
                                    8 (3852) 35-93-55
                                </li>
                                <li>
                                    <img src={phone} width="30px" height="20px" style={{paddingRight: "2px"}}/>
                                    8 (3852) 22-80-04
                                </li>
                                <li>
                                    <img src={mail} width="30px" height="25px" style={{paddingRight: "2px"}}/>
                                    aitip@mail.ru
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProFooter;