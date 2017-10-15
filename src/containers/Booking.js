import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import actions from '../actions/bookingActionCreators';
import AddDialog from '../components/AddDialog';
import SearchBar from '../components/SearchBar';
import ToolBar from '../components/ToolBar';
import List from '../components/List';
import util from '../utils/util';
import $ from 'jquery';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';

const datepickerHeight = 280;
const toolBarHeight = 56;
const buttonHeight = 36;
const headerColor = '#F5F5F5';
const buttonHoverColor = '#E5E5E5';

const styles = {
  onTop: {
    position: 'fixed',
    zIndex: 1002,
    width: '100%'
  },
  paddingTop1: {
    paddingTop: toolBarHeight + 'px',
  },
  paddingTop2: {
    paddingTop: (datepickerHeight + toolBarHeight) + 'px',
  },
  datePicker: () => ({
    ...styles.onTop,
    ...styles.paddingTop1,
    zIndex: 1001,
  }),
  list: open => ({
    ...(open ? styles.paddingTop2 : styles.paddingTop1),
    paddingBottom: buttonHeight + 'px',    
  }),
  atBottom: {
    position: 'fixed',
    bottom: 0,
    zIndex: 1002,
  },
};

class Booking extends React.Component {
  componentWillMount() {
    this.props.loadBookings();
  }

  componentWillReceiveProps(p) {
    if (!p.booking.datePickerOpened && this.props.booking.datePickerOpened)
      $('#datepicker').datepicker('remove');
  }

  pickDate = () => {
    const booking = this.props.booking;
    if (booking.datePickerOpened) {
      $('#datepicker').datepicker('remove');
    }
    else {
      $('#datepicker')
        .datepicker('setDate', booking.selectedDate)
        .on('changeDate', e => this.changeDate(e.date));
    }

    this.props.toggleDatePicker();
  }

  changeDate = d => {
    this.props.changeDate(d);
    this.scroll(this.props.booking.bookings.findIndex(x => x[0][0] > d));
  }

  search = e => {
    this.props.search(e.target.value);
  }

  now = () => {
    const bs = this.props.booking.bookings;
    let n = bs.findIndex(x => x[1] && x[1].some(y => y.selected));
    if (n === -1)
      this.scroll(bs.findIndex(x => x[0][0] > util.getDatePart(new Date())));
    else
      this.scroll(n + 1);
  }

  scroll = n => {
    if (n === -1) n = this.props.booking.bookings.length - 1;
    else if (n > 0) n--;
    window.scrollTo(0,
      document.getElementById('group' + n).offsetTop - (this.props.booking.datePickerOpened ? datepickerHeight : 0) - toolBarHeight);
  }

  render() {
    const booking = this.props.booking;
    const bookings = this.props.booking.bookings || [];
    
    const {
      toggleSearch,
      toggleAdd,
      toggleBooking,
      changeInputValue,
      addBooking,
      clear
    } = this.props;

    const toolBarProps = {
      style: styles.onTop,
      pickDate: this.pickDate,
      toggleSearch,
      toggleAdd,
      selectedDate: booking.selectedDate,
      open: booking.datePickerOpened,
    };
    const toolBar = <ToolBar {...toolBarProps} />;

    const searchBarProps = {
      style: styles.onTop,
      search: this.search,
      toggleSearch,
    };
    const searchBar = <SearchBar {...searchBarProps} />;
    
    const groups = bookings.map((group, index) => {
      const groupProps = {
        group,
        index,
        toggleBooking,
        headerColor
      };
      return <List {...groupProps} />
    });

    const noBookings =
      <div>
        There are no bookings available{booking.searchMode ? ' that matched your search criteria.' : '.'}
      </div>;
    
    const nowButtonProps = {
      label: 'Now',
      fullWidth: true,
      primary: true,
      backgroundColor: headerColor,
      hoverColor: buttonHoverColor,
      style: styles.atBottom,
      onClick: this.now,
    };
    const nowButton = <FlatButton {...nowButtonProps} />

    const addDialogProps = {
      open: booking.showAddDialog,
      toggle: toggleAdd,
      change: changeInputValue,
      add: addBooking,
      err: booking.err,
      clear,
    };
    const addDialog = <AddDialog {...addDialogProps} />;

    return (
      <div>
        {booking.searchMode ? searchBar : toolBar}
        
        <div id="datepicker" style={styles.datePicker()}></div>
        
        <div style={styles.list(booking.datePickerOpened)}>
          {bookings.length === 0 ? noBookings : groups}
        </div>
        
        {booking.searchMode ? null : nowButton}
        
        {addDialog}
      </div>
    );
  }; 
}

export default connect(s => ({ booking: s.booking }), actions)(Booking);