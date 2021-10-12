/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControl, Select, InputLabel, MenuItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 300,
    maxWidth: 300,
    marginBottom: '1rem'
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export default function MultiSelect ({ optionArray, handleChange, selectedValues, idName, isDropdown }) {
  const classes = useStyles()
  return (
    <div style={{ marginTop: '7px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label" style={{ textTransform: 'capitalize' }}>{idName}</InputLabel>
        { isDropdown ? <Select
            labelId={`${idName}-label`}
            id={idName}
            style={{ marginRight: 20 }}
            name={idName}
            value={ selectedValues || ''}
            onChange={(e) => handleChange(e, idName)}
          >
            { optionArray.map((item, index) => {
              return <MenuItem key={`${item}_${index}`} value={item}>
                <ListItemText primary={item} />
              </MenuItem>
            })
            }
          </Select>
          : <Select
            labelId={`${idName}-label`}
            id={idName}
            multiple
            value={selectedValues}
            onChange={(e) => handleChange(e, idName)}
            input={<OutlinedInput label="" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {optionArray.map((name, index) => (
              <MenuItem key={`${name.id}_${index}`} value={name.dayName}>
                <Checkbox color='primary' checked={selectedValues.indexOf(name.dayName) > -1} />
                <ListItemText primary={name.dayName} />
              </MenuItem>
            ))}
          </Select>
        }
      </FormControl>
    </div>
  )
}
