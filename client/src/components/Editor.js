import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';


const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: 'editorjs',

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
        header: {
            class: Header,
            /**
             * This property will override the common settings
             * That means that this tool will have only Marker and Link inline tools
             * If 'true', the common settings will be used.
             * If 'false' or omitted, the Inline Toolbar wont be shown
             */
            inlineToolbar: ['marker', 'link'],
            config: {
                placeholder: 'Header'
            },
            shortcut: 'CTRL+SHIFT+H'
        },
        list: {
            class: List,
            inlineToolbar: true
        }
    },

    onReady: () => {
        console.log('Editor.js is ready to work!')
    },
    onChange: (api, event) => {
        console.log('Now I know that Editor\'s content changed!', event)
    },

    autofocus: true,
    placeholder: 'Let`s write an awesome story!',
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],
})

editor.save().then((outputData) => {
    console.log('Данные статьи: ', outputData)
}).catch((error) => {
    console.log('Ошибка сохранения: ', error)
});

module.exports = {editor}