import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class ReactInputCurrency extends Component {

  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  unmaskNumber = value => {
    const replacedValue = value.replace(/[^\d]/g, '');
    console.log(replacedValue);
    const numbers = replacedValue.split('');
    while (numbers[0] === '0') {
      numbers.shift();
    }
    return numbers.join('');
  }

  maskNumber = value => {

    const { props } = this;
    const decimal = props.decimal || '.';
    const prefix = props.prefix || '$';
    const thousands = props.thousands || ',';

    if (!value) return '';

    let finalValue = value;
    if (finalValue.length < 3) {
      if (finalValue.length === 1) finalValue = `0${decimal}0${finalValue}`;
      if (finalValue.length === 2) finalValue = `0${decimal}${finalValue}`;
      return `${prefix} ${finalValue}`;
    }

    // add decimal
    finalValue = finalValue.split('').reverse();
    finalValue.splice(2, 0, decimal);
    finalValue = finalValue.join('');

    // add thousands indicators
    while (finalValue.search(/[\d]{4}/) !== -1) {
      const index = finalValue.search(/[\d]{4}/);
      finalValue = finalValue.split('');
      finalValue.splice(index + 3, 0, thousands);
      finalValue = finalValue.join('');
    }

    return `${prefix} ${finalValue.split('').reverse().join('')}`;
  }


  handleOnChange = event => {
    event.preventDefault();
    const value = this.unmaskNumber(event.target.value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ name: this.props.name, value: this.maskNumber(value) });
    };
  }

  /**
   * prevents from not showing currency mask
   */
  setValue = value => {
    const unmaskedValue = this.unmaskNumber(value);
    return this.maskNumber(unmaskedValue);
  }

  render() {
    const { className, required, value, name, id } = this.props;
    return <input
      className={`react-input-currency${className ? ' ' + className : ''}`}
      required={required}
      value={this.setValue(value) || ''}
      name={name}
      id={id}
      onChange={this.handleOnChange}
    />;
  }
}
