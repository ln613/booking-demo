import { max, reduce } from 'ramda';
import Actions from '../actions/actionNames';
import util from '../utils/util';

export default (state = {
  bookings: [],
  searchKey: '',
 }, action) => {
  switch (action.type) {
    case Actions.loadBookings:
      return {
        ...state,
        bookings: action.bookings,
        selectedDate: new Date()
      };

    case Actions.toggleDatePicker:
      return {
        ...state,
        datePickerOpened: !state.datePickerOpened
      };

    case Actions.toggleSearch:
      return {
        ...state,
        searchMode: !state.searchMode,
        searchKey: '',
        datePickerOpened: false
      };

    case Actions.search:
      return {
        ...state,
        searchKey: action.searchKey
      };

    case Actions.changeDate:
      return {
        ...state,
        selectedDate: action.date
      };

    case Actions.toggleBooking:
      const bs = [...state.bookings];
      const n = bs.findIndex(x => x.id === action.booking.id);
      
      if (n > -1)
        bs[n].selected = !action.booking.selected;

      return {
        ...state,
        bookings: bs
      };

    case Actions.toggleAdd:
      return {
        ...state,
        showAddDialog: !state.showAddDialog
      };

    case Actions.changeInputValue:
      return {
        ...state,
        form: { ...state.form, [action.name]: action.value }
      };

    case Actions.addBooking:
      return addBooking(state);

    case Actions.clear:
      return {
        ...state,
        err: null
      };

    default:
      return state;
  }
}

const bookingFields = ['Event Name', 'Room Name', 'Start Date', 'Start Time', 'End Date', 'End Time'];

const addBooking = s => {
  const f = s.form || {};
  const err = bookingFields
    .map(x => [util.titleToName(x), x])
    .map(x => f[x[0]] ? null : x[1] + ' is required')
    .filter(x => x);
  
  const b = {
    id: reduce(max, 0, s.bookings.map(x => x.id)) + 1,
    eventName: f.eventName,
    roomName: f.roomName,
    start: util.combineDateTime(f.startDate, f.startTime),
    end: util.combineDateTime(f.endDate, f.endTime)
  };

  if (b.start && b.end && b.start >= b.end)
    err.push('End time must be later than start time');

  if (err.length > 0)
    return { ...s, err };

  const bs = [...s.bookings, b];

  return {
    ...s,
    bookings: bs,
    showAddDialog: false,
    form: {}
  };
}
