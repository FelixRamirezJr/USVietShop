import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const itemStyle = {
  padding: 5,
  wordBreak: 'break-word'
};

const imgStyle = {
  maxWidth: "100%",
  height: "auto"
};

const buttonStyles = {
  marginRight: 5,
  cursor: 'hand',
  cursor: 'pointer'
}

const routes = {
  edit: "/products/:id/edit",
  show: "/products/:id"
}
const divStyles = {
  float: "left"
}

export default class Item extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      status: "",
      statusButton: "Sold",
      remaining_quantity: 0,
      paid: this.props.product.paid
    };
  }

  componentWillMount() {
    if( this.props.product.sold ) {
      this.setState({ status: "SOLD"  });
    } else {
      this.setState({ status: "Available" });
    }
    this.setState({ sold: this.props.product.sold });
    this.setState({ remaining_quantity: this.props.product.remaining_quantity,
                    quantity: this.props.product.quantity });
  }

  numberWithCommas = (x) => {
    if( x != undefined ){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  calculate_current = ( price, quantity, remaining ) => {
    price = parseFloat( price );
    quantity = parseInt( quantity );
    remaining = parseInt( remaining );
    var calc = price * ( quantity - remaining );
    return calc;
  }

  edit = () => {
    window.location = routes.edit.replace(":id",this.props.product.id);
  }

  show = () => {
    window.location = routes.show.replace(":id",this.props.product.id);
  }

  sellOne = () => {
    if( parseInt( this.state.remaining_quantity ) == 1 ){
      this.sold();
    } else {
      fetch('/api/v1/sell_one?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ remaining_quantity: json.product.remaining_quantity,
                        quantity: json.product.quantity });
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }
  }

  addOne = () => {
    fetch('/api/v1/add_one?id=' + this.props.product.id)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ remaining_quantity: json.product.remaining_quantity,
                      quantity: json.product.quantity });
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  delete = () => {
    var toDelete = confirm("Are you sure you want to delete the following?");
    if( toDelete )
    {
      fetch('/api/v1/delete?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.props.delete( this.props.product );
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }

  }

  sold = () => {
    var cc = confirm("Are you sure you want to mark this item SOLD?")
    if( cc ) {
      fetch('/api/v1/sold?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ sold: true });
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }
  }

  markAsPaid = () => {
    var payStatus = this.state.paid ? true : false;
    if( this.state.paid ) {
      var cc = confirm("Are you sure you want to mark as unpaid?");
      if( !cc ){ return false; }
    }
    fetch('/api/v1/toggle_paid?id=' + this.props.product.id)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ paid: !payStatus });
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  render() {
    var status_button;
    // Set sold status
    if ( this.state.sold ) {
      status_button = <strong> No Longer Available </strong>;
    } else {
      status_button =  <button onClick={this.sold}
                        style={buttonStyles}
                        className="btn btn-success">
                       Sold
                      </button>;
    }

    var description = null;
    if ( this.props.product.description ) {
      description = <p> <i> {this.props.product.description} </i> </p>;
    }

    var paid = null;
    if ( this.state.paid ) {
      paid = <span style={buttonStyles} onClick={this.markAsPaid}> <strong> <i> PAID </i> </strong> </span>;
    } else {
      paid =  <button onClick={this.markAsPaid}
                        style={buttonStyles}
                        className="btn btn-info">
                        Mark as Paid
                      </button>;
    }

    var customer_name = null;
    if ( this.props.product.customer_name ) {
      customer_name = <p> Customer Name: <strong> <i>  {this.props.product.customer_name} </i> </strong> </p>;
    }

    var customer_birthdate = null;
    if ( this.props.product.customer_birthdate ) {
      customer_birthdate = <p> Customer Birthdate: <strong> <i>  {this.props.product.customer_birthdate} </i> </strong> </p>;
    }

    var customer_phone_number = null;
    if ( this.props.product.customer_phone_number ) {
      customer_phone_number = <p> Customer Phone Number: <strong> <i>  {this.props.product.customer_phone_number} </i> </strong> </p>;
    }

    var delivery_time = null;
    if ( this.props.product.delivery_time ) {
      delivery_time = <p> Delivery Time: <strong> <i>  {this.props.product.delivery_time} </i> </strong> </p>;
    }

    var currently_earned = null;
    var cc = null;
    if( this.props.product.quantity > 1 ) {
      cc = this.calculate_current( this.props.product.sell_price, this.state.quantity, this.state.remaining_quantity );
      currently_earned = <span> | <i> Currently Earned: ${cc} </i> </span>;
    }

    return (
      <div style={itemStyle} >
        <div className="col-sm-3" style={divStyles}>
          <a href={this.props.product.picture.url} target="_blank" >
            <img style={imgStyle} src={this.props.product.picture.url}/>
          </a>
        </div>
        <div className="col-sm-9" style={divStyles}>
          <p> <strong> {this.props.product.name} </strong> </p>
          { description }
          <p>
              Original Price: $ { this.numberWithCommas( this.props.product.price ) } |
              Sell Price: $ { this.numberWithCommas( this.props.product.sell_price) } |
              Dong: { this.numberWithCommas( this.props.product.dong) } đ
          </p>
          <p> Quantity:
            { this.state.remaining_quantity }/{ this.state.quantity }
            { currently_earned }
          </p>
          <p>
            Shipping Price: { this.numberWithCommas( this.props.product.shipping_price) } |
            Weight: { this.props.product.weight } lbs
          </p>
          { delivery_time }
          { customer_name }
          { customer_phone_number }
          { customer_birthdate }
        </div>
        <div className="col-sm-12">
          <button onClick={this.edit}
                  style={buttonStyles}
                  className="btn btn-primary"
                  type="button">
            Edit
          </button>
          <button onClick={this.delete}
                  style={buttonStyles}
                  className="btn btn-danger">
                  Delete
          </button>
          <button onClick={this.show}
                  style={buttonStyles}
                  className="btn btn-inverse">
          Link
          </button>
          <button onClick={this.addOne}
                  style={buttonStyles}
                  className="btn btn-warning">
           +
          </button>
          <button onClick={this.sellOne}
                  style={buttonStyles}
                  className="btn btn-warning">
           -
          </button>
          { paid }
          { status_button }
        </div>
        <hr />
      </div>
    );
  }
}
