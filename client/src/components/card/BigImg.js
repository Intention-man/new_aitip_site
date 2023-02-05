import '../../css/component_styles/Block.css';


const BigImg = ({ imgSrc }) => {
    return (
        <img
            src={imgSrc}
            className='FadingImg-top-and-bottom BigImg'
        />
    );
}

export default BigImg;