
function redirectToHomepage() {
    window.location.href = "index.html"; 
}

function clearFields(fieldIds) {
    fieldIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });
}

/* Conversion */

function updatePlaceholders() {
    const conversionType = document.getElementById('conversion-type').value;
    const input = document.getElementById('input-value');
    const output = document.getElementById('output-value');
    
    if (conversionType === "CtoF") {
        input.placeholder = "Enter Celsius";
        output.placeholder = "Fahrenheit";
    } else if (conversionType === "FtoC") {
        input.placeholder = "Enter Fahrenheit";
        output.placeholder = "Celsius";
    } else if (conversionType === "MtoF") {
        input.placeholder = "Enter Meters";
        output.placeholder = "Feet";
    } else if (conversionType === "FtoM") {
        input.placeholder = "Enter Feet";
        output.placeholder = "Meters";
    }
    clearFields();
}

function convert() {
    const conversionType = document.getElementById('conversion-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const outputField = document.getElementById('output-value');
    
    if (isNaN(inputValue)) {
        outputField.value = "";
        return;
    }

    let result;
    if (conversionType === "CtoF") {
        result = (inputValue * 9/5) + 32;
    } else if (conversionType === "FtoC") {
        result = (inputValue - 32) * 5/9;
    } else if (conversionType === "MtoF") {
        result = inputValue * 3.28084;
    } else if (conversionType === "FtoM") {
        result = inputValue / 3.28084;
    }
    
    outputField.value = result.toFixed(2);
}

function clearFields() {
    document.getElementById('input-value').value = "";
    document.getElementById('output-value').value = "";
}
/* Incometax */

function calculateTax() {
    const income = parseFloat(document.getElementById("income").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(income) || income < 0) {
        resultDiv.innerHTML = "Please enter a valid taxable income.";
        return;
    }

    let tax = 0;

    if (income <= 250000) {
        tax = 0;
    } else if (income <= 400000) {
        tax = (income - 250000) * 0.20;
    } else if (income <= 800000) {
        tax = 30000 + (income - 400000) * 0.25;
    } else if (income <= 2000000) {
        tax = 130000 + (income - 800000) * 0.30;
    } else if (income <= 8000000) {
        tax = 490000 + (income - 2000000) * 0.32;
    } else {
        tax = 2410000 + (income - 8000000) * 0.35;
    }

    resultDiv.innerHTML = `Your income tax is: PHP ${tax.toFixed(2)}`;
}

/* Loops  */
function performOperation() {
    const operation = document.getElementById("operation").value;
    const number = parseInt(document.getElementById("number").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(number) || number < 1) {
        resultDiv.innerHTML = "Please enter a valid positive integer.";
        return;
    }

    let result;

    switch (operation) {
        case "factorial":
            result = factorial(number);
            resultDiv.innerHTML = `The factorial of ${number} is: ${result}`;
            break;
        case "sum":
            result = sum(number);
            resultDiv.innerHTML = `The sum of the first ${number} natural numbers is: ${result}`;
            break;
        case "average":
            result = average(number);
            resultDiv.innerHTML = `The average of the first ${number} natural numbers is: ${result.toFixed(2)}`;
            break;
        default:
            resultDiv.innerHTML = "Invalid operation.";
    }
}

/** while loop */
function factorial(n) {
    let result = 1;
    let i = n;
    while (i > 0) {
        result *= i;
        i--;
    }
    return result;
}

/** do while loop */
function sum(n) {
    let result = 0;
    let i = 1;
    do {
        result += i;
        i++;
    } while (i <= n);
    return result;
}

/** for loop */
function average(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total / n;
}

/* Payroll */

let employees = [];

function addEmployee() {
    const name = document.getElementById("name").value.trim();
    const daysWorked = parseInt(document.getElementById("daysWorked").value);
    const dailyRate = parseFloat(document.getElementById("dailyRate").value);
    const deduction = parseFloat(document.getElementById("deduction").value);

    if (!name || isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deduction)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    const grossPay = daysWorked * dailyRate;
    const netPay = grossPay - deduction;

    employees.push({
        name,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay
    });

    renderPayrollTable();
    clearFields(["name", "daysWorked", "dailyRate", "deduction"]);
}

function renderPayrollTable() {
    const tbody = document.getElementById("payrollTable").querySelector("tbody");
    tbody.innerHTML = "";

    employees.forEach((employee, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.daysWorked}</td>
            <td>${employee.dailyRate.toFixed(2)}</td>
            <td>${employee.grossPay.toFixed(2)}</td>
            <td>${employee.deduction.toFixed(2)}</td>
            <td>${employee.netPay.toFixed(2)}</td>
        `;

        tbody.appendChild(row);
    });
}

function deleteEmployee() {
    const deleteIndex = parseInt(document.getElementById("deleteIndex").value) - 1;

    if (isNaN(deleteIndex) || deleteIndex < 0 || deleteIndex >= employees.length) {
        alert("Please enter a valid line number.");
        return;
    }

    employees.splice(deleteIndex, 1);
    renderPayrollTable();
    document.getElementById("deleteIndex").value = "";
}
