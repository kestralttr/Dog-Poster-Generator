import React from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'

const DropdownContainer = ({
    options=[],
    updateValue,
    value,
    className='breed-input__select',
    name,
    enableDisabledFunctionality
}) => {

    let isDisabled = false
    if (enableDisabledFunctionality) {
        isDisabled = options.length ? false : true
    }

    return (
        <FormControl
            className={className}
            disabled={isDisabled}
            sx={{
                opacity: isDisabled ? 0.8 : 1,
                width: '200px'
            }}
        >
            <InputLabel
                id="demo-simple-select-label"
                sx={{
                    backgroundColor: '#fff',
                    paddingRight: '3px'
                }}
            >
                {name}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Breed"
                onChange={(e) => {updateValue(e.target.value)}}
                variant="outlined"
            >
                {options.map((option) =>
                    <MenuItem key={uuidv4()} value={option}>{option}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default DropdownContainer