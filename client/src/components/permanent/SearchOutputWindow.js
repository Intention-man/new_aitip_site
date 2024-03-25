import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "../../routes";
import "../../css/component_styles/Menu.css"
import search from "../../local_assets/search.svg"
import StyledText from "../lines/StyledText";


const SearchOutputWindow = observer(() => {
    const {block_store} = useContext(Context);
    // Что ввел пользователь
    const [searchInput, setSearchInput] = useState("");
    // Результаты поиска
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

    const showSearchResult = () => {
        findSuggestions();
        modal.style.display = "block";
    }

    // Главная функция. Ищем список вариантов (candidates)
    const findSuggestions = () => {
        const maxCandidateAmount = 15;
        let candidates = [];
        if (searchInput.length > 0) {
            // Ищем варианты среди названий страниц
            candidates = Array.from(publicRoutes
                .filter(route => route.name.toLowerCase().includes(searchInput)))
                .map(page => formPageCandidate(page))
            // Ищем варианты среди заголовков блоков
            let blockCandidates = Array.from(block_store.blocks.filter(block => block.header.toLowerCase().includes(searchInput)))
            candidates = candidates.concat(Array.from(blockCandidates.map(block =>
                formBlockCandidate(block)
            )))
            // Если вариантов меньше maxCandidateAmount ищем среди тестов в линиях
            if (candidates.length < maxCandidateAmount) {
                // Проверяем валидность линии
                let lineCandidates = Array.from(block_store.lines.filter(line =>
                    line.hasOwnProperty("text") && line.text !== null && line.text.length > 0 && line.text.some(t => t.toLowerCase().includes(searchInput))
                ))
                candidates = candidates.concat(Array.from(lineCandidates.map(line =>
                    formLineCandidate(line)
                )))
            }
        }
        setSuggestions(candidates.slice(0, maxCandidateAmount))
    }

    const formPageCandidate = (page) => {
        return {
            link: page.pageLink,
            display: page.name,
        }
    }

    const formBlockCandidate = (block) => {
        return {
            link: block.pageLink,
            display: pageNameByPageLink(block.pageLink) + " | " + block.header,
        }
    }

    const formLineCandidate = (line) => {
        const searchText = retrieveTextStart(line.text[0]);
        return {
            link: blockByLine(line).pageLink,
            display: <StyledText line={{...line, text: searchText}}/>
        }

    }

    const pageNameByPageLink = (pageLink) => {
        return Array.from(publicRoutes.filter(route => route.path === pageLink))[0].name
    }

    const blockByLine = (line) => {
        return Array.from(block_store.blocks.filter(block => block.id === line.blockId))[0]
    }

    const retrieveTextStart = (text) => {
        const minLen = 200
        if (text.length < minLen)
            return text

        let end = minLen - 1
        // Регулярка, чтобы остановиться на конце предложения
        while (end < text.length && !/[.!?]$/.test(text[end])) {
            end++
        }
        return text.slice(0, end + 1);
    }


    return (
        <div className="search-form">
            <form style={{height: "100%"}}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Поиск по сайту"
                    onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            showSearchResult();
                        }
                    }}
                />
                <div className="button_search" style={{}}
                     onClick={showSearchResult}>
                    <img src={search} width="25" height="25"/>
                </div>
            </form>
            <div id="myModal" className="search-output-modal">
                <div className="search-results-window">
                    {suggestions.length > 0
                        ?
                        suggestions.map(suggestion => (
                            <div className="search-output-modal-content">
                                <a href={suggestion.link}>
                                    {suggestion.display}
                                </a>
                                <br/>
                            </div>
                        ))
                        :
                        <div className="search-output-modal-content">
                            <h1>Ничего не найдено</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default SearchOutputWindow;