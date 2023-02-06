import { useContext } from 'react';
import ContentContext from '../components/contexts/ContentContext';
import '../css/component_styles/Block.css';

const Block = ({ children, linkName }) => {
    return (
        <div className="Block" linkname={linkName}>
            { children }
        </div>
    );
}

export default Block;