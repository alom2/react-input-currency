import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

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

    let finalValue = this.unmaskNumber(value);
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

  setClassName = () => {
    const { className } = this.props;
    if (!className) {
      return styles['input-currency'];
    }
    return styles['input-currency'] + ' ' + className;
  }

  render() {
    const { required, name, id, value } = this.props;
    return <input
      className={this.setClassName()}
      required={required}
      value={this.maskNumber(value)}
      name={name}
      id={id}
      onChange={this.handleOnChange}
    />;
  }
}