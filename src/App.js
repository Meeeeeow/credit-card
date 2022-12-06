import './App.css';
import { useState } from 'react';
import FormInput from './formInput';
import PlaceComponent from './address';

function App() {

 //initialize state 
 const [fname,setfname] = useState('');
 const [lname,setLname] = useState('');
 const [creditCardNumber,setCreditCardNumber] = useState('');
 const [cvvSecurity,setCvvSecurity] = useState('');
 const [month,setMonth]= useState('');
 const [year,setYear] = useState('');
 const [donationAmount,setDonationAmount] = useState('');
 const [address,setAddress] = useState('');
 //validation steps

 //cvv check
 const checkAlpha = (str) => {
  var regex = /^[a-zA-Z ]+$/;
  return regex.test(str);
}

 const checkSpecialChars = (str) => {
    var regex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    return regex.test(str);
  }
 

 const checkNumber = (str) => {
    var regex = /[0-9]/;
    return regex.test(str);
}

//expiration date check
const checkMonth = (month) => {
  if(month > 12 || month < 1){
    return false;
  }
  return true;
}

const checkYear = (year) => {
  if(year < 2022 || year > 2035){ //between year 2022 and 2035
    return false;
  }
  return true;
}

//cardTypeCheck
const checkCardType = (cardNumber) => {
    const masterCard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/; 
    const visaCard = /^4[0-9]{12}(?:[0-9]{3})?$/;

    if(masterCard.test(cardNumber)){
      return 'MasterCard';
    }
    if(visaCard.test(cardNumber)){
      return 'Visa';
    }
}

//validate credit card number
const validateCardNumber = number => {
  //Check if the number contains only numeric value  
  //and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(number)){
      return false;
  }

  return luhnCheck(number);
}

const luhnCheck = val => {
  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j === 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return (checksum % 10) === 0;
}
 
  //submit form
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(fname,lname,creditCardNumber,cvvSecurity,month,year,donationAmount);

    //validation check
    let validCvv = false;
    let validName = false;
    let validCard = false;
    let validCardNumber = false;
    //check if all fields are filled
    if(fname === '' || lname === '' || creditCardNumber === '' || cvvSecurity === '' || month === '' || year === '' || donationAmount === ''){
      alert('Please fill all fields');
      return;
    }
    //check if cvv is valid
    if((cvvSecurity.length === 3 || cvvSecurity.length === 4) && !checkAlpha(cvvSecurity) && !checkSpecialChars(cvvSecurity) && checkNumber(cvvSecurity)){
      validCvv = true;
    }

    if(!validCvv){
      alert('Invalid CVV');
      return;
    }

    //check name validation
    if(checkAlpha(fname) && checkAlpha(lname)){
      validName = true;
      console.log(validName);
    }
    if(!validName){
      alert('Invalid Name');
      return;
    }

    //check expiration date
    if(!checkMonth(month) || !checkYear(year)){
      alert('Invalid Expiration Date');
      return;
    }

    //check card type
    if(checkCardType(creditCardNumber) === 'MasterCard' || checkCardType(creditCardNumber) === 'Visa'){
        validCard = true;
    }
    if(!validCard){
      alert('Invalid Card Type');
      return;
    }

    //check card number
    if(validateCardNumber(creditCardNumber)){
      validCardNumber = true;
    }
    if(!validCardNumber){
      alert('Invalid Card Number');
      return;
    }


    //if all checks pass, submit form
    alert('payment successful');
  }

  return (
    <div className="sign-in">
            <form onSubmit={handleSubmit}>
              <FormInput
                 name = 'fname'
                  type = 'text'
                  value = {fname}
                  label='First Name'
                  required
                  onChange = {(e) => setfname(e.target.value)}
              />
              <FormInput
                name='lname'
                type='text'
                value={lname}
                label='Last Name'
                required
                onChange={(e) => setLname(e.target.value)}
              /> 
              <FormInput
                name='creditCardNumber'
                type='text'
                value={creditCardNumber}
                label='Credit Card Number'
                required
                onChange={(e) => setCreditCardNumber(e.target.value)}
               />
               <FormInput
                name='cvvSecurity'
                type='text'
                value={cvvSecurity}
                label='Enter CVV Security Code'
                required
                onChange={(e) => setCvvSecurity(e.target.value)}
               />
               <h2>Expiration date</h2>
               <div style={{display:'flex', flexDirection:'column'}}>
                  <FormInput
                    name='month'
                    type='number' 
                    value={month}
                    label='Month'
                    required
                    onChange={(e) => setMonth(e.target.value)}
                    />
                    <FormInput
                    name='year'
                    type='number'
                    value={year}
                    label='Year'
                    required
                    onChange={(e) => setYear(e.target.value)}
                    />   

               </div>

               <FormInput
                name='donationAmount'
                type='text'
                value={donationAmount}
                label='Donation Amount'
                required
                onChange={(e) => setDonationAmount(e.target.value)}
                />

                <FormInput
                name='address'
                type='text'
                value={address}
                label='Address'
                required
                onChange={(e) => setAddress(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
            <PlaceComponent/>
    </div>
  );
}

export default App;
