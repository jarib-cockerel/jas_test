let billAmtInput = document.getElementById("billAmt");
let tipAmtInput = document.getElementById("tipAmt");
let paymentForm = document.getElementById("paymentForm");

let paymentTbody = document.querySelector("#paymentTable tbody");
let summaryTds = document.querySelectorAll("#summaryTable tbody tr td");

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener("submit", submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {
    paymentId += 1;

    allPayments["payment" + paymentId] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = "";
    // console.log(billAmtInput);
    tipAmtInput.value = "";
    // console.log(tipAmtInput);
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value; //return value from UI input
  let tipAmt = tipAmtInput.value;

  // console.log(billAmt);
  // console.log(tipAmt);

  if (billAmt === "" || tipAmt === "") return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      // identifier (name, a number or a string literal) each value is an expression whose value is assigned to the property name
      //object initializer (object literal)
      //key:value
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    };
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement("tr");
  newTr.id = "payment" + paymentId;

  appendTd(newTr, "$" + curPayment.billAmt);
  appendTd(newTr, "$" + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + "%");

  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg;
  let paymentTotal = sumPaymentTotal("tipPercent");
  let numberOfPayments = Object.keys(allPayments).length;

  if (paymentTotal === 0 && numberOfPayments === 0) {
    tipPercentAvg = 0;
  } else {
    tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
  }

  summaryTds[0].innerHTML = "$" + sumPaymentTotal("billAmt");
  summaryTds[1].innerHTML = "$" + sumPaymentTotal("tipAmt");
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + "%";
}
