import React, {useState} from 'react';
import MDEditor, {commands} from "@uiw/react-md-editor";
import "../../css/component_styles/Editor.css"
import {blackText, blueText, greyText, redText} from "../textColoringCommands";

const ExtendedTextEditor = ({text, setText, changeLine, index}) => {

    // const changeTextColorButtons = {
    //     "Черный": "own_black",
    //     "Серый": "own_grey",
    //     "Синий": "own_blue",
    //     "Красный": "own_red",
    // }


    return (
        <MDEditor
            value={text}
            preview="edit"
            commands={[commands.bold, commands.italic, commands.link, commands.quote, commands.orderedListCommand, commands.unorderedListCommand, commands.checkedListCommand, commands.hr,
                commands.group([blueText, redText, blackText, greyText],
                    {
                        name: 'Изменить цвет выделенного текста',
                        groupName: 'Изменить цвет выделенного текста',
                        buttonProps: {'aria-label': 'Изменить цвет выделенного текста'}
                    }
                )
            ]
            }
            extraCommands={[commands.fullscreen]}
            onChange={(val) => {
                setText(val)
                changeLine("text", val, index)
            }}
        />
    );
};

export default ExtendedTextEditor;