import React from "react";
import './../css/component_styles/SideBar.css';
import ArrowUpIcon from '../local_assets/icons/arrow-up.svg';

class LinksPanel extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        links: [],
    }
    
    constructor(props) {
        super(props);

        this.state = {
            activeBlocks: ['0']
        };

        this.updateActiveBlocks = this.updateActiveBlocks.bind(this);
        this.navigateToBlock = this.navigateToBlock.bind(this);
    }    
    
    componentDidMount() {
        window.addEventListener('resize', this.updateActiveBlocks);
        window.addEventListener('scroll', this.updateActiveBlocks);
        this.updateActiveBlocks();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateActiveBlocks);
        window.removeEventListener('scroll', this.updateActiveBlocks);
    }

    updateActiveBlocks() {
        let newActiveBlocks = [];
        let activeBlocksOffsetTop = Number.MAX_SAFE_INTEGER;
        for (let i in this.props.links) {
            if (this.props.links[i].domNode) {
                const offsetTop = this.props.links[i].domNode.offsetTop;
                const height = this.props.links[i].domNode.clientHeight;
                if (offsetTop + Math.floor(height / 2) >= window.scrollY) {
                    if (offsetTop < activeBlocksOffsetTop) {
                        newActiveBlocks = [i];
                        activeBlocksOffsetTop = offsetTop;
                    } else if (offsetTop == activeBlocksOffsetTop) {
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

    navigateToBlock(event) {
        event.preventDefault();
        for (let link of this.props.links) {
            if (link.id == event.target.id && link.domNode) {
                link.domNode.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
        this.updateActiveBlocks();
    }

    goTop(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <>
            <div className="LinksPanel-linksContainer">
                {
                    this.props.links.map(x => 
                        <a 
                            id={x.id}
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