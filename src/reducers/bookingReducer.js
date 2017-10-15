import { groupBy, toPairs, sortBy, max, reduce, last } from 'ramda';
import Actions from '../actions/actionNames';
import util from '../utils/util';

export default (state = { }, action) => {
  switch (action.type) {
    case Actions.loadBookings:
      return {
        ...state,
        bookings: groupBookings(action.bookings),
        original: action.bookings,
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
        key: null,
        bookings: groupBookings(state.original),
        datePickerOpened: false
      };

    case Actions.search:
      return {
        ...state,
        bookings: groupBookings(filterBookings(action.key, state.original), true),
        key: action.key
      };

    case Actions.changeDate:
      return {
        ...state,
        selectedDate: action.date
      };

    case Actions.toggleBooking:
      const bs = [...state.original];
      const n = bs.findIndex(x => x.id === action.booking.id);
      
      if (n > -1)
        bs[n].selected = !action.booking.selected;

      return {
        ...state,
        bookings: groupBookings(state.searchMode ? filterBookings(state.key, bs) : bs, state.searchMode),
        original: bs
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

const groupBookings = (bs, gap) => {
  const gs = sortBy(
    x => x[0][0],
    toPairs(groupBy(b => util.getDatePart(b.start), bs))
      .map(x => [[new Date(x[0])], x[1]])
  );

  if (gap) return gs;

  return reduce((p, c) => {
    let d2 = c[0][0];
    
    if (!p) {
      const yd = util.getDatePart(new Date());
      yd.setDate(yd.getDate() - 1);
      let dr = getDateRange(yd, d2);
      return dr ? [[dr, null], c] : [c];
    }

    let d1 = last(p)[0][0];
    const dr = getDateRange(d1, d2);
    return dr ? [...p, [dr, null], c] : [...p, c];
  }, null, gs);
}

const getDateRange = (d1, d2) => {
  if (d1 >= d2) return null;
  const diff = util.getDaysDiff(d1, d2);
  if (diff > 1) {
    d1 = new Date(d1);
    d1.setDate(d1.getDate() + 1);
    d2 = new Date(d2);
    d2.setDate(d2.getDate() - 1);
    return d1 === d2 ? [d1] : [d1, d2];
  }
  return null;
}

const filterBookings = (key, bs) => bs.filter(b =>
  b.eventName.toLowerCase().indexOf(key.toLowerCase()) > -1 || b.roomName.toLowerCase().indexOf(key.toLowerCase()) > -1);

const bookingFields = ['Event Name', 'Room Name', 'Start Date', 'Start Time', 'End Date', 'End Time'];

const addBooking = s => {
  const f = s.form || {};
  const err = bookingFields
    .map(x => [util.titleToName(x), x])
    .map(x => f[x[0]] ? null : x[1] + ' is required')
    .filter(x => x);
  
  const b = {
    id: reduce(max, 0, s.original.map(x => x.id)) + 1,
    eventName: f.eventName,
    roomName: f.roomName,
    start: util.combineDateTime(f.startDate, f.startTime),
    end: util.combineDateTime(f.endDate, f.endTime)
  };

  if (b.start && b.end && b.start >= b.end)
    err.push('End time must be later than start time');

  if (err.length > 0)
    return { ...s, err };

  const bs = [...s.original, b];

  return {
    ...s,
    bookings: groupBookings(bs),
    original: bs,
    showAddDialog: false,
    form: {}
  };
}
