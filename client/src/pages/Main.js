import React from 'react';

import {observer} from "mobx-react-lite";
import {createReactEditorJS} from 'react-editor-js'
import {EDITOR_JS_TOOLS} from '../components/tools'


const ReactEditorJS = createReactEditorJS()


const Main = observer(() => {

    const toSave = (data) => {
        console.log('Данные статьи: ', data)
    }


    return (
        <>
            <ReactEditorJS holder="custom" tools={EDITOR_JS_TOOLS}>
                <div id="custom"/>
                <button onClick={(data) => toSave(data)}>Сохранить данные</button>
            </ReactEditorJS>

        </>
    );
});

export default Main;
