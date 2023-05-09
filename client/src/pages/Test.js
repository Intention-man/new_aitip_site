import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "../routes";


const Test = observer(() => {
    const {block_store} = useContext(Context);
    // What user entered
    const [searchInput, setSearchInput] = useState("");
    // Our candidates (blocks and lines), depend on searchInput
    const [suggestions, setSuggestions] = useState([]);

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
            candidates = candidates.concat(Array.from(blockCandidates.map(block => ({type: "block", object: {...block}}))))
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


    return (
        <div>
            <input type="text" style={{width: "200px"}} placeholder="Поиск по сайту"
                   onChange={(e) => setSearchInput(e.target.value.toLowerCase())}/>
            <button style={{width: "200px"}} onClick={findSuggestions}>Найти</button>
            <div>
                {suggestions.length > 0 && suggestions.map((suggestion) => (
                    <>
                        {(() => {
                            switch (suggestion.type) {
                                case ("page"):
                                    return <a
                                        href={pageLinkByName(suggestion.name)}>{suggestion.name}</a>
                                case ("block"):
                                    return <a href={suggestion.object.pageLink}>{suggestion.object.header} ( {pageNameByLink(suggestion.object.pageLink)} )</a>
                                case ("line"):
                                    return <a
                                        href={linePageByLine(suggestion.object)}>{suggestion.object.id} ( {pageNameByLink(linePageByLine(suggestion.object))} )</a>
                                default: return <p>{suggestion.type}</p>
                            }
                        })()
                        }
                        {/*{suggestion.type === "block" ?*/}
                        {/*    <a href={suggestion.object.pageLink}>{suggestion.object.header} ( {pageNameByLink(suggestion.object.pageLink)} )</a>*/}
                        {/*    : <a href={linePage(suggestion.object)}>{suggestion.object.id} ( {pageNameByLink(linePage(suggestion.object))} )</a>*/}
                        {/*}*/}
                        <br/>
                    </>
                ))}
            </div>
        </div>
    );
});

export default Test;