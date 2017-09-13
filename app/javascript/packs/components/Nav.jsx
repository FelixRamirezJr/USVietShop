import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const urls = {
  newProduct: "/products/new"
}

const listStyle = {
  display: "inline",
  listStyle: "none"
};

const buttonStyle = {
  cursor: "hand",
  cursor: "pointer",
  marginRight: 10,
  marginBottom: 5
}

const navStyle = {
  border: '1px solid black',
  margin: 10,
  borderRadius: 5,
  padding: 5
};

export default class Nav extends React.Component {

  constructor(props) {
      super(props);
      this.state = {value: ''};
  }

  numberWithCommas = (x) => {
    if( x != undefined ){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    if( event.target.value.length > 1 ) {
      this.props.search( event.target.value );
    } else {
      this.props.reset()
    }
  }

  newProduct = () => {
    window.location = urls.newProduct
  }

  searching = () => {

  }

  render() {
    return(
      <div style={navStyle}>
        <button style={buttonStyle}
                className="btn btn-info"
                onClick={this.newProduct}
        >
                New
        </button>
        <span>
          <strong> Revenue(Doanh thu): </strong> ${ this.numberWithCommas( this.props.revenue) }/
          { this.numberWithCommas( this.props.revenueDong ) } đ
        </span>
        <span>
            ,<strong> Est Total(Tổng số ước tính): </strong>
            ${ this.numberWithCommas( this.props.total ) }/
            { this.numberWithCommas(this.props.totalDong) } đ
        </span>
        <input value={this.state.value}
               onChange={this.handleChange}
               className="form-control"
               placeholder="Search (Tìm kiếm)..."/>
      </div>
    )
  }
}
