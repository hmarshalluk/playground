import React, { Component } from 'react';
import './Motor.css';
import './reusable.css';
import './StepTwo.css';


class StepTwo extends Component {

  render() {  

    let { IsTeam, DiscountedPrice, Discount } = this.props;

    const hideForTeams = (IsTeam) ? "display-none" : "";
    const hideForSingle = (!IsTeam) ? "display-none" : "";
    const selectOrContinue = (IsTeam) ? "Continue" : "Select";
    const priceOrNone = (IsTeam) ? (<h2 className="price"><span className="strike-through">£16.99</span> £{DiscountedPrice} <span className="small">/ pack</span></h2>) : <h2 className="price">£16.99</h2>;

    return (

    <div className="padding-bottom-10">
      <div className={"margin-bottom-20 "+ hideForSingle}>
        <div className="text-align-center">
          <p>For each one, you'll receive a shiny pack of our classic <span className="PRO">PRO</span> stickers<br/>+ a {Discount*100}% discount.</p>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex align-items-end">
          <div className="col-md-4">
            <div className={"product "+ hideForTeams}>
              <div className="header bg-success">
                <h2>Basic</h2>
              </div>
              <div className="padding-10">
                <h2 className="price">£9.99</h2>
                <h5>For light surfaces</h5>
                <p>10 transparent stickers</p>
                <p>All 10 in black</p>
                <p>Your flag <em>without</em> white</p>
                <p><b>For white surfaces only</b></p>
                <button type="button" name="BASIC" onClick={this.props.OnClick} className="btn btn-success btn-lg btn-block">Select</button>
              </div>
            </div>
          </div>
           <div className="col-md-4">
            <div className="product">
              <div className="header bg-primary">
                <h2>Pro</h2>
              </div>
              <div className="padding-10">
                {priceOrNone}
                <h5>For light &amp; dark surfaces</h5>
                <p>10 transparent stickers</p>
                <p>5 with black and 5 with white text</p>
                <p>Durable, weatherproof stickers</p>
                <p><b>Most popular option<br/>Used by 90,000+ cyclists</b></p>
                <button type="button" name="PRO" onClick={this.props.OnClick} className="btn btn-primary btn-lg btn-block">{selectOrContinue}</button>
              </div>
            </div>
          </div>
           <div className="col-md-4">
            <div className={"product "+ hideForTeams}>
              <div className="header bg-danger">
                <h2>Plus</h2>
              </div>
              <div className="padding-10">
                <h2 className="price">£29.99</h2>
                <h5>For light &amp; dark surfaces</h5>
                <p>10 custom vinyl transfers</p>
                <p>5 with black and 5 with white text</p>
                <p>Individually cut letters</p>
                <p><b>The professional option</b></p>
                <button type="button" name="PLUS" onClick={this.props.OnClick} className="btn btn-danger btn-lg btn-block">Select</button>
              </div>
            </div>
          </div>
        </div>      
      </div>
    </div>
      
    );
  }
}

export default StepTwo;
