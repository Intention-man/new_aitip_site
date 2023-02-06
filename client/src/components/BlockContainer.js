import '../css/component_styles/Block.css';
import ContentContext from './contexts/ContentContext';
import { useContext } from 'react';
import { findDOMNode } from 'react-dom';

const BlockContainer = ({ children }) => {    
    const setContent = useContext(ContentContext);  // Получаем callback из ContentContext для передачи текущих активных блоков

    const test = (element) => {
        const domNode = findDOMNode(element);
        if (domNode && domNode.children) {
            const newContent = [];
            for (const block of domNode.children) {
                const blockDomNode = findDOMNode(block);
                const blockLinkName = blockDomNode.getAttribute('linkname');
                newContent.push({
                    name: blockLinkName,
                    domNode: blockDomNode,
                    id: newContent.length
                });
            }
            setContent(newContent);
        }
    };
    
    return (
        <div className="BlockContainer" ref={test}>
            { children }
        </div>
    );
}

export default BlockContainer;