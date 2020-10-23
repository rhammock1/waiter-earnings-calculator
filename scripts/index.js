// Need object to hold data
const myEarnings = {
  customerCharges: {
    subtotal: 0.00,
    tip: 0.00,
    totalPrice: 0.00
  },
  tipTotal: 0.00,
  mealCount: 0,
  averageTip: 0
}

//Template functions for each panel
const leftSideTemplate = function() {
  let leftSide = `<div class='container-left'>
        <h2 class='panel-title'>Meal Details</h2>
        <form class='meal-details'>
          <label for='meal-price'>Meal Price: $
          <input type='text' id='meal-price' name='meal-price'></label>
          <label for='tax-rate'>Tax Rate: %
          <input type='text' id='tax-rate' name='tax-rate'></label>
          <label for='tip-rate'>Tip Rate: %
          <input type='text' id='tip-rate' name='tip-rate'></label>
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
        <p class='placeholder'>Subtotal: $${myEarnings.customerCharges.subtotal}</p><br>
        <p class='placeholder'>Tip: $${myEarnings.customerCharges.tip}</p><br>
        <hr>
        <p class='placeholder'>Total: $${myEarnings.customerCharges.totalPrice}</p><br>
        </div>
      </div>
      <div class='container-bottom'>
        <h2 class='panel-title'>My Earnings</h2>
        <div class='holder'>
        <p class='placeholder'>Tip total: $${myEarnings.tipTotal}</p><br>
        <p class='placeholder'>Meal Count: ${myEarnings.mealCount}</p><br>
        <p class='placeholder'>Average Tip Amount: $${myEarnings.averageTip}</p><br>
        </div>
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
const handleMath = function(mealPrice, taxRate, tipRate) {
  let mealCost = parseFloat(mealPrice);
  let taxes = parseFloat(taxRate);
  let tip = parseFloat(tipRate);
  let subtotal =  handleSubtotal(mealCost, taxes);
  let tipAmount = handleTip(mealCost, tip);
  handleTotalPrice(subtotal, tipAmount);
  
}
//math to update the panels on the right
const handleSubtotal = function(mealPrice, taxRate) {
  let taxes = taxRate/100;
  let subtotal = mealPrice + mealPrice * taxes;
  subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
  myEarnings.customerCharges.subtotal = subtotal;
  return subtotal;
}
const handleTip = function(mealPrice, tipRate) {
  let tipPercent = tipRate/100;
  let tip = mealPrice*tipPercent;
  tip = Math.round((tip + Number.EPSILON) * 100) / 100;
  myEarnings.customerCharges.tip = tip;
  myEarnings.tipTotal += tip;
  
  return tip;
}
const handleTotalPrice = function(subtotal, tip) {
  let totalPrice = subtotal + tip;
  myEarnings.customerCharges.totalPrice = totalPrice;
}
const handleClearCustomerCharge = function() {
  myEarnings.customerCharges.subtotal = 0;
  myEarnings.customerCharges.tip = 0;
  myEarnings.customerCharges.totalPrice = 0;
}
const handleAverageTip = function() {
  let tip = myEarnings.tipTotal;
  let totalMeals = myEarnings.mealCount;
  let averageTip = tip / totalMeals;
  console.log(averageTip);
  myEarnings.averageTip = averageTip;
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
    handleMath(mealPrice, taxRate, tipRate);
    myEarnings.mealCount++;
    handleAverageTip();
    render();
    handleClearCustomerCharge();
    
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
    clearTextBoxes();
  });
}
const clearData = function() {
  myEarnings.tipTotal = 0;
  myEarnings.mealCount = 0;
  myEarnings.averageTip = 0;
}
const handleResetClick = function() {
  $('body').on('click', '#reset', function(event) {
    event.preventDefault();
    
    clearTextBoxes();
    handleClearCustomerCharge();
    clearData();
    render();
  });

}


const render = function() {
  generateTemplateString(leftSideTemplate(), rightSideTemplate())
}

const startUp = function() {
  handleResetClick();
  handleSubmitClick();
  handleCancelClick();
  render();
}

$(startUp);