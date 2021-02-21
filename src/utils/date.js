import DateUnit from "model/date-unit";
import check from "./check";
import JustDate from "utils/just-date";

/**
 * return time period units in given range 
 * @param  {string} timePeriod
 * @param  {Date} start
 * @param  {Date} end
 * @returns {Array.<DateUnit>}
 */
const getTimeUnitsInRange = (timePeriod, start, end) => {
  check.notBigger(start, end);

  const units = [];
  let startDate = new JustDate(start);
  let endDate = new JustDate(end);

  let dateIterate = startDate.clone();
  while (dateIterate <= endDate) {
    let end = dateIterate.endOf(timePeriod).next();
    if (end > endDate) end = endDate.next();
    const unit = new DateUnit(
      `${timePeriod}-${dateIterate.startOf(timePeriod).toString()}`,
      timePeriod,
      dateIterate.clone(),
      end.clone()
    );

    dateIterate = end;
    units.push(unit);
  }

  return units;
};


export { getTimeUnitsInRange };
