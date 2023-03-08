import React, {useState} from 'react';
import MDEditor, {commands} from "@uiw/react-md-editor";
import {blackText, blueText, greyText, redText} from "../additional_commands/textColoringCommands";
import { alignTextCenter, alignTextRight, alignTextLeft } from '../additional_commands/textAlignCommands';
import AlignLeftIcon from "../../local_assets/icons/align-left.svg";
import ColorChangeIcon from '../../local_assets/icons/color-fill.svg';
import "../../css/component_styles/Editor.css"

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
            commands={[
                commands.bold, 
                commands.italic, 
                commands.group([blueText, redText, blackText, greyText],
                    {
                        name: 'Изменить цвет выделенного текста',
                        groupName: 'Изменить цвет выделенного текста',
                        buttonProps: {
                            'aria-label': 'Изменить цвет выделенного текста',
                            'title': 'Изменить цвет выделенного текста'
                        },
                        icon: (
                            <img style={{width: '12px', height: '12px'}} src={ColorChangeIcon} />
                        )
                    }
                ),
                commands.group([alignTextLeft, alignTextCenter, alignTextRight], 
                    {
                        name: "Изменить выравнивание выделенного текста",
                        groupName: "Изменить выравнивание выделенного текста",    
                        buttonProps: {
                            'aria-label': "Изменить выравнивание выделенного текста",
                            'title': "Изменить выравнивание выделенного текста"
                        },
                        icon: (
                            <img style={{width: '12px', height: '12px'}} src={AlignLeftIcon} />
                        )
                    }
                ),
                commands.divider,
                commands.link, 
                commands.quote, 
                commands.orderedListCommand, 
                commands.unorderedListCommand, 
                commands.checkedListCommand, 
                commands.hr,
            ]}
            extraCommands={[
                commands.fullscreen
            ]}
            onChange={(val) => {
                setText(val)
                changeLine("text", val, index)
            }}
        />
    );
};

export default ExtendedTextEditor;