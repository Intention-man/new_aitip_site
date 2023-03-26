import React from 'react';
import doc_pic from "../../local_assets/document-text.png"
import "../../css/component_styles/DocumentList.css"
import "../../assets/fonts/font-awesome.min.css"
const DocumentLine = ({fileLink}) => {
    return (
        <div className="main_list">
            <div className="inner_block">
                <a href={process.env.REACT_APP_API_URL + fileLink} className="doc_block" download target="_blank">
                    <img src={doc_pic} className="doc_pic"/>
                    <p className="doc_link">Приказ Министерства образования и науки РФ от 23 июля 2015 г. N 749"Об утверждении
                        Положения о порядке замещения должностей педагогических работников, относящихся к профессорско-преподавательскому составу"</p>
                </a>
            </div>
        </div>
    );
};

export default DocumentLine;