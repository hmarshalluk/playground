import React, { Component } from 'react';
import Modal from 'react-modal';
import './Motor.css';
import './Names.css';
import './reusable.css';


Modal.setAppElement('#root');

class StepOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
 
    this.handleFlagClick = this.handleFlagClick.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  // Start flag modal 

  handleFlagClick(i) {
    return () => {
      this.setState({modalIsOpen: true});
      this.props.flagToChange(i);
    }
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#333';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  clickFlag() {
    return (event) => {
      const test = this.props.SetFlag();
      test(event);
      this.closeModal();
    }
  }

  // Return true if a the length exceeds 20 chars or equals 0.

  checkNames(element) {
    const tooFew = element.length === 0;
    const tooMany = element.length > 20
    const test = (tooFew === true) ? true : ((tooMany === true) ? true : false);
    return test;
  }

  // join each first and last name in an array. Then run checkNames on them. Apply the result to the continue button.

  disabled(){
    const namesArray = [];
    this.props.UserInput.forEach((input) => {
      const bothNames = input.firstName.concat(input.lastName);
      namesArray.push(bothNames);
    });
    const disableOrNot = namesArray.some(this.checkNames);
    return disableOrNot;
  }

  // End flag modal 

  render() {

    let {UserInput, AddContent, RemoveName} = this.props;

    const flags = [
      "https://pegatin.com/obj/f/scotland.png",
      "https://pegatin.com/obj/f/walles.png", 
      "https://pegatin.com/obj/f/uk.png", 
      "https://pegatin.com/obj/f/LionRampart.png"
      ];

    const displayFlags = flags.map((flag, i) => {
      return (
        <li key={"flag_" + i}><img src={flag} onClick={this.clickFlag()}/></li>
      );
    });

    const inputs = UserInput.map((input, i) => {
      let preview = {
        flag: <img className="preview-flag" src={input.flag}/>,
        firstName: input.firstName === "" ? (input.lastName !== "" ? "" : "Your") : input.firstName, 
        lastName: input.lastName === "" ? (input.firstName !== "" ? "" : "NAME") : input.lastName
      }
      const removeButton = (UserInput.length > 1) ? <button type="button" onClick={RemoveName(i)} className="btn btn-sm remove-btn">&times;</button> : null;
      const bothNames = input.firstName.concat(input.lastName);
      const nameLength = bothNames.length;
      var format = /[!#$%^&*_+\-=\[\]{};':"\\|,.<>\/]/;      
      const nameCharCheck = format.test(bothNames);
      const warning = (nameLength > 20) ? 
        (
          <div className="alert alert-danger" role="alert">Oops! Names cannot exceed 20 characters</div>
        ) : null;
      const charWarning = (nameCharCheck) ? 
        (
          <div className="alert alert-light" role="alert">Oops! Names cannot include special characters</div>
        ) : null;

      return (
        <li className="name" key={'input_' + i}>
          <div className="margin-bottom-20 margin-top-20">
            <div className="d-flex flex-row justify-content-center align-items-center preview-container">
              <div className="preview-flag">{preview.flag}</div>
              <div className="preview-fn">{preview.firstName}</div>
              <div className="preview-ln">{preview.lastName}</div>
            </div>
            <div className="preview-divider">
              <img src="https://pegatin.com/v4_img/box_prev_names_thin.png" />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center preview-container">
              <div className="preview-flag">{preview.flag}</div>
              <div className="preview-fn white">{preview.firstName}</div>
              <div className="preview-ln white">{preview.lastName}</div>
            </div>
          </div>
          <div className="d-flex justify-content-center name-select">
            <div className="p-2 d-flex flex-row flex-wrap justify-content-center align-items-center">
              <div className="flag-selector" onClick={this.handleFlagClick(i)}>
                {preview.flag}
                <img className="dropdown-icon" src="https://image.flaticon.com/icons/png/128/32/32195.png"/>
              </div>
              <div className="form-group">
                <input className="input-control" type="text" name="firstName" placeholder="First name" value={input.firstName} onChange={AddContent(i)}/>
                <input className="input-control" type="text" name="lastName" placeholder="Last name" value={input.lastName} onChange={AddContent(i)} />
              </div>
              {removeButton}
            </div>  
             
          </div>
          {warning}{charWarning}
        </li>)
      });

  return (

    <div>
      <div className="d-flex flex-column names-container">
        <div className="p-2">
          <ul className="no-padding">
            {inputs}
          </ul>
        </div>
        <div className="p-2">
          <div className="d-flex justify-content-center">
            <div className="p-2">
              <button type="button" onClick={this.props.AddName} className="btn btn-lg">Add name</button>
              <button type="button" onClick={this.props.OnClick} className="btn btn-primary btn-lg" disabled={this.disabled()}>Continue &rsaquo;</button>
            </div>
          </div>
        </div>
      </div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Example Modal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Choose your flag</h2>
          <div className="flags-container">
            <ul>
              {displayFlags}
            </ul>
          </div>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
    </div>
      
    );
  }
}

export default StepOne;
