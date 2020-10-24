import myEarnings from './object.js';


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
  myEarnings.myEarnings.customerCharges.subtotal = subtotal;
  return subtotal;
}
const handleTip = function(mealPrice, tipRate) {
  let tipPercent = tipRate/100;
  let tip = mealPrice*tipPercent;
  tip = Math.round((tip + Number.EPSILON) * 100) / 100;
  myEarnings.myEarnings.customerCharges.tip = tip;
  myEarnings.myEarnings.tipTotal += tip;
  
  return tip;
}
const handleTotalPrice = function(subtotal, tip) {
  let totalPrice = subtotal + tip;
  myEarnings.myEarnings.customerCharges.totalPrice = totalPrice;
}
const handleClearCustomerCharge = function() {
  myEarnings.myEarnings.customerCharges.subtotal = 0;
  myEarnings.myEarnings.customerCharges.tip = 0;
  myEarnings.myEarnings.customerCharges.totalPrice = 0;
}
const handleAverageTip = function() {
  let tip = myEarnings.myEarnings.tipTotal;
  let totalMeals = myEarnings.myEarnings.mealCount;
  let averageTip = tip / totalMeals;
  averageTip = Math.round((averageTip + Number.EPSILON) * 100) / 100;
  console.log(averageTip);
  myEarnings.myEarnings.averageTip = averageTip;
}

export default {
  handleAverageTip,
  handleClearCustomerCharge,
  handleTotalPrice,
  handleSubtotal,
  handleTip,
  handleMath
}