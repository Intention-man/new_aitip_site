import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: {
        class: List,
        inlineToolbar: true
    },
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
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
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,

    autofocus: true,
    placeholder: 'Let`s write an awesome story!',
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],

}