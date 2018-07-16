import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ReactInputCurrency extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    config: PropTypes.object,
  }

  unmaskNumber = value => {
    const replacedValue = value.replace(/[^\d]/g, '');
    const numbers = replacedValue.split('');
    while (numbers[0] === '0') {
      numbers.shift();
    }
    return numbers.join('');
  }

  maskNumber = value => {

    const { config } = this.props;
    const decimal = config.decimal || '.';
    const prefix = config.prefix || '$';
    const thousands = config.thousands || ',';

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
    while (finalValue.search(/[\d]{4}/) != -1) {
      const index = finalValue.search(/[\d]{4}/);
      finalValue = finalValue.split('');
      finalValue.splice(index + 3, 0, thousands);
      finalValue = finalValue.join('');
    }

    return `${prefix} ${finalValue.split('').reverse().join('')}`;
  }


  handleOnChange = event => {
    const value = this.unmaskNumber(event.target.value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ name: this.props.name, value: this.maskNumber(value) });
    }
  }

  render() {
    return <input
      className={`react-input-currency ${this.props.className}`}
      required={this.props.required}
      value={this.props.value || ''}
      name={this.props.name}
      id={this.props.id}
      onChange={this.handleOnChange}
    />;
  }
}
