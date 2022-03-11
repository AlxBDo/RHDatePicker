import React, { useEffect } from "react";
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux";

import Dialog from "../dialog";
import { AdviceBox, ErrorBox } from "../../style";
import { datePickerParams } from "../../utils/datePickerParams";
import { validation } from "../../utils/validation";
import { selectError } from "../../utils/selectors"; 
import { style } from "../../style"

/**
 * Display Dialog component containing error messages
 * @component 
 * @param {object} props 
 * @param {string} props.dialogBoxId - use for html attribute id 
 * @param {string} props.htmlClass - html class(es) to assign to component className attribute 
 * @returns {object} Dialog component
 */
function Error(props){

    const dispatch = useDispatch()
    const { dialogBoxId, htmlClass} = props
    const error = useSelector(selectError()); 

    /**
     * Provides error message to validation object
     */
    const errorMessage = { 
    
        allowed: {
    
            length: ({max, min}) => max !== min ? `Its length must be between ${min} and ${max} characters.` 
                                    : `Its length must be ${max} characters.`,
    
            format: (what) => {
                switch(what){
                    case "date":
                        return `Date must consist of numbers separated by hyphens : ${datePickerParams.format[dialogBoxId].placeholder} .`
                    case "dateTime":
                        return `Date and time must be separeted by a space and consist of numbers separated by hyphens (for date) 
                        or double point (for time) : ${datePickerParams.format[dialogBoxId].placeholder} .`
                    case "id":
                        return "Only alphanumeric characters are allowed."
                    case "label":
                        return "Only alphanumeric characters, hyphen and apostrophe are allowed."
                    case "time":
                        return `Time must consist of numbers separated by double point : ${datePickerParams.format[dialogBoxId].placeholder} .`
                    default: 
                        return "Impossible to determinate good format !"
                }
            },
    
            type: (expectedType) => `The expected type is ${expectedType.indexOf("-") < 0 ? expectedType : expectedType.split("-")[1]}`
    
        },
    
        get: (errorObj, key) => {
            if(errorObj.what && errorMessage[errorObj.why].problem && typeof errorMessage[errorObj.why].advice === "function"){
                return(
                    <ErrorBox key={key} $color={style.colors.error}>
                        {errorObj.what} {errorMessage[errorObj.why].problem} 
                        <AdviceBox $color={style.colors.advice}>{errorMessage[errorObj.why].advice(errorObj.what)}</AdviceBox>
                    </ErrorBox>
                )
            }
        },

        outOfBounds: {
            problem: "is out of bounds!",
            advice: () => `It's must be between ${datePickerParams.deadlines[dialogBoxId].min} and ${datePickerParams.deadlines[dialogBoxId].max}` 
        },
    
        tooLong: {
            problem: "is too long !",  
            advice: (what) => errorMessage.allowed.length(validation.allowedLength[what])
        },
    
        tooShort: {
            problem: "is too short !",  
            advice: (what) => errorMessage.allowed.length(validation.allowedLength[what])
        },
    
        wrongFormat: {
            problem: "is in wrong format !",  
            advice: (what) => errorMessage.allowed.format(what),
        },
    
        wrongType: {
            problem: "is in wrong type !",  
            advice: (what) => errorMessage.allowed.type(validation.allowedType[what])
        } 
    
    };

    useEffect( () => {
        import("../../features/error").then( errorAction => dispatch(errorAction.getErrors(dialogBoxId)) )
    }, [])

    return(
        <Dialog 
            dialogBoxId={`${dialogBoxId}-err-msg`} 
            htmlClass={ `hrnet-dp-error ${htmlClass && htmlClass}` } 
            displayBox={error.error[dialogBoxId] && error.status !== "empty" ? true : false} 
        >
            {error.error[dialogBoxId] && error.error[dialogBoxId].length > 0 
            && error.error[dialogBoxId].map((err, index) => err.what && (
                errorMessage.get(err, `error${index}`)
            ))}
        </Dialog>
    )

}

Error.propTypes = {
    dialogBoxId: PropTypes.string, 
    htmlClass: PropTypes.string 
}

export default Error