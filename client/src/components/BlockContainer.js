import '../css/component_styles/Block.css';
import ContentContext from './contexts/ContentContext';
import { useContext } from 'react';
import { findDOMNode } from 'react-dom';

/**
 * Контейнер для всех блоков текущей страницы. Все блоки должны помещаться в этот контейнер. 
 * Помимо того, что этот контейнер определяет позиционирование блоков, он также служит интерфейсом между блоками страницы и боковой панелью с ссылками.
 */
const BlockContainer = ({ children }) => {    
    const updateLinksPanel = useContext(ContentContext);  // Получаем callback из ContentContext для передачи текущих активных блоков

    const setBlocksLinks = (element) => {
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
            updateLinksPanel(newContent);
        }
    };
    
    return (
        <div className="BlockContainer content" ref={setBlocksLinks}>
            { children }
        </div>
    );
}

export default BlockContainer;