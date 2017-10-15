import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import util from '../utils/util';

export default ({ type, title, change }) => {
  const name = util.titleToName(title);
  const isDate = type === 'date';
  const isTime = type === 'time';

  const props = {
    floatingLabelText: title,
    onChange: (e, x) => change(name, (isDate || isTime) ? x : e.target.value),
  };

  return isDate ?
    <DatePicker {...props} />
    : (isTime ?
    <TimePicker {...props} />
    :
    <TextField {...props} />
  );
}

