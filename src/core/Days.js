class Days {
  static getWeekLinks() {
    return [
        { text: 'Monday', link: '/menu/monday' },
        { text: 'Tuesday', link: '/menu/tuesday' },
        { text: 'Wednesday', link: '/menu/wednesday' },
        { text: 'Thursday', link: '/menu/thursday' },
        { text: 'Friday', link: '/menu/friday' },
        { text: 'Saturday', link: '/menu/saturday' },
        { text: 'Sunday', link: '/menu/sunday' },
    ];
  }
  static getTodayLink(fullLink = true) {
    const link = Days.getWeekLinks()[Days.getDayOfWeek()].link;

    if (fullLink) {
      return link;
    }

    return link.replace(/\/menu\//, '');
  }
  static getDayOfWeek() {
    let day = (new Date()).getDay() - 1;

    if (day === -1) {
      day = 0;
    }

    return day;
  }
}

export default Days;
