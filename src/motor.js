import React, { Component } from 'react';
import './Motor.css';
import './reusable.css';
import StepOne from './StepOne.js';
import StepTwo from './StepTwo.js';
import StepThree from './StepThree.js'


class Motor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      names: [{
        flag: "https://pegatin.com/obj/f/uk.png", 
        firstName: "", 
        lastName: "",
      }],
      packType: "",
      flagToUpdate: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.addContent = this.addContent.bind(this);
    this.addName = this.addName.bind(this);
    this.removeName = this.removeName.bind(this);
    this.calculatePriceOrMoneySaved = this.calculatePriceOrMoneySaved.bind(this);
    this.setFlag = this.setFlag.bind(this);
    this.whichFlag = this.whichFlag.bind(this);
  }

  // when next button is clicked, increase state by 1 or -1. Const thisStep below then uses the state to return the relevant step
  handleClick(event) {
    const buttonType = (event.target.name === "back") ? -1 : 1;
    this.setState(prevState => ({
      currentStep: prevState.currentStep + buttonType
    }));
    // reset pack to Pro for step one. Otherwise, they can choose basic, go back to step 1, add more names, and it will show the discount for the basic price.
    if (this.state.currentStep === 1) {
      this.setState({packType: "PRO"});
    }
    if (event.target.name === "BASIC" || event.target.name === "PRO" || event.target.name === "PLUS") {
      this.setState({packType: event.target.name});
    }
    else return;
  }

  addName() {
    const copyOfNames = this.state.names.slice();
    const newName = { 
        firstName: "",
        lastName: "",
        flag: "https://pegatin.com/obj/f/uk.png"
      }
    const arrPosition = copyOfNames.length;
    copyOfNames[arrPosition] = newName;
    this.setState({names: copyOfNames});
  }

  removeName(i) {
    return () => {
      const copyOfNames = this.state.names.slice();
      copyOfNames.splice(i, 1);
      this.setState({names: copyOfNames});
    }
  }

  addContent(i) {
    return (event) => {     
      const copyOfNames = this.state.names.slice();
      const newName = { 
        firstName: copyOfNames[i].firstName,
        lastName: copyOfNames[i].lastName,
        flag: copyOfNames[i].flag
      }    
      //update one of them
      newName[event.target.name] = event.target.value;
      copyOfNames[i] = newName;
      this.setState({names: copyOfNames});
    }    
  }

  //save the ID of the flag we are editing
  whichFlag(flagID) {
    this.setState(prevState => ({
      flagToUpdate:  flagID
    }));
  }

  setFlag() {
    return (event) => {
      const copyOfNames = this.state.names.slice();
      const newFlag = {
        flag: copyOfNames[this.state.flagToUpdate].flag,
        firstName: copyOfNames[this.state.flagToUpdate].firstName,
        lastName: copyOfNames[this.state.flagToUpdate].lastName
      }
      newFlag.flag = event.target.src;
      copyOfNames[this.state.flagToUpdate] = newFlag;
      this.setState({names: copyOfNames});
    }
  }




  //preview for one pack, or number of packs for team orders
  headerContent() {
    let nameForPreviews = this.state.names;
    let numberOfNames = this.state.names.length;
    if (this.state.currentStep > 1) {
      if (numberOfNames > 1) {
        return (
          <div className="margin-top-20">
            <div className="d-flex flex-row justify-content-center">
              <h5>You've added {numberOfNames} names!</h5>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="margin-bottom-20 margin-top-20 names-container">
            <div className="d-flex flex-row justify-content-center align-items-center preview-container">
              <div className="preview-flag"><img src={nameForPreviews[0].flag}/></div>
              <div className="preview-fn">{nameForPreviews[0].firstName}</div>
              <div className="preview-ln">{nameForPreviews[0].lastName}</div>
            </div>
            <div className="preview-divider">
              <img src="https://pegatin.com/v4_img/box_prev_names_thin.png" />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center preview-container">
              <div className="preview-flag"><img src={nameForPreviews[0].flag}/></div>
              <div className="preview-fn white">{nameForPreviews[0].firstName}</div>
              <div className="preview-ln white">{nameForPreviews[0].lastName}</div>
            </div>
          </div>
        )
      }
    }
    else return; 
  }

  // Start calculating price and discount

  roundPrice(price) {
    const rounded = parseFloat(Math.round(price * 100) / 100).toFixed(2); 
    return rounded;
  }  

  packDiscount() {
    const numberOfNames = this.state.names.length;
    if (numberOfNames > 1) {
      const discount = (numberOfNames < 6) ? 0.3 : 0.4;
      return discount;
    }
    else {
      const discount = 0;
      return discount;
    } 
  }

  packPrice() {
    const packType = this.state.packType;
    const price = (packType === "BASIC") ? 9.99 : ((packType === "PRO") ? 16.99 : ((packType === "PLUS") ? 29.99 : 0.00));
    return price;
  }

  discountedPackPrice() {
    const price = this.packPrice() * (1-this.packDiscount());
    const roundedPrice = this.roundPrice(price);
    return roundedPrice;
  }


  calculatePriceOrMoneySaved() {
    return (isDiscount) => {
      const numberOfNames = this.state.names.length;     
      const discount = this.packDiscount();
      const total = (isDiscount === true) ? (numberOfNames * this.packPrice() * discount) : (numberOfNames * this.packPrice()) * (1 - discount);
      const roundedTotal = this.roundPrice(total);
      return roundedTotal;
    };
  }

  isTeam() {
    if (this.state.names.length > 1 ) {
      return true;
    }
    else {
      return false;
    }
  }

  // End calculating price and discount

  imageSlider() {
    const images = [["https://pegatin.com/v4_img/slide_main_003.jpg", "something"], ["https://pegatin.com/v4_img/slide_main_004.jpg", "something else"]];
    const fondo = <img className="fondo-img" src={images[0][0]} alt={images[0][1]}/>
    return fondo;
  }

  render() {  

  // Check the state to return the relevant step. 
  const thisStep = (this.state.currentStep === 1) ? 
    <StepOne OnClick={this.handleClick} AddName={this.addName} RemoveName={this.removeName} AddContent={this.addContent} UserInput={this.state.names} flagToChange={this.whichFlag} SetFlag={this.setFlag}/> : 
    ((this.state.currentStep === 2) ? 
      <StepTwo IsTeam={this.isTeam()} DiscountedPrice={this.discountedPackPrice()} Discount={this.packDiscount()} OnClick={this.handleClick}/> : 
      <StepThree IsTeam={this.isTeam()} PricePaidOrDiscount={this.calculatePriceOrMoneySaved} Discount={this.packDiscount()} PackType={this.state.packType} OnClick={this.handleClick}/> ); 

  // Fix wooden background to bottom of page on step 2 and 3
  const setWoodHeight = (this.state.currentStep !== 1) ? "fondo-height" : "";

  // back button
  const back = (this.state.currentStep !== 1) ? <button type="button" name="back" onClick={this.handleClick} className="btn btn-lg absolute back-button">Back</button> : null;

    return (
      <div>
        <div className={"fondo-container " + setWoodHeight}>
          {this.imageSlider()}
        </div>
        <div className="main-interact padding-bottom-50">
          {this.headerContent()}
          {back} 
          {thisStep}
          <div className="d-flex justify-content-center">
            <div className="page-numbers">
              <h6>Step <b>{this.state.currentStep}</b> of 3</h6>
            </div>
          </div>
          <p className="margin-top-20 padding-top-10 text-align-center pegatin-descr">Our custom name stickers for bikes are used by cyclists worldwide, from pro teams to people who ride for fun and fitness. Get your set of bicycle decals today and tag your frame, helmet and more.<br/> <br/>As seen on publications like:</p>
          <div className="d-flex justify-content-center margin-top-20 padding-top-10 align-items-center logo-container">        
            <div className="logo">
              <img src="https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/2/2015/02/cw-logo@2x.png?v=64673017018294490" />
            </div>
            <div className="logo">
              <img src="https://i.pinimg.com/originals/0f/a0/7d/0fa07d639a8c5cd6218e64be3f1bb406.png"/>
            </div>
            <div className="logo">
              <img src="https://www.raceface.com/media/9999x436/Bikerumor.PNG"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Motor;
