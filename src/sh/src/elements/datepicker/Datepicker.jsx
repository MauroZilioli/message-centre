import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

import { join } from './../../utils/element';

import './Datepicker.scss';

const DatepickerValidKeyCodes = [
  8, 9, 13, 16, 17, 18, 20, 27, // Other
  37, 38, 39, 40, // Arrow keys
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // Numeric keys
  91, 93, // Command (Mac)
];

class Datepicker extends React.Component {

  static serialize(year, month, day) {
    return [
      String(year).padStart(4, '0'),
      String(month).padStart(2, '0'),
      String(day).padStart(2, '0'),
    ].join('-');
  }

  constructor(props) {
    super(props);

    const [
      year,
      month,
      day,
    ] = (props.value || '').split('-').map(component => component * 1);

    this.state = {
      year,
      month,
      day,
      isValid: this.isValidDate(year, month, day),
      isFocus: false,
      activeField: null,
      isCalendarVisible: false,
    };

    this.handleSelectedDateInCalendar = this.handleSelectedDateInCalendar.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }

  isValidDate(year, month, day) {
    const currentYear = new Date().getFullYear();
    // Check own validity
    if (isNaN(year) || year < currentYear - 100 || year > currentYear + 100) {
      return false;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      return false;
    }

    if (isNaN(day) || day < 1 || day > [31, (!(year % 400) || (!(year % 4) && year % 100)) ? 29
      : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]) {
      return false;
    }

    // Check min/max
    const {
      min,
      max,
    } = this.props;

    const value = Datepicker.serialize(year, month, day);

    if (min && min > value) {
      return false;
    }

    if (max && max < value) {
      return false;
    }

    return true;
  }

