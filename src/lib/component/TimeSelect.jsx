import React from "react";
import PropTypes from "prop-types"
import CalendarSelect from "./CalendarSelect";

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
    maxValue: PropTypes.number, 
    minValue: PropTypes.number, 
    name: PropTypes.string.isRequired,
    selectedValue: PropTypes.number
}

export default TimeSelect