import React, {useEffect} from 'react';
import MDEditor, {commands} from "@uiw/react-md-editor";
import {getTextColorCommands} from "../../additional_commands/textColoringCommands";
import {alignTextCenter, alignTextLeft, alignTextRight} from '../../additional_commands/textAlignCommands';
import AlignLeftIcon from "../../local_assets/icons/align-left.svg";
import ColorChangeIcon from '../../local_assets/icons/color-fill.svg';
import "../../css/component_styles/Editor.css"


const ExtendedTextEditor = ({text, setText, changeLine, index}) => {

    useEffect(() => {
        console.log(text)
    }, [text]);

    return (
        <MDEditor
            highlightEnable={false}
            value={text}
            preview="edit"
            commands={[
                commands.bold, 
                commands.italic, 
                commands.group(getTextColorCommands(),
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
                if (setText)
                    setText(val);
                changeLine("text", val, index)
            }}
        />
    );
};

export default ExtendedTextEditor;