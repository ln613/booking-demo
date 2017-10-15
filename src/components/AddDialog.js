import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Input from './Input';

export default ({ add, toggle, open, change, err, clear }) =>
  <div>

    <Dialog
      title="Add Booking"
      actions={[
        <FlatButton label="OK" onClick={add} />,
        <FlatButton label="Cancel" onClick={toggle} />
      ]}
      modal={true}
      open={open || false}
      autoScrollBodyContent={true}
    >
      <Input title="Event Name" change={change} />
      <Input title="Room Name" change={change} />
      <Input title="Start Date" type="date" change={change} />
      <Input title="Start Time" type="time" change={change} />
      <Input title="End Date" type="date" change={change} />
      <Input title="End Time" type="time" change={change} />
    </Dialog>

    <Dialog
      title="Error"
      actions={[
        <FlatButton label="OK" onClick={clear} />,
      ]}
      modal={true}
      open={err || false}
    >
      {(err || []).map(x => <div>{x}</div>)}  
    </Dialog>

  </div>    
