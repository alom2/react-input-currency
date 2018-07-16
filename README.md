# react-input-currency

> 

[![NPM](https://img.shields.io/npm/v/react-input-currency.svg)](https://www.npmjs.com/package/react-input-currency) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-input-currency
```

## Usage

```jsx
import React, { Component } from 'react'

import InputCurrency from 'react-input-currency'

class Example extends Component {
  constructor() {
    super();
    this.state = {
      value: '20',
    }
  }
  render () {
    return (
      <InputCurrency 
        value={this.state.value}
        onChange={({ value }) => this.setState({ value })}
      />
    );
  }
}
```

## License

MIT © [alom2](https://github.com/alom2)
