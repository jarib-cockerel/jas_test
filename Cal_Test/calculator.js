window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  //values with default values
  const value = { amount: 210000, years: 30, rate: 5.65 };
  //select loan amount id
  const loanAmount = document.getElementById("loan-amount");
  //select loan years
  const loanYears = document.getElementById("loan-years");
  //select yeary rates
  const yearlyRates = document.getElementById("loan-rate");
  //printoutvalues
  loanAmount.value = value.amount;
  loanYears.value = value.years;
  yearlyRates.value = value.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {}
