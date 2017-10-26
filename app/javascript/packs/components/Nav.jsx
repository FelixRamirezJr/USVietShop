import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const urls = {
  newProduct: "/products/new",
  receipts: "/receipts"
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
  padding: 5,
  position: 'relative'
};

const finalStyle = {
  position: 'absolute',
  top: 10,
  right: 10
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
        selectedPackage: "",
        money_received: null
      };
  }

  componentWillReceiveProps(props) {
    if(props.final) {
      this.setState({ money_received: props.final.money_received });
    } else {
      this.setState({ money_received: null });
    }
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

  changePackage = (event) => {
    this.props.changePackage( event.target.value );
  }

  newProduct = () => {
    window.location = urls.newProduct;
  }

  receipts = () => {
    window.location = urls.receipts;
  }

  setFinal = () => {
    if(this.props.final){
      var money_received = prompt(this.props.final.money_received);
    } else  {
      var money_received = prompt("Enter the amount of money received");
    }
    this.setState({ money_received: money_received });
    this.props.setFinal( this.state.selectedPackage, money_received );
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
        <select value={this.props.selectedPackage} onChange={this.changePackage}>
          {packages}
        </select>
        <br/>

        <span>
          <strong> Revenue(Doanh thu): </strong> ${ this.numberWithCommas( this.props.revenue) }/
          { this.numberWithCommas( this.props.revenueDong ) } đ
        </span>
        <span>
            <br/><strong> Total Paid in U.S. (Tổng số phải trả ở Hoa Kỳ): </strong>
            ${ this.numberWithCommas( this.props.totalPaidForProducts ) }
        </span>
        <span>
            <br/> <strong> Est Total(Tổng số ước tính): </strong>
            ${ this.numberWithCommas( this.props.total ) }/
            { this.numberWithCommas(this.props.totalDong) } đ
        </span>
        <span>
            <br/><strong> Shipping Total(Tổng số vận chuyển): </strong>
            ${ this.numberWithCommas( this.props.shippingTotal ) }/
            { this.numberWithCommas( this.props.shippingTotalDong ) } đ
        </span>
        <div style={finalStyle}>
          <button className="btn btn-success"
                  onClick={this.setFinal}
          >
          Final
          </button>
        <br/>
        {this.state.money_received}
        </div>
        <input value={this.state.value}
               onChange={this.handleChange}
               className="form-control"
               placeholder="Search (Tìm kiếm)..."/>
      </div>
    )
  }
}
