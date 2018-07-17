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

## Styling

If you want the text aligned right:

```css
.style {
	text-align: right;
}
...
<InputCurrency className={style} {...props}  />
```
## Props

| Parameter | Type | Description |
|:---| |:---| |:---|
| value |  string/number | Field value. |
| id |  string | Field id. |
| name |  string | Field name.  |
| required |  boolean | Html5 required |
| onChange |  function | Callback function called when value changes, returns an object ` { name: props.name, value: masked input value } ` |
| className |  string | Jsx className  |

## Mask props

| Parameter | Default | Type |
|:---| |:---| |:---|
| decimal | . |  string |
| prefix | $ |  string |
| thousands | , |  string |

###### Example
```jsx

const maskProps = {
	decimal: ',',
	prefix: 'R$',
	thousands: '.'
}

<InputCurrency {...maskProps}  />
```
Will give the mask `R$ 2.500,00`

## License

MIT © [alom2](https://github.com/alom2)
