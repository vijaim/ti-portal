/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  margin_LR: {
    marginLeft: '1rem',
    marginRight: '0rem',
    border: 'none'
    // cursor: 'pointer'
  },
  datePickerStyle: {
    width: 160,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '5%',
    cursor: 'pointer !important',
    '&:hover': {
      cursor: 'pointer !important'
    }
  }
}))

export default function DateRangePicker ({ dateValue, dateChange, disable, minimumDate }) {
  const classes = useStyles()
  return (
      <Fragment >
        <KeyboardDatePicker
          autoOk={true}
          value = {dateValue}
          variant="inline"
          readOnly = {disable}
          disableFuture
          format = "MMM-dd-yyyy"
          minDate={minimumDate}
          onChange={(newValue) => dateChange(newValue, 'dateRange')}
          className={[classes.margin_LR]}
          InputProps={{
            disableUnderline: true,
            className: [classes.datePickerStyle],
            disabled: true,
            style: { color: '#000', fontSize: '1.2rem', fontWeight: '500' }
          }}
          InputAdornmentProps={{ position: 'end' }}
        />
      </Fragment>
  )
}
