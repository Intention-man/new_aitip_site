import React, {useState, useEffect} from 'react';
import location from "../../local_assets/location.png";
import internet from "../../local_assets/global.png";
import phone from "../../local_assets/icons/svg white/Phone.svg";
import mail from "../../local_assets/sms.png";
import "../../css/component_styles/Footer.css"
import Feedback from "./Feedback";

const Footer = () => {
    return (
        <footer className="aitip_footer">
            <div>
                <h3>Где нас найти?</h3>
                <div>
                    <img src={location} width="20px" height="20px" style={{paddingRight: "2px"}}/>
                    город Барнаул, улица Сизова, дом 28а
                </div>
                <div>
                    <img src={location} width="20px" height="20px" style={{paddingRight: "2px"}}/>
                    проспект Ленина, дом 23, каб. 219.
                </div>
                <div>
                    <img src={internet} width="20px" height="18px" style={{paddingRight: "2px"}}/>
                    <a href={"http://www.aitip.ru/"} style={{color: "white", textDecoration: "none"}}>aitip.ru -
                        старая версия сайта</a>
                </div>
            </div>
            <div>
                <div>
                    <h3>Остались вопросы?</h3>
                </div>
                <div>
                    <img src={phone} width="30px" height="20px" style={{paddingRight: "2px"}}/>
                    8 (3852) 35-93-55
                </div>
                <div>
                    <img src={phone} width="30px" height="20px" style={{paddingRight: "2px"}}/>
                    8 (3852) 22-80-04
                </div>
                <div>
                    <img src={mail} width="30px" height="25px" style={{paddingRight: "2px"}}/>
                    aitip@mail.ru
                </div>
            </div>
            <Feedback/>
        </footer>
    )
};

export default Footer;