import React from 'react';
import doc_pic from "../../local_assets/document-text.png"
import "../../css/component_styles/DocumentList.css"
import "../../css/component_styles/Block.css"


const DocumentLine = ({documentLink, documentName}) => {
    return (
        <div className="main_list">
            <div className="inner_block">
                <a href={documentLink} className="doc_block" download target="_blank">
                    <img src={doc_pic} className="doc_pic"/>
                    <p className="doc_link">{documentName}</p>
                </a>
            </div>
        </div>
    );
};

export default DocumentLine;