import React from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import RoundedImg from "../../../components/lines/RoundedImg";
import test from "../../../local_assets/logo-noincome.png"

const SmallStafferItem = observer(({staffer}) => {
    return (
            <div className="block_content" style={{minWidth: "300px"}}>
                <RoundedImg imgSrc={test} style={{width: "90px", backgroundPosition: "center"}}
                     className="ava_img"/>
                <div>
                    <div> {staffer.name} </div>
                    <div> {staffer.post} </div>
                </div>
            </div>


    );
});

export default SmallStafferItem;