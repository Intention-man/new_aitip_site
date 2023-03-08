import AlignLeftIcon from "../../local_assets/icons/align-left.svg";
import AlignRightIcon from "../../local_assets/icons/align-right.svg";
import AlignCenterIcon from "../../local_assets/icons/align-center.svg";

const changeAlignment = (state, api, alignment) => {
    const toReplace = state.selectedText
                                .replace('<alignRight>', '')
                                .replace('</alignRight>', '')
                                .replace('<alignCenter>', '')
                                .replace('</alignCenter>', '')
                                .replace('\n\n', '\n');
    switch (alignment) {
        case "left":
            api.replaceSelection(toReplace);
            break;
        case "right":
            api.replaceSelection(`<alignRight>${toReplace}</alignRight>`);
            break;
        case "center":
            api.replaceSelection(`<alignCenter>${toReplace}</alignCenter>`);
            break;
    }
}

export const alignTextCenter = {
    name: 'alignTextCenter',
    keyCommand: 'alignTextCenter',
    buttonProps: {
        'aria-label': 'Выровнять текст посередине',
        'title': 'Выровнять текст посередине'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={AlignCenterIcon} />
    ),
    execute: (state, api) => changeAlignment(state, api, "center"),
}

export const alignTextRight = {
    name: 'alignTextRight',
    keyCommand: 'alignTextRight',
    buttonProps: {
        'aria-label': 'Выровнять текст по правой стороне', 
        'title': 'Выровнять текст по правой стороне'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={AlignRightIcon} />
    ),
    execute: (state, api) => changeAlignment(state, api, "right"),
}

export const alignTextLeft = {
    name: 'alignTextLeft',
    keyCommand: 'alignTextLeft',
    buttonProps: {
        'aria-label': 'Выровнять текст по левой стороне',
        'title': 'Выровнять текст по левой стороне'
    },
    icon: (
        <img style={{width: '12px', height: '12px'}} src={AlignLeftIcon} />
    ),
    execute: (state, api) => changeAlignment(state, api, "left"),
}