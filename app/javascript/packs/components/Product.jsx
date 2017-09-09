import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './item'

class Product extends React.Component {
  componentWillMount(){
  }
  render() {
    return <Item />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Product />,
    document.body.appendChild(document.createElement('div')),
  )
})
