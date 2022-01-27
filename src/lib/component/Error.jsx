import React from "react";
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";

import Dialog from "./Dialog";
import { AdviceBox, ErrorBox } from "../style";
import { datePickerParams } from "../utils/datePickerParams";
import { validation } from "../utils/validation";
import { selectError } from "../utils/selectors";
import * as errorAction from "../features/error"


function Error(props){

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
                    case "id":
                        return "Only alphanumeric characters are allowed."
                    case "label":
                        return "Only alphanumeric characters, hyphen and apostrophe are allowed."
                    default: 
                        return "Impossible to determinate good format !"
                }
            },
    
            type: (expectedType) => `The expected type is ${expectedType.indexOf("-") < 0 ? expectedType : expectedType.split("-")[1]}`
    
        },
    
        get: (errorObj, key) => {
            if(errorObj.what && errorMessage[errorObj.why].problem && typeof errorMessage[errorObj.why].advice === "function"){
                return(
                    <ErrorBox key={key}>
                        {errorObj.what} {errorMessage[errorObj.why].problem} 
                        <AdviceBox>{errorMessage[errorObj.why].advice(errorObj.what)}</AdviceBox>
                    </ErrorBox>
                )
            }
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
    dialogBoxId: PropTypes.string
}

export default Error