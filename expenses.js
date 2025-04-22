let expenses = [];
let balance = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("setBalanceBtn").addEventListener("click", () => {
        const input = parseFloat(document.getElementById("balanceInput").value);
        if (!isNaN(input) && input > 0) {
            balance = input;
            updateSummary();
        } else {
            alert("Please enter a valid balance.");
        }
    });

    document.getElementById("addExpenseBtn").addEventListener("click", addExpense);
    document.getElementById("askQueryBtn").addEventListener("click", handleQuery);
});

function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ name, amount });
    balance -= amount;
    updateSummary();
    clearInputFields();
}

function updateSummary() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balanceElement = document.getElementById("currentBalance");
    const statusElement = document.getElementById("overspendStatus");

    document.getElementById("totalExpenses").innerText = `Total Expenses: $${total.toFixed(2)}`;
    balanceElement.innerText = `Current Balance: $${balance.toFixed(2)}`;

    if (balance < 0 || balance < 0.3 * (total + balance)) {
        statusElement.innerText = `Status: You're in overspend!`;
        statusElement.style.color = "red";
    } else {
        statusElement.innerText = `Status: You're within budget!`;
        statusElement.style.color = "green";
    }

    document.getElementById("savingsTip").innerText =
        balance < 0 ? "Tip: Cut unnecessary spending immediately!" :
        "Tip: Keep up the good work!";
}

function clearInputFields() {
    document.getElementById("expenseName").value = '';
    document.getElementById("expenseAmount").value = '';
}

function handleQuery() {
    const query = document.getElementById("queryInput").value.toLowerCase();
    const queryResult = document.getElementById("queryResult");

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const overspending = balance < 0;
    let response = "Sorry, I couldn't understand your query.";

    if (
        /total expenses|how much.*spent|sum.*expenses|expenses so far|all expenses/i.test(query)
    ) {
        response = `You've spent a total of $${totalExpenses.toFixed(2)}. Track your recurring expenses to manage this better.`;
    } else if (
        /current balance|how much.*left|remaining balance|left in account/i.test(query)
    ) {
        response = `Your current balance is $${balance.toFixed(2)}. Consider setting a savings goal.`;
    } else if (
        /overspend|over budget|too much/i.test(query)
    ) {
        response = overspending
            ? "Yes, you are overspending. Cut down on non-essentials like dining out or subscriptions."
            : "You're within your budget. Keep tracking and plan ahead!";
    } else if (
        /tip|advice|suggest/i.test(query)
    ) {
        response = overspending
            ? "Tip: Review your recurring charges and reduce impulse spending."
            : "Tip: Set aside at least 20% of your income for savings or investments.";
    } else if (/savings|saved|emergency fund/i.test(query)) {
        response = "Building an emergency fund of 3–6 months' expenses is essential. Automate savings if possible.";
    } else if (/income|earned|salary/i.test(query)) {
        response = "Make sure you're spending less than you earn. Try the 50/30/20 budgeting rule.";
    } else if (/budget|plan|monthly limit/i.test(query)) {
        response = "Set a monthly spending limit and stick to it. Use this tracker to spot leaks in your budget.";
    } else if (/food|dining|restaurant/i.test(query)) {
        response = "Dining can eat into your budget fast. Meal prep or limit takeouts to once a week.";
    } else if (/entertainment|subscriptions|netflix/i.test(query)) {
        response = "Trim unused subscriptions and consider free entertainment options.";
    } else if (/transport|fuel|gas|commute/i.test(query)) {
        response = "Carpool or use public transport to reduce commute costs.";
    } else if (/health|medical|insurance/i.test(query)) {
        response = "Budget for medical emergencies and review your health insurance coverage.";
    } else if (/rent|mortgage|housing/i.test(query)) {
        response = "Keep housing costs under 30% of your income for financial stability.";
    } else if (/utilities|electricity|water|internet/i.test(query)) {
        response = "Consider energy-efficient options and bundle services to reduce utility bills.";
    } else if (/shopping|clothes|fashion/i.test(query)) {
        response = "Set a shopping budget and avoid impulsive buys.";
    } else if (/travel|vacation|trip/i.test(query)) {
        response = "Plan vacations ahead and look for off-season deals.";
    } else if (/education|tuition|school/i.test(query)) {
        response = "Save early for education and seek scholarships where possible.";
    } else if (/debt|loan|credit card/i.test(query)) {
        response = "Pay off high-interest debts first. Avoid minimum-only payments.";
    } else if (/investment|stocks|crypto|mutual fund/i.test(query)) {
        response = "Diversify your investments and invest based on your risk profile.";
    } else if (/retirement|pension|401k|savings plan/i.test(query)) {
        response = "Start retirement savings early. Compound interest works best over time.";
    } else if (/kids|children|family/i.test(query)) {
        response = "Plan for family needs early—education, insurance, and day-to-day costs add up.";
    } else if (/insurance|life insurance|coverage/i.test(query)) {
        response = "Ensure your insurance policies align with your current life stage.";
    } else if (/tax|refund|deduction/i.test(query)) {
        response = "Keep records organized. Explore all deduction options during tax season.";
    } else if (/goal|financial goal|target/i.test(query)) {
        response = "Define clear financial goals—short term and long term—to stay focused.";
    } else if (/expense breakdown|category summary/i.test(query)) {
        const categorySummary = expenses.reduce((acc, exp) => {
            acc[exp.name] = (acc[exp.name] || 0) + exp.amount;
            return acc;
        }, {});
        response = "Here’s your expense breakdown:\n" + Object.entries(categorySummary)
            .map(([name, amt]) => `${name}: $${amt.toFixed(2)}`)
            .join("\n");
    }

    queryResult.innerText = response;
}

