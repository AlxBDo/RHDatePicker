import React from "react";
import PropTypes from "prop-types"
import CalendarSelect from "./CalendarSelect";

function TimeSelect(props){

    const { baseId, maxValue, minValue, name, onClickFunction, selectedValue } = props
    const list = Array(7).fill(selectedValue - 3)

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
    selectedValue: 0
}

TimeSelect.propTypes = {
    maxValue: PropTypes.number, 
    minValue: PropTypes.number, 
    name: PropTypes.string.isRequired,
    selectedValue: PropTypes.number
}

export default TimeSelect