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

// Text for Inventory Sorting
const soldText = "Sort by Sold( Sắp xếp theo bán )";
const currentInventory = " Inventory( Hàng tồn kho ) ";
const seeSpecialOrder = "Special Orders (Lệnh đặc biệt)";
const hideSpecialOrder = "For Sale (Rao bán)";

export default class Nav extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        value: '',
        sortText: soldText,
        specialOrderText: seeSpecialOrder,
        packages: [],
        selectedPackage: ""
      };
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
      this.setState({ selectedPackage: this.props.packages[0] });
    }
  }

  changePackage = (event) => {
    this.setState({ selectedPackage: event.target.value });
    this.props.changePackage( event.target.value );
  }

  newProduct = () => {
    window.location = urls.newProduct
  }

  // This will change the scope of the products by whether they are sold or not
  sort = () => {
    // Swap Text values for the button
    var sortBySold = "false";
    if(this.state.sortText == soldText) {
      sortBySold = "true";
      this.setState({ sortText: currentInventory });
    } else {
      this.setState({ sortText: soldText });
    }
    this.props.resort( sortBySold );
  }

  special_order = () => {
    var sortBySpecial = "false";
    if( this.state.specialOrderText == seeSpecialOrder ) {
      sortBySpecial = "true";
      this.setState({ specialOrderText: hideSpecialOrder });
    } else {
      this.setState({ specialOrderText: seeSpecialOrder });
    }
    this.props.setSpecialOrderFilter( sortBySpecial );
  }

  searching = () => {

  }

  render() {
    let packages = this.props.packages.map((pack) =>
       // Correct! Key should be specified inside the array.
       <option key={pack} value={pack}> {pack} </option>
     );
     // <button style={buttonStyle}
     //        className="btn btn-warning"
     //        onClick={this.special_order}>
     //        { this.state.specialOrderText }
     // </button>

    return(
      <div style={navStyle}>
        <button style={buttonStyle}
                className="btn btn-info"
                onClick={this.newProduct}
        >
          New Item
        </button>
        <button style={buttonStyle}
                className="btn btn-success"
                onClick={this.sort}
        >
          { this.state.sortText }
        </button>
        <select value={this.state.selectedPackage} onChange={this.changePackage}>
          {packages}
        </select>
        <br/>

        <span>
          <strong> Revenue(Doanh thu): </strong> ${ this.numberWithCommas( this.props.revenue) }/
          { this.numberWithCommas( this.props.revenueDong ) } đ
        </span>
        <span>
            ,<strong> Est Total(Tổng số ước tính): </strong>
            ${ this.numberWithCommas( this.props.total ) }/
            { this.numberWithCommas(this.props.totalDong) } đ
        </span>
        <span>
            ,<strong> Shipping Total(Tổng số vận chuyển): </strong>
            ${ this.numberWithCommas( this.props.shippingTotal ) }/
            { this.numberWithCommas( this.props.shippingTotalDong ) } đ
        </span>
        <span>
            ,<strong> Total Paid for Products: </strong>
            ${ this.numberWithCommas( this.props.totalPaidForProducts ) }
        </span>
        <input value={this.state.value}
               onChange={this.handleChange}
               className="form-control"
               placeholder="Search (Tìm kiếm)..."/>
      </div>
    )
  }
}
