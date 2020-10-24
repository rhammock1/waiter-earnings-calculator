import myEarnings from './object.js';
import operation from './math.js';

//Template functions for each panel
const leftSideTemplate = function() {
  let leftSide = `<div class='container-left'>
        <h2 class='panel-title'>Meal Details</h2>
        <form class='meal-details'>
          <div class='left-holder'>
          <label for='meal-price'>Meal Price: $<input type='text' id='meal-price' name='meal-price'></label>
          <label for='tax-rate'>Tax Rate: %
          <input type='text' id='tax-rate' name='tax-rate'></label>
          <label for='tip-rate'>Tip Rate: %
          <input type='text' id='tip-rate' name='tip-rate'></label>
          </div>
          <div class='button-holder'>
          <input type='button' value='Submit' id='submit'>
          <input type='button' value='Cancel' id='cancel'>
          </div>
          
        </form>
    </div>`;
  return leftSide;
}

const rightSideTemplate = function() {
  // includes customerCharges and myEarnings
  // all data should be presented dynamically anyways
  let rightSide = `<div class='container-right'>
      <div class='container-top'>
        <h2 class='panel-title'>Customer Charges</h2>
        <div class='holder'>
          <p class='placeholder'>Subtotal: $${myEarnings.myEarnings.customerCharges.subtotal}</p>
          <p class='placeholder'>Tip: $${myEarnings.myEarnings.customerCharges.tip}</p>
          <hr>
          <p class='placeholder'>Total: $${myEarnings.myEarnings.customerCharges.totalPrice}</p>
        </div>
      </div>
      <div class='container-bottom'>
        <h2 class='panel-title'>My Earnings</h2>
        <div class='holder'>
        <p class='placeholder'>Tip total: $${myEarnings.myEarnings.tipTotal}</p>
        <p class='placeholder'>Meal Count: ${myEarnings.myEarnings.mealCount}</p>
        <p class='placeholder'>Average Tip: $${myEarnings.myEarnings.averageTip}</p>
        <input type='button' id='reset' value='RESET'>
      </div>
    </div>`;
  return rightSide;
}

//function to compine templates into one page
const generateTemplateString = function(temp1, temp2) {
  let templateString = temp1 + temp2;
  $('main').html(templateString);
  //right or wrong it can always be made better later

}

//event listeners for each button
//submit button needs to reset the values in myEarnings back to 0
const handleSubmitClick = function() {
  $('.main').on('click', '#submit', function(event) {
    event.preventDefault();
    console.log('submit button pressed');
    //assign variable to each form value
    //put variable as paramater in other functions
    let mealPrice = $('#meal-price').val();
    let taxRate = $('#tax-rate').val();
    let tipRate = $('#tip-rate').val();
    //turn valies into typeOf number
    operation.handleMath(mealPrice, taxRate, tipRate);
    myEarnings.myEarnings.mealCount++;
    operation.handleAverageTip();
    render();
    operation.handleClearCustomerCharge();
    
  });
}
const clearTextBoxes = function() {
  $('#meal-price').val('');
  $('#tax-rate').val('');
  $('#tip-rate').val('');
}
const handleCancelClick = function() {
  $('.main').on('click', '#cancel', function(event) {
    event.preventDefault();
    operation.clearTextBoxes();
  });
}
const clearData = function() {
  myEarnings.myEarnings.tipTotal = 0;
  myEarnings.myEarnings.mealCount = 0;
  myEarnings.myEarnings.averageTip = 0;
}
const handleResetClick = function() {
  $('body').on('click', '#reset', function(event) {
    event.preventDefault();
    
    operation.clearTextBoxes();
    operation.handleClearCustomerCharge();
    operation.clearData();
    render();
  });

}
const bindEventListeners = function() {
  handleCancelClick();
  handleResetClick();
  handleSubmitClick();
}


const render = function() {
  generateTemplateString(leftSideTemplate(), rightSideTemplate());
}

export default{
  bindEventListeners,
  render
}