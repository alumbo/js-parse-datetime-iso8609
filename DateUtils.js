class DateUtils {

  static parseDateISO8609(dateStr) {
    let date = new Date(dateStr);
    // In case of browser was not able to parse timezone
    let timezoneMinutes = 0;
    if (date.toString() === 'Invalid Date') {
      date = new Date(dateStr.substr(0, dateStr.length - 5));
      let timezoneStr = dateStr.substr(-5);
      let timezoneSign = timezoneStr.substr(0, 1);
      let timezoneHours = parseInt(timezoneStr.substr(1, 2));
      timezoneMinutes = parseInt(timezoneStr.substr(3, 2));
      timezoneMinutes += timezoneHours * 60;
      timezoneMinutes = parseInt(timezoneSign + timezoneMinutes);
    }
    // In case of browser did not impact timezone offset on date
    if (dateStr.indexOf(date.toString().substr(16, 8)) !== -1) {
      timezoneMinutes -= date.getTimezoneOffset();
    }
    date.setMinutes(date.getMinutes() - timezoneMinutes);
    return date;
  }
  
  static formatDateISO8609(date) {
    let dateStr = date.toString();
    let timezone = dateStr.substr(dateStr.indexOf('GMT') + 3, 5);
    dateStr = date.toISOString().substr(0, 19) + timezone;
    return dateStr;
  }

}
