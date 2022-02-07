import React from "react"
import PropTypes from "prop-types"
 
import { DialogBox } from "../style"

function Dialog(props){
    const { children, dialogBoxId, htmlClass, displayBox, isModal, color, backgroundColor, name, longSize } = props
    return(
        <DialogBox 
            id={dialogBoxId && dialogBoxId} 
            className={htmlClass && htmlClass} 
            $backgroundColor={backgroundColor}
            $color={color}
            $name={name && name} 
            $isDisplay={displayBox} 
            $isModal={isModal} 
            $longSize={longSize}
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