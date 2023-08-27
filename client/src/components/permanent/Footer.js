import React from 'react';
import location from "../../local_assets/location.png";
import internet from "../../local_assets/global.png";
import phone from "../../local_assets/icons/svg white/Phone.svg";
import mail from "../../local_assets/sms.png";
import "../../css/component_styles/Footer.css"
import Feedback from "./Feedback";

const Footer = () => {
    //FIXME при ширине экрана < 300 ширина подвала меньше ширины экрана //Отклонён, не воспроизводится
    return (
        <footer className="aitip_footer">
            <div className="footer-link-block">
                <p style={{fontSize: "23px", fontWeight: "bold"}}>Где нас найти?</p>
                <div>
                    <img src={location} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    город Барнаул, улица Сизова, дом 28а
                </div>
                <div>
                    <img src={location} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    проспект Ленина, дом 23, каб. 219.
                </div>
                <div>
                    <img src={internet} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    <a href={"http://www.aitip.ru/"} style={{color: "white", textDecoration: "none"}}>aitip.ru -
                        старая версия сайта</a>
                </div>
            </div>
            <div className="footer-link-block">
                    <p style={{fontSize: "23px", fontWeight: "bold"}}>Остались вопросы?</p>
                <div>
                    <img src={phone} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    8 (3852) 35-93-55
                </div>
                <div>
                    <img src={phone} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    8 (3852) 22-80-04
                </div>
                <div>
                    <img src={mail} width="30px" height="30px" style={{marginRight: "20px"}}/>
                    aitip@mail.ru
                </div>
            </div>
            <Feedback/>
        </footer>
    )
};

export default Footer;