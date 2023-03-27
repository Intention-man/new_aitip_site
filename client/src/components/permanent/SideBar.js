import React from 'react';
import '../../css/component_styles/SideBar.css';

/** 
 * Компонент боковой колонки.
 * Используется в `App.js` для задания боковых колонок слева и справа. 
 * 
 * Props:
 * @param {"left" | "right"} alignment - к какой части страницы прилегает колонка (к левой - "left", к правой - "right").
 * @param {boolean} isSticky - должен ли контент боковой колонки двигаться вместе с пользователем.
*/
class SideBar extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        alignment: 'left',
        isSticky: false
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SideBar-container sideBar">
                <div 
                    className={`SideBar-content 
                                SideBar-content-${this.props.alignment} 
                                SideBar-content-${this.props.isSticky ? "sticky" : "static"}`}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SideBar;