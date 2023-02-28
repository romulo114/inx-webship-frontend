import React from "react";
import {MdStickyNote2} from "react-icons/md";

interface PropTypes {
    cellContext: any,
}

export const NoteColumn = ({cellContext}: PropTypes) => {

    return (
        <div className="flex justify-center">
            <MdStickyNote2 size="2em" color={'#65b32d'}/>
        </div>
    );
};