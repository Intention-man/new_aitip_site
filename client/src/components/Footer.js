import React from 'react';
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/fonts/font-awesome.min.css"
import "../assets/fonts/simple-line-icons.min.css"
import "../assets/css/Animated-Menu-Icon.css"
import "../assets/css/Pretty-Footer-.css"



const Footer = () => {
    return (
        <div>
            <footer style={{background: "#076db1", position: "relative"}}>
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4 footer-contacts">
                        <h4 style={{color: "rgb(255,255,255)", fontSize: "15px", fontWeight: "bold"}}>Где нас найти?</h4>
                        <div style={{paddingRight: "0px", marginRight: "-24px", marginBottom: "8px"}}>
                            <i className="icon-location-pin footer-contacts-icon"/>
                            <p style={{paddingLeft: "0px", marginLeft: "4px", marginTop: "15px"}}/>город
                            Барнаул, улица Сизова, дом 28а<br/>
                        </div>
                        <div><i className="icon-globe footer-contacts-icon"/>
                            <p style={{fontSize: "12.5px", marginLeft: "8px"}}>aitip.ru - старая версия сайта</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 footer-contacts">
                        <h4 style={{color: "rgb(255,255,255)", paddingRight: "0px", fontSize: "15px", fontWeight: "bold"}}>Остались вопросы?</h4>
                        <div></div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                 viewBox="0 0 16 16" className="bi bi-telephone footer-contacts-icon"
                                 style={{marginTop: "-13px"}}>
                                <path
                                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                            </svg>
                            <p className="footer-center-info email text-start"
                               style={{fontSize: "12px", marginLeft: "17px"}}>8 (3852) 35-93-55<br/></p>
                        </div>
                        <div style={{marginTop: "-3px"}}><i className="fa fa-envelope-o footer-contacts-icon"
                                                            style={{marginLeft: "-10px", marginBottom: "4px", marginTop: "-5px", background: "#076db1"}}/>
                            <p style={{marginTop: "6px"}}><a href="#" target="_blank"
                                                             style={{fontSize: "12px", color: "rgb(255,255,255)", marginLeft: "-7px"}}>aitip@mail.ru</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;