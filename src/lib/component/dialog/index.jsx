import React from "react"
import PropTypes from "prop-types"
import { DialogBox } from "../../style"


/**
 * Display DialogBox component 
 * @component 
 * @param {object} props
 * @param {object} props.children 
 * @param {string} props.dialogBoxId - define html attribute id 
 * @param {object} props.htmlClass - contains html classes to assign to component className attribute 
 * @param {boolean} displayBox - true is display 
 * @param {boolean} isModal - true is modal 
 * @param {string} color - define color 
 * @param {string} backgroundColor - define backgroundColor 
 * @param {string} name - use to styled component definition 
 * @param {boolean} longSize - true is long 
 * @returns {object} DialogBox
 */
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
            data-testid={dialogBoxId.indexOf("-calendar-modal") > 0 && "date-picker-calendar"} 
        >
            {children && children}
        </DialogBox>
    )
}

Dialog.defaultProps = {
    displayBox: false, 
    isModal: false
}

Dialog.propTypes = {
    dialogBoxId: PropTypes.string,
    htmlClass: PropTypes.string, 
    displayBox: PropTypes.bool, 
    isModal: PropTypes.bool, 
    color: PropTypes.string, 
    backgroundColor: PropTypes.string, 
    name: PropTypes.string, 
    longSize: PropTypes.bool
}

export default Dialog