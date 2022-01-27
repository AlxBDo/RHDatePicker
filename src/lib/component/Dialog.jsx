import React from "react"
import PropTypes from "prop-types"
 
import { DialogBox } from "../style"

function Dialog(props){
    const { children, dialogBoxId, htmlClass, displayBox, isModal, color, backgroundColor } = props
    return(
        <DialogBox 
            id={dialogBoxId && dialogBoxId} 
            $backgroundColor={backgroundColor}
            $color={color}
            $htmlClass={htmlClass && htmlClass} 
            $isDisplay={displayBox} 
            $isModal={isModal} 
        >
            {children && children}
        </DialogBox>
    )
}

Dialog.defaultProps = {
    isDisplay: false, 
    isModal: false
}

Dialog.propTypes = {
    dialogBoxId: PropTypes.string,
    htmlClass: PropTypes.string, 
    isDisplay: PropTypes.bool, 
    isModal: PropTypes.bool 
}

export default Dialog