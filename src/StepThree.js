import React, { Component } from 'react';
import './Motor.css';
import './reusable.css';
import './StepThree.css';


class StepThree extends Component {

	render() {

		let { IsTeam, PricePaidOrDiscount, PackType, Discount } = this.props; 

		const getPD = PricePaidOrDiscount();
		const price = getPD(false);
		const saved = getPD(true);
		const amountSaved = (IsTeam) ? (<p>(You're saving £{saved}!)</p>) : null;
		const set = (IsTeam) ? "sets" : "set"; 
		const hideForSingle = (!IsTeam) ? "display-none" : "";

	    return (

	    <div className="payment-section text-align-center">
			<div className={"margin-bottom-20 "+ hideForSingle}>
				<div className="text-align-center">
				</div>
			</div>
			<div className="margin-top-30 margin-bottom-20">
				<h2>Ready!</h2>
				<h6>Check out to get your <span className={PackType}>{PackType}</span> {set}</h6>
			</div>
	    	<div className="d-flex flex-wrap justify-content-center align-content-center margin-top-20">	
	    		<div className="p-2 pricing-box text-align-left">	    		
		    		<h4 className="margin-bottom-20 underline">Total: £{price}</h4>	    	
			    	{amountSaved}
			    	<p><img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/whatsapp/116/lock_1f512.png"/> Secure checkout</p>
					<p><img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/delivery-truck_1f69a.png" />Free shipping everywhere</p>
					<p><img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/138/white-medium-star_2b50.png" />Rated 9/10 by Cycling Weekly</p>	
				</div>	
				<div className="p-2 pricing-box">	
					<button type="button" className="btn btn-primary btn-lg checkout-btn">Buy</button>
				</div>
			</div>
			<div className="payment-options">
				<img src="https://oepartners.com.au/wp-content/uploads/2018/03/paypal-visa-mastercard-amex.png"/>
			</div>
			<p className="small">Refund policy. Privacy policy.<br/>Need help? Get in touch via hello@pegatin.com</p>
	    </div>
	      
	    );
	 }
}

export default StepThree;
