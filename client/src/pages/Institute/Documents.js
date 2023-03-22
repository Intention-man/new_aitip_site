import React from 'react';
import "../../css/component_styles/DocumentList.css"
import "../../assets/fonts/font-awesome.min.css"
import doc_pic from "../../local_assets/document-text.png"
import "../../components/lines/DocumentLine"
import DocumentLine from "../../components/lines/DocumentLine";
const Documents = () => {
    let link = "676ea8fc-5daa-41f9-8327-621bc4d2c0dd.pdf"
    return (
        <div className="main_list">
            <h3>Важные документы</h3>
            {/*    <h3>Важные документы</h3>*/}
            {/*<div className="inner_block">*/}
            {/*    <a href={""} className="doc_block">*/}
            {/*        <img src={doc_pic} className="doc_pic"/>*/}
            {/*        <p className="doc_link">Приказ Министерства образования и науки РФ от 23 июля 2015 г. N 749"Об утверждении*/}
            {/*            Положения о порядке замещения должностей педагогических работников, относящихся к профессорско-преподавательскому составу"</p>*/}
            {/*    </a>*/}


            {/*<div>*/}
            {/*    <a href={""} className="doc_block">*/}
            {/*        <img src={doc_pic} className="doc_pic"/>*/}
            {/*        <p className="doc_link">Важный документ номер два</p>*/}
            {/*    </a>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <a href={""} className="doc_block">*/}
            {/*        <img src={doc_pic} className="doc_pic"/>*/}
            {/*        <p className="doc_link">Важный документ номер 3</p>*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*</div>*/}
            <DocumentLine fileLink={link}/>
        </div>
    );
};

export default Documents;