  handleComponentChange(event) {
    const component = event.target.getAttribute('data-component');

    let {
      year,
      month,
      day,
    } = this.state;

    switch (component) {
      case 'year':
        year = event.target.value;
        break;
      case 'month':
        month = event.target.value;
        break;
      case 'day':
        day = event.target.value;
        break;
    }

    const isValidDate = this.isValidDate(year, month, day);

    this.setState({
      year,
      month,
      day,
      isValid: isValidDate,
    });

    if (isValidDate) {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            value: Datepicker.serialize(year, month, day),
          },
        });
      }
    }
  }

  handleComponentKeyDown(event) {
    const component = event.target.getAttribute('data-component');

    const {
      year,
      month,
      day,
    } = this.state;

    if (!event.shiftKey) {
      if (event.keyCode === 38) { // UP
        const date = [year, month, day];
        date[['year', 'month', 'day'].indexOf(component)] += 1;

        if (this.isValidDate(...date)) {
          this.setState({
            [component]: this.state[component] + 1,
          });
          // apply change
          this.props.onChange({
            target: {
              value: Datepicker.serialize(...date),
            },
          });
          // event.target.select();
        }
        event.preventDefault();
      } else if (event.keyCode === 40) { // DOWN
        const date = [year, month, day];
        date[['year', 'month', 'day'].indexOf(component)] -= 1;

        if (this.isValidDate(...date)) {
          this.setState({
            [component]: this.state[component] - 1,
          });
          // apply change
          this.props.onChange({
            target: {
              value: Datepicker.serialize(...date),
            },
          });
          // event.target.select();
        }
        event.preventDefault();
      } /* else if (event.keyCode === 37) { // LEFT
        if (component === 'year') {
          if (this.dom_year.selectionEnd === 0) {
            this.dom_month.selectionStart = 2;
            this.dom_month.selectionEnd = 2;
            // this.dom_month.select();
            this.dom_month.focus();
          }
        } else if (component === 'month') {
          if (this.dom_month.selectionEnd === 0) {
            this.dom_day.selectionStart = 2;
            this.dom_day.selectionEnd = 2;
            // this.dom_day.select();
            this.dom_day.focus();
          }
        }
      } else if (event.keyCode === 39) { // RIGHT
        if (component === 'day') {
          if (this.dom_day.selectionEnd === this.dom_day.value.length) {
            this.dom_month.selectionStart = 0;
            this.dom_month.selectionEnd = 0;
            this.dom_month.focus();
          }
        } else if (component === 'month') {
          if (this.dom_month.selectionEnd === this.dom_month.value.length) {
            this.dom_year.selectionStart = 0;
            this.dom_year.selectionEnd = 0;
            this.dom_year.focus();
          }
        }
      } */
    }

    if (DatepickerValidKeyCodes.indexOf(event.keyCode) === -1) {
      event.preventDefault();
    }
  }

  handleComponentFocus(event) {
    this.setState({
      isFocus: true,
      activeField: event.target.getAttribute('data-component'),
    });
  }

  handleComponentBlur() {
    this.setState({
      isFocus: false,
      activeField: null,
    });
  }

  handleSelectedDateInCalendar(year, month, day) {
    const isValidDate = this.isValidDate(year, month + 1, day);

    this.setState({
      year,
      month: month + 1,
      day,
      isCalendarVisible: false,
      isValid: isValidDate,
    });

    if (isValidDate) {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            value: Datepicker.serialize(year, month + 1, day),
          },
        });
      }
    }
  }

  openCalendar() {
    this.setState({
      isCalendarVisible: !this.state.isCalendarVisible,
    });
  }

  render() {
    const {
      year,
      month,
      day,
      isValid,
      isFocus,
      activeField,
    } = this.state;

    const {
      disabled,
      className,
    } = this.props;

    const retrieveDatepartValue = (datepart, field, fieldLenght, value) => {
      if (String(value)) {
        return (isNaN(value) || field === datepart) ? value : String(value).padStart(fieldLenght, '0');
      }
      return '';
    };

    return (
      <div
        className="sh-datepicker"
        >
        <div
          className={join('sh-datepicker-input', className, !isValid && 'sh-datepicker-input--invalid',
            isFocus && 'sh-datepicker-input--focus')}
          disabled={disabled}
          >
          <label>
            <input
              type="text"
              value={retrieveDatepartValue('day', activeField, 2, day)}
              autoComplete="off"
              placeholder="dd"
              data-component="day"
              maxLength="2"
              onChange={event => this.handleComponentChange(event)}
              onKeyDown={event => this.handleComponentKeyDown(event)}
              onFocus={event => this.handleComponentFocus(event)}
              onBlur={event => this.handleComponentBlur(event)}
              ref={(dom) => { this.dom_day = dom; }}
              disabled={disabled}
              />
          </label>
          <label>/
            <input
              type="text"
              value={retrieveDatepartValue('month', activeField, 2, month)}
              autoComplete="off"
              placeholder="mm"
              maxLength="2"
              data-component="month"
              onChange={event => this.handleComponentChange(event)}
              onKeyDown={event => this.handleComponentKeyDown(event)}
              onFocus={event => this.handleComponentFocus(event)}
              onBlur={event => this.handleComponentBlur(event)}
              ref={(dom) => { this.dom_month = dom; }}
              disabled={disabled}
              /></label>
          <label>/
            <input
              type="text"
              value={retrieveDatepartValue('year', activeField, 4, year)}
              autoComplete="off"
              placeholder="yyyy"
              maxLength="4"
              data-component="year"
              onChange={event => this.handleComponentChange(event)}
              onKeyDown={event => this.handleComponentKeyDown(event)}
              onFocus={event => this.handleComponentFocus(event)}
              onBlur={event => this.handleComponentBlur(event)}
              ref={(dom) => { this.dom_year = dom; }}
              disabled={disabled}
              />
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={this.openCalendar}
            className="sh-datepicker-calendarButton sh-datepicker-icon--calendar"
            />
        </div>
        <div>
          {this.state.isCalendarVisible &&
            <Calendar
              disablePast
              year={year}
              month={month}
              day={day}
              onSelect={this.handleSelectedDateInCalendar}
              onBlur={this.openCalendar}
              firstDayOfWeek={1}
              />}
        </div>
      </div>
    );
  }
}

Datepicker.defaultProps = {
  disabled: undefined,
  onChange: undefined,
  className: undefined,
  min: undefined,
  max: undefined,
};

Datepicker.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default Datepicker;
