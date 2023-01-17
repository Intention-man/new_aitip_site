import React from 'react';
import "../css/component_styles/menuStyles.css"
import "../assets/fonts/font-awesome.min.css"
import logotip from "../local_assets/Logo (1).png"
import search from "../local_assets/search.png"

function myFunction() {
    const x = document.getElementById("myTopnav");
    const y = document.getElementById("myMenu");
    const l = document.getElementById("Logo");
    const c = document.getElementById("Kostyl");
    if (x.className === "topnav" || l.className === "logo" || c.className === "crunch"
    )
    {
        x.className += " responsive";
        y.className += " responsive";
        l.className += " responsive";
        c.className += " responsive"
    }
    else
    {
        x.className = "topnav";
        y.className = "bottom_menu";
        l.className = "logo";
        c.className = "crunch"
    }
}


const Menu = () => {
    return (
        <div>
            <img className="logo" id="Logo" src={logotip}/>
            <div className="topnav" id="myTopnav">
                <a className="crunch" id="Kostyl">Алтайский институт труда и права</a>
                <a>
                    <form>
                        <button className="button-fake" style={{cursor: "text"}}>
                            <img src={search} width="25" height="25"/>
                        </button>
                        <input type="text" placeholder="Поиск по сайту"/>
                        <button className="button_search" type="submit"></button>
                    </form>
                </a>
                <a>
                    <button className="blindversion">
                        Версия для слабовидящих
                        <i className="fa fa-eye" style={{color: "white", paddingLeft: "10px"}}/>
                    </button>
                </a>
                <a className="icon" onClick={() => myFunction()}>
                    <i className="fa fa-bars"/>
                </a>
            </div>
            <div className="bottom_menu" id="myMenu">
                <a href="#">Об институте<span className="fa fa-angle-down" style={{color: "#AD4820"}}></span></a>
                <a href="#">Поступление<span className="fa fa-angle-down" style={{color: "#AD4820"}}></span></a>
                <a href="#">Студентам<span className="fa fa-angle-down" style={{color: "#AD4820"}}></span></a>
                <a href="#">Сотрудникам<span className="fa fa-angle-down" style={{color: "#AD4820"}}></span></a>
                <a href="#">Наука<span className="fa fa-angle-down" style={{color: "#AD4820"}}></span></a>
                <a href="#">Партнёры<span className="fa fa-angle-right" style={{color: "#AD4820"}}></span></a>
            </div>
        </div>
    )}

export default Menu;