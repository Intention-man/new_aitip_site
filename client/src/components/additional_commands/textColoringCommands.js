import React from "react";
import ColorBlackIcon from "../../local_assets/icons/color-black.svg";
import ColorRedIcon from "../../local_assets/icons/color-red.svg";
import ColorBlueIcon from "../../local_assets/icons/color-blue.svg";
import ColorGreyIcon from "../../local_assets/icons/color-grey.svg";

/**
* Функции, меняющие выделенную область текста
*/

function changeColor(state, api, color) {
    if (state.selectedText) {
        const toReplace = state.selectedText
                                    .replace('<blue>', '')
                                    .replace('</blue>', '')
                                    .replace('<red>', '')
                                    .replace('</red>', '')
                                    .replace('<grey>', '')
                                    .replace('</grey>', '')
                                    .replace('\n\n', '\n');
        switch (color) {
            case "black":
                api.replaceSelection(toReplace);
                break;
            case "blue":
                api.replaceSelection(`<blue>${toReplace}</blue>`);
                break;
            case "red":
                api.replaceSelection(`<red>${toReplace}</red>`);
                break;
            case "grey":
                api.replaceSelection(`<grey>${toReplace}</grey>`);
                break;
        }
    }
}

/**
 * Созданные и переопределенные команды ExtendedTextEditor (в нем есть и другие команды, но они взяты в изначальном виде)
 */


export const blackText = {
    name: 'blackText',
    keyCommand: 'black',
    buttonProps: {
        'aria-label': 'Чёрный цвет',
        'title': 'Чёрный цвет'
    },
    icon: (
        <img src={ColorBlackIcon} style={{width: '12px', height: '12px'}}/>
    ),
    execute: (state, api) => changeColor(state, api, "black"),
};

export const greyText = {
    name: 'greyText',
    keyCommand: 'grey',
    buttonProps: {
        'aria-label': 'Серый цвет',
        'title': 'Серый цвет'
    },
    icon: (
        <img src={ColorGreyIcon} style={{width: '12px', height: '12px'}}/>
    ),
    execute: (state, api) => changeColor(state, api, "grey"),
};

export const blueText = {
    name: 'blueText',
    keyCommand: 'blue',
    buttonProps: {
        'aria-label': 'Синий цвет',
        'title': 'Синий цвет'
    },
    icon: (
        <img src={ColorBlueIcon} style={{width: '12px', height: '12px'}}/>
    ),
    execute: (state, api) => changeColor(state, api, "blue"),
};

export const redText = {
    name: 'redText',
    keyCommand: 'red',
    buttonProps: {
        'aria-label': 'Красный цвет',
        'title': 'Красный цвет'
    },
    icon: (
        <img src={ColorRedIcon} style={{width: '12px', height: '12px'}}/>
    ),
    execute: (state, api) => changeColor(state, api, "red"),
};

// export const bold = {
//     name: 'bold',
//     keyCommand: 'bold',
//     shortcuts: 'ctrlcmd+b',
//     value: '**',
//     buttonProps: { 'aria-label': 'Add bold text (ctrl + b)', title: 'Add bold text (ctrl + b)' },
//     icon: (
//         <svg role="img" width="12" height="12" viewBox="0 0 384 512">
//             <path
//                 fill="currentColor"
//                 d="M304.793 243.891c33.639-18.537 53.657-54.16 53.657-95.693 0-48.236-26.25-87.626-68.626-104.179C265.138 34.01 240.849 32 209.661 32H24c-8.837 0-16 7.163-16 16v33.049c0 8.837 7.163 16 16 16h33.113v318.53H24c-8.837 0-16 7.163-16 16V464c0 8.837 7.163 16 16 16h195.69c24.203 0 44.834-1.289 66.866-7.584C337.52 457.193 376 410.647 376 350.014c0-52.168-26.573-91.684-71.207-106.123zM142.217 100.809h67.444c16.294 0 27.536 2.019 37.525 6.717 15.828 8.479 24.906 26.502 24.906 49.446 0 35.029-20.32 56.79-53.029 56.79h-76.846V100.809zm112.642 305.475c-10.14 4.056-22.677 4.907-31.409 4.907h-81.233V281.943h84.367c39.645 0 63.057 25.38 63.057 63.057.001 28.425-13.66 52.483-34.782 61.284z"
//             />
//         </svg>
//     ),
//
//     execute: (state, api) => {
//         if (state.selectedText) {
//             const currentText = state.selectedText
//             console.log(currentText)
//             let modifyText = `**${currentText}**`
//             api.replaceSelection(modifyText);
//         } else {
//             api.replaceSelection(`**  **`)
//         }
//     }
// };