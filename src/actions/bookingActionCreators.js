import Actions from './actionNames';
import data from '../data/bookings.json';
import util from '../utils/util';

export default {
  loadBookings: () => ({
    type: Actions.loadBookings,
    bookings: util.processData(data.bookings)
  }),

  toggleDatePicker: () => ({ type: Actions.toggleDatePicker }),

  toggleSearch: () => ({ type: Actions.toggleSearch }),

  search: key => ({ type: Actions.search, key }),

  changeDate: date => ({ type: Actions.changeDate, date }),

  toggleBooking: booking => ({ type: Actions.toggleBooking, booking }),

  toggleAdd: () => ({ type: Actions.toggleAdd }),

  changeInputValue: (name, value) => ({ type: Actions.changeInputValue, name, value }),

  addBooking: () => ({ type: Actions.addBooking }),
  
  clear: () => ({ type: Actions.clear }),
}