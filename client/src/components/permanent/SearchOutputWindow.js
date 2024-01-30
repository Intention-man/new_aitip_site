import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "../../routes";
import "../../css/component_styles/Menu.css"


const SearchOutputWindow = observer(() => {
    const {block_store} = useContext(Context);
    // What user entered
    const [searchInput, setSearchInput] = useState("");
    // Our candidates (blocks and lines), depend on searchInput
    const [suggestions, setSuggestions] = useState([]);

    const modal = document.getElementById("myModal");
    const lines = document.getElementsByClassName("modal-line");
    for (let i = 0; i < lines.length; i++) {
        lines[i].onclick = function () {
            modal.style.display = "none";
        }
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // main function, defined candidates (no more than 10)
    const findSuggestions = () => {
        console.log(searchInput)
        // candidates - all suggestions
        let candidates = [];
        if (searchInput.length > 0) {
            // 1  - fill in the list with suitable page candidates (by name)
            candidates = Array.from(publicRoutes.filter(route => route.name.includes(searchInput))).map(page => ({
                type: "page",
                name: page.name
            }))
            // 2 - block candidates (by header)
            let blockCandidates = Array.from(block_store.blocks.filter(block => block.header.toLowerCase().includes(searchInput)))
            console.log(blockCandidates)
            // formalize candidate-object for every block (necessary to display)
            candidates = candidates.concat(Array.from(blockCandidates.map(block => ({
                type: "block",
                object: {...block}
            }))))
            console.log(candidates)
            // if found < 10 suited blocks - continue search among lines (by text)
            if (candidates.length < 10) {
                // take line, one of which text element includes substring (searchInput)
                let lineCandidates = Array.from(block_store.lines.filter(line =>
                    line.hasOwnProperty("text") && line.text !== null && line.text.length > 0 && line.text.some(t => t.toLowerCase().includes(searchInput))
                ))
                // formalize final list of candidates
                candidates = candidates.concat(Array.from(lineCandidates.map(line => ({
                    type: "line",
                    object: {...line}
                }))))
                console.log("lineCandidates: " + lineCandidates)
                // else - stop search
            }
            candidates.slice(10)

        }
        console.log(candidates)
        setSuggestions(candidates)
    }

    // return relative link to line Page
    const linePageByLine = (line) => {
        return (Array.from(block_store.blocks.filter(block => block.id === line.blockId))[0]).pageLink
    }

    // return name of block page
    const pageNameByLink = (pageLink) => {
        return (Array.from(publicRoutes.filter(route => route.path === pageLink))[0]).name
    }

    const pageLinkByName = (pageName) => {
        return (Array.from(publicRoutes.filter(route => route.name === pageName))[0]).path
    }

    const showSearchResult = () => {
        findSuggestions();
        modal.style.display = "block";
    }

    return (
        <>
            <div
                className="Search ya-site-form ya-site-form_inited_no"
                data-bem="{&quot;action&quot;:&quot;https://yandex.ru/search/site/&quot;,&quot;arrow&quot;:false,&quot;bg&quot;:&quot;transparent&quot;,&quot;fontsize&quot;:16,&quot;fg&quot;:&quot;#000000&quot;,&quot;language&quot;:&quot;ru&quot;,&quot;logo&quot;:&quot;rb&quot;,&quot;publicname&quot;:&quot;Поиск по сайту&quot;,&quot;suggest&quot;:true,&quot;target&quot;:&quot;_self&quot;,&quot;tld&quot;:&quot;ru&quot;,&quot;type&quot;:2,&quot;usebigdictionary&quot;:true,&quot;searchid&quot;:2954639,&quot;input_fg&quot;:&quot;#000000&quot;,&quot;input_bg&quot;:&quot;#ffffff&quot;,&quot;input_fontStyle&quot;:&quot;italic&quot;,&quot;input_fontWeight&quot;:&quot;normal&quot;,&quot;input_placeholder&quot;:&quot;Текст запроса...&quot;,&quot;input_placeholderColor&quot;:&quot;#000000&quot;,&quot;input_borderColor&quot;:&quot;#0066cc&quot;}"
            >
                    <form action="https://yandex.ru/search/site/" method="get" target="_self" acceptCharset="utf-8">
                        <input type="hidden" name="searchid" defaultValue={2954639} />
                        <input type="hidden" name="l10n" defaultValue="ru" />
                        <input type="hidden" name="reqenc" defaultValue />
                        <input className="Search-input" type="search" name="text" />
                        <input className="Search-submit" type="submit" defaultValue="Найти" />
                    </form>
            </div>
            <style type="text/css" dangerouslySetInnerHTML={{__html: ".ya-page_js_yes .ya-site-form_inited_no { display: none; }" }} />
        </>
        // <div className="search-form">
        //     <form style={{height: "100%"}}>
        //         <input
        //             className="search-input"
        //             type="text"
        //             placeholder="Поиск по сайту"
        //             onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        //             onKeyDown={(e) => {
        //                 if (e.key == 'Enter') {
        //                     e.preventDefault();
        //                     showSearchResult();
        //                 }
        //             }}
        //         />
        //         <div className="button_search" style={{cursor: "default"}}
        //              onClick={showSearchResult}>
        //             <img src={search} width="25" height="25"/>
        //         </div>
        //     </form>
        //     <div id="myModal" className="search-output-modal">
        //         {suggestions.length > 0 && suggestions.map((suggestion) => (
        //             <div className="search-output-modal-content">
        //                 {(() => {
        //                     switch (suggestion.type) {
        //                         case ("page"):
        //                             return <a
        //                                 href={pageLinkByName(suggestion.name)}>{suggestion.name}</a>
        //                         case ("block"):
        //                             return <a
        //                                 href={suggestion.object.pageLink}>{suggestion.object.header} ( {pageNameByLink(suggestion.object.pageLink)} )</a>
        //                         case ("line"):
        //                             return <a
        //                                 href={linePageByLine(suggestion.object)}>{suggestion.object.id} ( {pageNameByLink(linePageByLine(suggestion.object))} )</a>
        //                         default:
        //                             return <p>{suggestion.type}</p>
        //                     }
        //                 })()
        //                 }
        //                 <br/>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
});

export default SearchOutputWindow;