import React from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./style.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./Format";

class Cards extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
    formData: null
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value); 
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    } 
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = [...event.target.elements]
      .filter(data => data.name)
      .reduce((acc, data) => {
        acc[data.name] = data.value;
        return acc;
      }, {});
    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused } = this.state;

    return (
      <div key="Payment" className="credit-card-box">
        <div className="credit-card-form">
     
          <h1>Stomble App</h1>
          <h4>Inser Your Credit Card</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
          <div className="card-label">
                <label className="column">Card Number</label>
          </div>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Your Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
            <div className="card-label">
                <label className="column">Card Name</label>
              </div>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name on Card"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
        
              <div className="row">   
                <label className="col card-label">Expiration Date</label>
                <label className="col card-cvc">CVC</label>
              </div>

              <div className="row">
              <div className = "col-6">
                <input
                  type = "tel"
                  name = "expiry"
                  className = "form-control"
                  placeholder = "MM/YY"
                  pattern="\d\d/\d\d"
                  required 
                  onChange = {this.handleInputChange}
                  onFocus = {this.handleInputFocus}
                  />
              </div>
         
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            
            <div className="form-check">
              <input type="checkbox" className="form-check-input"/>
              <label className="form-check-label">Make it default card</label>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary btn-block">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Cards;
