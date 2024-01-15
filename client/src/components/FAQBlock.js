import React from 'react';
import {observer} from "mobx-react-lite";
import "../../css/component_styles/FAQBlock.css"


// принимает объект, где ключи вопросы, а значения ответы
const FAQBlock = observer(({questions}) => {
    return (
        <div className="faq_container">
            <p className="title">Часто задаваемые вопросы</p>
            {Object.keys(questions).map((e, indx) =>
                <>
                    <p className="faq_question" onClick={()=>{
                        let answer = document.getElementById("faq_answer_"+indx);
                        let styles = answer.className;
                        if(styles.includes("hidden")) {
                            answer.className = answer.className.replace(/\s?hidden/, "");
                            answer.style.height = null;
                        }else {
                            answer.style.height = answer.children[0].clientHeight+"px";
                            answer.className += " hidden";
                        }
                    }}>{e}</p>
                    <div className="faq_answer_container" id={"faq_answer_"+indx}>
                        <p className="faq_answer">{questions[e]}</p>
                    </div>
                </>
            )}
        </div>
    );
});

export default FAQBlock;