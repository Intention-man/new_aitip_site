import React from "react";
import './../../css/component_styles/SideBar.css';
import ArrowUpIcon from '../../local_assets/icons/arrow-up.svg';

/** 
 * Компонент списка ссылок на блоки текущей страницы.
 * Используется в `App.js`. 
 * 
 * Props:
 * @param {Array} links - массив из объектов, содержащих DOM-ноды блоков страницы, чтобы ссылаться на них.  
*/
class LinksPanel extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        links: [],
    }
    
    constructor(props) {
        super(props);

        this.state = {
            activeBlocks: ['0']  // Индексы текущих активных блоков (в виде строки). По умолчанию, активен первый блок (индекс: '0').
        };

        this.updateActiveBlocks = this.updateActiveBlocks.bind(this);
        this.navigateToBlock = this.navigateToBlock.bind(this);
    }    
    

    /**
     * Метод для обновления активных блоков
     */
    updateActiveBlocks() {
        let newActiveBlocks = [];  // Сюда будут записаны новые индексы активных блоков, которые будут перезаписаны 
        let activeBlocksOffsetTop = Number.MAX_SAFE_INTEGER;  // Y-координата текущего активного блока (первоначально ставим бесконечность)
        for (let i in this.props.links) {
            if (this.props.links[i].domNode) {  // Проверка на undefined, чтобы избежать ошибок
                const offsetTop = this.props.links[i].domNode.offsetTop;  // Вычисляем Y-координату
                const height = this.props.links[i].domNode.clientHeight;  // Высота окна пользователя
                if (offsetTop + Math.floor(height / 2) >= window.scrollY) {  // Провека, находится ли блок в области просмотра
                    // В качестве активных берём те блоки c наименьшей Y-координатой среди тех, Y-координата которых входит в текущую область просмотра
                    if (offsetTop < activeBlocksOffsetTop) {
                        newActiveBlocks = [i];
                        activeBlocksOffsetTop = offsetTop;
                    } else if (offsetTop === activeBlocksOffsetTop) {
                        newActiveBlocks.push(i);
                    }
                }
            }
        }
        if (newActiveBlocks.length > 0) {
            this.setState({
                activeBlocks: newActiveBlocks
            });
        }
    }

    /**
     * Метод для автоматического скроллинга к нажатому пользователем блоку
     */
    navigateToBlock(event) {
        event.preventDefault();  // Отключить дефолтный переход по ссылке 
        for (let link of this.props.links) {  // Поиск кликнутого блока
            if (link.id.toString() === event.target.id && link.domNode) {
                link.domNode.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
        this.updateActiveBlocks();
    }

    /**
     * Метод для перехода наверх страницы
     */
    goTop(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        // Обновить активные блоки нужно при изменении размеров страницы или скроллинге
        window.addEventListener('resize', this.updateActiveBlocks);
        window.addEventListener('scroll', this.updateActiveBlocks);
        this.updateActiveBlocks();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.updateActiveBlocks();
    // }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateActiveBlocks);
        window.removeEventListener('scroll', this.updateActiveBlocks);
    }


    render() {

        return (
            <>
            <div className="LinksPanel-linksContainer">
                {
                    this.props.links.map(x => 
                        <a 
                            id={x.id}
                            key={x.id}
                            className={`LinksPanel-link 
                                        ${this.state.activeBlocks.includes(`${x.id}`) ? "LinksPanel-linkActive" : "LinksPanel-linkStill"}`} 
                            href=""
                            onClick={this.navigateToBlock}
                            title={x.name}  /* Специальный аттрибут, содержащий текст. 
                                               Нужен для костыля в CSS, исправляющего ненужное изменение размеров, когда текст в ссылке становится жирным. */
                        >
                            {x.name}
                        </a>
                    )
                }
            </div>
            <a className="LinksPanel-goTopBtn" onClick={this.goTop} href="">
                <span className="LinksPanel-goTopBtn-text">Наверх</span>
                <img className="LinksPanel-goTopBtn-icon" src={ArrowUpIcon}/>
            </a>
            </>
        );
    }
}

export default LinksPanel;