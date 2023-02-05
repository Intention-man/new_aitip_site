import '../css/component_styles/Block.css';

const BlockContainer = ({ children }) => {
    return (
        <div className="BlockContainer">
            { children }
        </div>
    );
}

export default BlockContainer;