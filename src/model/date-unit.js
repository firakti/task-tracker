//TODO refactor constructors
class DateUnit {
  /**
   * @param  {String} id
   * @param  {String} type
   * @param  {JustDate} start
   * @param  {JustDate} end
   */
  constructor(id, type, start, end) {
    this.id = id;
    this.type = type;
    this.start = start;
    this.end = end;
    this.range = this.end.diff(this.start);
  }
}
export default DateUnit