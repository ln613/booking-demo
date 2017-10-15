import React from 'react';
import { ListItem } from 'material-ui/List';
import util from '../utils/util';

const styles = {
  primaryText: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  calendarIcon: {
    color: 'green',
    paddingTop: '40px'
  },
  line: {
    display: 'flex'
  },
  col1: {
    width: '75px',
    textAlign: 'right',
    marginRight: '20px',
  }
};

export default ({ booking, toggleBooking }) =>
  <ListItem
    primaryText={
      <div style={styles.line}>
        <div style={styles.col1}>{util.formatTime(booking.start)}</div>
        <div>{booking.eventName}</div>
      </div>
    }
    secondaryText={
      <div style={styles.primaryText}>
        <div style={styles.line}>
          <div style={styles.col1}>{util.formatTime(booking.end)}</div>
          <div>{booking.roomName}</div>
        </div>
        <div style={styles.line}>
          <div style={styles.col1}>{util.getDuration(booking)}</div>
        </div>
      </div>
    }
    secondaryTextLines={2}
    rightIcon={booking.selected ? <i className="fa fa-calendar-check-o" style={styles.calendarIcon}></i> : null}
    onClick={() => toggleBooking(booking)}
  />