import React from 'react';
import location from "../../local_assets/location.png";
import internet from "../../local_assets/global.png";
import phone from "../../local_assets/icons/svg white/Phone.svg";
import mail from "../../local_assets/sms.png";
import "../../css/component_styles/MobileFooter.css"
const MobileFooter = () => {
    return (
        <div>
            <footer>
                <div className="footer-container">
                    <ul>
                        <li><h3>Где нас найти?</h3></li>
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
                        <li>
                            <h3>Остались вопросы?</h3>
                        </li>
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
            </footer>
        </div>
    );
};

export default MobileFooter;