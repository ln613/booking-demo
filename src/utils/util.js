import { is } from 'ramda';

const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const msPerMin = 1000 * 60;
const msPerHour = msPerMin * 60;
const msPerDay = msPerHour * 24;

const util = {
  processData: x => x.map(b => ({
    ...b,
    start: new Date(b.start), end: new Date(b.end)
  }))
    .filter(x => util.getDatePart(x.start) >= util.getDatePart(new Date())),
  
  getDatePart: d => new Date(d.getFullYear(), d.getMonth(), d.getDate()),

  formatDate: d => `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`,

  getAMPM: d => d.getHours() >= 12 ? "PM" : "AM",

  getHour: d => d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),

  pad0: x => (x.length === 1 ? '0' : '') + x,

  formatTime: d => `${util.getHour(d)}:${util.pad0(d.getMinutes().toString())} ${util.getAMPM(d)}`,

  getDuration: b => {
    const totalMins = Math.floor(b.end < b.start ? 0 : (b.end - b.start) / msPerMin);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours === 0 ? '' : hours + 'h'} ${mins === 0 ? '' : mins + 'm'}`;
  },

  getMonthYear: d => d && `${fullMonths[d.getMonth()]} ${d.getFullYear()}`,

  combineDateTime: (d, t) => d && t && new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes()),

  getDaysDiff: (d1, d2) => Math.floor(Math.abs(d2.getTime() - d1.getTime()) / msPerDay),

  titleToName: t => {
    if (!t) return '';
    const n = t.replace(/ /g, '');
    return n[0].toLowerCase() + n.slice(1);
  },
  
  makeArray: a => is(Array, a) ? a : [a],
};

export default util;