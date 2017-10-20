import { createSelector } from 'reselect';
import { groupBy, toPairs, sortBy } from 'ramda';
import util from '../utils/util';

const booking = s => s.booking;
const bookings = s => s.booking.bookings;
const searchKey = s => s.booking.searchKey;

const filteredBookings = createSelector(
  bookings,
  searchKey,
  (bs, key) => !key ? bs : bs.filter(b =>
    b.eventName.toLowerCase().indexOf(key.toLowerCase()) > -1 || b.roomName.toLowerCase().indexOf(key.toLowerCase()) > -1)
);

const groupedBookings = createSelector(
  filteredBookings,
  bs => sortBy(
    x => x[0][0],
    toPairs(groupBy(b => util.getDatePart(b.start), bs))
      .map(x => [[new Date(x[0])], x[1]])
  )
);

const groupedBookingsWithGaps = createSelector(
  groupedBookings,
  searchKey,
  (bs, key) => key ? bs : util.createGaps(bs)
);

export default {
  booking,
  filteredBookings,
  groupedBookingsWithGaps,
};
