import moment from "moment";

export function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(moment(weekStart).add(i, "days").toDate());
  }
  return days;
}

export function getWeekRange(date) {
  return {
    from: moment(date).startOf("week").toDate(),
    to: moment(date).endOf("week").toDate(),
  };
}
