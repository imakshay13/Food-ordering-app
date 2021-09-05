import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = (props) => {
    const nameInput =useRef();
    const nameStreet =useRef();
    const namePostal =useRef();
    const nameCity =useRef();

    const[formInputValidity,setFormInputValidity]=useState({
      name : true,
      street: true,
      city : true,
      postalCode : true,
    });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = nameStreet.current.value;
    const enteredPostal = namePostal.current.value;
    const enteredCity = nameCity.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChar(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);


    setFormInputValidity({
      name : enteredNameIsValid,
      street:enteredStreetIsValid,
      city : enteredCityIsValid,
      postalCode : enteredPostalIsValid
    });
    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalIsValid;

    if(!formIsValid)
    {
      return;
    }

    props.onConfirm({
      name:enteredName,
      street:enteredCity,
      postalCode : enteredPostal,
      city:enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? '': classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? '': classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={nameStreet} />
        {!formInputValidity.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode ? '': classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={namePostal} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city ? '': classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={nameCity} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;