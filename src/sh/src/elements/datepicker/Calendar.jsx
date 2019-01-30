import React from 'react';
import PropTypes from 'prop-types';

import './Calendar.scss';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = (this.props.year && this.props.month && this.props.day) ?
      new Date(this.props.year, this.props.month - 1, this.props.day) : new Date();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDayOfWeek = date.getDay();
    const currentDate = date.getDate();

    this.state = {
      year: currentYear,
      month: currentMonth,
      day: currentDayOfWeek,
      selectedYear: currentYear,
      selectedMonth: currentMonth,
      selectedDay: currentDate,
      selectedDate: date,
      startDay: this.props.firstDayOfWeek,
      disablePast: this.props.disablePast ? this.props.disablePast : false,
      firstOfMonth: null,
      daysInMonth: null,
      selectedElement: null,
    };

    this.getMonthProperties = this.getMonthProperties.bind(this);
    this.calendarHeader = this.calendarHeader.bind(this);
    this.calendarWeekDays = this.calendarWeekDays.bind(this);
    this.calendarMonthDates = this.calendarMonthDates.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    this.setState(this.getMonthProperties(this.state.year, this.state.month));
  }

  componentDidMount() {
    this.calendarDiv.ownerDocument.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onSelect && prevState.selectedDate !== this.state.selectedDate) {
      this.props.onSelect.call(this.node, this.state.year, this.state.month, this.state.day);
    }
  }

  componentWillUnmount() {
    this.calendarDiv.ownerDocument.removeEventListener('mousedown', this.handleClickOutside);
  }

  getPrevMonth() {
    const state = {};
    if (this.state.month > 0) {
      state.month = this.state.month - 1;
      state.year = this.state.year;
    } else {
      state.month = 11;
      state.year = this.state.year - 1;
    }
    Object.assign(state, this.getMonthProperties(state.year, state.month));
    this.setState(state);
  }

  getNextMonth() {
    const state = {};
    if (this.state.month < 11) {
      state.month = this.state.month + 1;
      state.year = this.state.year;
    } else {
      state.month = 0;
      state.year = this.state.year + 1;
    }
    Object.assign(state, this.getMonthProperties(state.year, state.month));
    this.setState(state);
  }

  getMonthProperties(year, month) {
    return {
      firstOfMonth: new Date(year, month, 1),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
    };
  }

  handleClickOutside(event) {
    if (this.calendarDiv && !this.calendarDiv.contains(event.target)) {
      this.props.onBlur.call(this.node);
    }
  }

  selectDate(year, month, day, element) {
    if (this.state.selectedElement) {
      this.state.selectedElement.classList.remove('sh-calendar-date--selected');
    }
    element.target.classList.add('sh-calendar-date--selected');
    const date = new Date(year, month, day);
    if (date !== this.state.selectedDate) {
      this.setState({
        day,
        selectedYear: year,
        selectedMonth: month,
        selectedDay: date,
        selectedDate: new Date(year, month, day),
        selectedElement: element.target,
      });
    } else {
      this.setState({ selectedElement: element.target });
    }
  }

  calendarHeader() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
      <div className="sh-calendar-row sh-calendar-head">
        <button
          className="sh-calendar-cell sh-calendar-prev"
          onClick={() => this.getPrevMonth(this)}
          type="button"
          />
        <div
          className="sh-calendar-cell sh-calendar-title"
          >
          {`${monthNames[this.state.month]} ${this.state.year}`}
        </div>
        <button
          className="sh-calendar-cell sh-calendar-next"
          onClick={() => this.getNextMonth(this)}
          type="button"
          />
      </div>
    );
  }

  calendarWeekDays() {
    const calendarWeekArray = Array(...{ length: 7 }).map(Number.call, Number);
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <div
        className="sh-calendar-row sh-calendar-weekdays"
        >
        {calendarWeekArray.map((item, i) => (
          <div key={i * 100} className="sh-calendar-cell">
            {dayNames[(this.state.startDay + i) % 7]}
          </div>
          ))
        }
      </div>
    );
  }

  calendarMonthDates() {
    let rowsInMonth = 5;
    let sundayInCalendarWeek = 0;
    const startDay = this.state.firstOfMonth.getUTCDay();
    const className = rowsInMonth === 6 ? 'sh-calendar-dates' :
      'sh-calendar-dates sh-calendar-fix';
    const weekArray = Array(...{ length: 7 }).map(Number.call, Number);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    if ((startDay === 5 && this.state.daysInMonth === 31) ||
      (startDay === 6 && this.state.daysInMonth > 29)) {
      rowsInMonth = 6;
    }

    let day = (this.state.startDay) - startDay;
    while (day > 1) {
      day -= 7;
    }
    day -= 1;

    return (
      <div className={className} >
        {weekArray.map((item, i) => {
          sundayInCalendarWeek = day + (i * 7);
          return (
            <div
              key={sundayInCalendarWeek * 100}
              className="sh-calendar-row"
              >
              {weekArray.map(() => (
                  this.renderWeekDays(sundayInCalendarWeek += 1, today)
                ))
              }
            </div>
          );
        })
        }
      </div>
    );
  }

  renderWeekDays(dayInCalendarWeek, today) {
    const isDate = dayInCalendarWeek > 0 && dayInCalendarWeek <= this.state.daysInMonth;
    const id = `${dayInCalendarWeek * 100}`;

    if (isDate) {
      const currentDate = new Date(this.state.year, this.state.month, dayInCalendarWeek);
      let className = 'sh-calendar-cell sh-calendar-date';
      if (this.state.disablePast && currentDate < today) {
        className += ' sh-calendar-past';

        return (
          <button
            key={id}
            className={className}
            type="button"
            >{dayInCalendarWeek}</button>
        );
      }

      if (currentDate.getTime() === this.state.selectedDate.getTime()) {
        className += ' sh-calendar-date--selected';
      }

      return (
        <button
          key={id}
          className={className}
          type="button"
          onClick={element => this.selectDate(this.state.year, this.state.month, dayInCalendarWeek, element)}
          >
          {dayInCalendarWeek}
        </button>
      );
    }

    return (
      <div
        key={id}
        className="sh-calendar-cell"
        />
    );
  }

  render() {
    return (
      <div
        className="sh-calendar"
        ref={(div) => { this.calendarDiv = div; }}
        >
        <div className="sh-calendar-inner">
          {this.calendarHeader()}
          {this.calendarWeekDays()}
          {this.calendarMonthDates()}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  disablePast: undefined,
  onSelect: undefined,
  onBlur: undefined,
  year: undefined,
  month: undefined,
  day: undefined,
  firstDayOfWeek: undefined,
};

Calendar.propTypes = {
  disablePast: PropTypes.bool,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
};
