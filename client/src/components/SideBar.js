import React from 'react';
import '../css/component_styles/SideBar.css';

class SideBar extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        isSticky: false,
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