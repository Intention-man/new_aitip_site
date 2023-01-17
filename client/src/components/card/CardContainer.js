import React from "react";
import '../../css/component_styles/Card.css';

class CardContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                className="CardContainer"
            >
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default CardContainer;