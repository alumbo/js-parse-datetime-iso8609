class DateUtils {

  static formatDateISO8609(date) {
    let timezone = date.toString();
    timezone = timezone.substr(timezone.indexOf('GMT') + 3, 5);
    const dateStr = date.toISOString().substr(0,19) + timezone;
    return dateStr;
  }

  static parseDateISO8609(dateStr) {
    let date = new Date(dateStr);
    // In case of browser was not able to parse timezone
    if (date.toString() === 'Invalid Date') {
      date = new Date(dateStr.substr(0, dateStr.length - 5));
    }
    // In case of browser did not impact timezone offset on date
    if (dateStr.indexOf(date.toString().substr(16, 8)) !== -1) {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    }
    return date;
  }

}
