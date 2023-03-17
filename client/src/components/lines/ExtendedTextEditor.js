import React, {useState} from 'react';
import MDEditor, {commands} from "@uiw/react-md-editor";
import {blackText, blueText, greyText, redText} from "../additional_commands/textColoringCommands";
import { alignTextCenter, alignTextRight, alignTextLeft } from '../additional_commands/textAlignCommands';
import { removeTextBorder, setTextBorderColor } from '../additional_commands/textBorderCommands';
import { removeTextBackground, setTextBackgroundColor } from '../additional_commands/textBackgroundCommands';
import AlignLeftIcon from "../../local_assets/icons/align-left.svg";
import ColorChangeIcon from '../../local_assets/icons/color-fill.svg';
import BorderIcon from '../../local_assets/icons/border-style.svg';
import BackgroundIcon from '../../local_assets/icons/imagesearch-roller.svg';
import "../../css/component_styles/Editor.css"

const ExtendedTextEditor = ({text, setText}) => {

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
                        name: 'textColor',
                        groupName: 'textColor',
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
                        name: "textAlign",
                        groupName: "textAlign",    
                        buttonProps: {
                            'aria-label': "Изменить выравнивание выделенного текста",
                            'title': "Изменить выравнивание выделенного текста"
                        },
                        icon: (
                            <img style={{width: '12px', height: '12px'}} src={AlignLeftIcon} />
                        )
                    }
                ),
                commands.group([setTextBorderColor, removeTextBorder], 
                    {
                        name: "textBorderColor",
                        groupName: "textBorderColor",    
                        buttonProps: {
                            'aria-label': "Изменить цвет рамки выделенного текста",
                            'title': "Изменить цвет рамки выделенного текста"
                        },
                        icon: (
                            <img style={{width: '12px', height: '12px'}} src={BorderIcon} />
                        )
                    }
                ),
                commands.group([setTextBackgroundColor, removeTextBackground], 
                    {
                        name: "textBackgroundColor",
                        groupName: "textBackgroundColor",    
                        buttonProps: {
                            'aria-label': "Изменить цвет фона выделенного текста",
                            'title': "Изменить цвет фона выделенного текста"
                        },
                        icon: (
                            <img style={{width: '12px', height: '12px'}} src={BackgroundIcon} />
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
            }}
        />
    );
};

export default ExtendedTextEditor;