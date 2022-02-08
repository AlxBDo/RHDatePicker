import React from "react";
import PropTypes from "prop-types"
import CalendarSelect from "./CalendarSelect";

/**
 * Display time select for calendar form
 * @component
 * @param {object} props 
 * @param {string} props.baseId - date picker input id
 * @param {number} props.maxValue - maximum value that the select can display
 * @param {number} props.minValue - minimum value that the select can display
 * @param {string} props.name
 * @param {object} props.onClickFunction - function apply to select 
 * @param {boolean} props.reduceSize - true for small format   
 * @param {number} props.selectedValue - value display as selected 
 * @returns {object} 
 */ 
function TimeSelect(props){

    const { baseId, maxValue, minValue, name, onClickFunction, reduceSize, selectedValue } = props
    const list = reduceSize ? Array(3).fill(selectedValue - 1) : Array(7).fill(selectedValue - 3)
    
    return(
        <CalendarSelect 
            baseId={baseId} 
            className={"time-select"}
            list={list} 
            name={name} 
            onClickFunction={onClickFunction} 
            selectedValue={selectedValue} 
            maxValue={maxValue} 
            minValue={minValue} 
            spanOnClickFunction={true}
        />
    )

}

TimeSelect.defaultProps = {
    maxValue: 9,
    minValue: 0,
    reduceSize: false,
    selectedValue: 0
}

TimeSelect.propTypes = {
    baseId: PropTypes.string,
    maxValue: PropTypes.number, 
    minValue: PropTypes.number, 
    name: PropTypes.string.isRequired,
    onClickFunction: PropTypes.func.isRequired,
    reduceSize: PropTypes.bool,
    selectedValue: PropTypes.number
}

export default TimeSelect