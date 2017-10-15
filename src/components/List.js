import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Item from './Item';
import util from '../utils/util';

export default ({ group, index, toggleBooking, headerColor }) =>
  <List id={'group' + index}>
    <Subheader style={{ backgroundColor: headerColor }}>
      {group[0].map(util.formatDate).join(' - ')}
    </Subheader>
    
    {!group[1] ?
      <ListItem primaryText="You have no bookings for these dates." />
    : group[1].map((b, i) =>
      <div>
        <Item booking={b} toggleBooking={toggleBooking} />
        {i < group[1].length - 1 ? <Divider /> : null}
      </div>
    )}
  </List>
