
let expression = "";
let justCalculated = false;

const display = document.getElementById("display");
const message = document.getElementById("message");

function updateDisplay(value) {
    display.value = value || "0";
}

function press(value) {
    const isOperator = ["+", "-", "*", "/"].includes(value);

    if (justCalculated && !isOperator) {
        expression = "";
    }

    justCalculated = false;
    expression += value;
    updateDisplay(expression);
    message.textContent = "Keep calculating! 🌸";
}

function clearDisplay() {
    expression = "";
    justCalculated = false;
    updateDisplay("0");
    message.textContent = "Fresh start! 🧹💗";
}

function backspace() {
    expression = expression.slice(0, -1);
    justCalculated = false;
    updateDisplay(expression);
    message.textContent = "Oops, deleted! 🙈";
}

function calculate() {
    if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
        message.textContent = "Oops! Try again 🤭";
        return;
    }

    try {
        // Validate expression before calculating
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        let emoji = "✨";
        let funnyMessage = "Cute and correct! 🎀";

        if (expression.includes("+")) {
            emoji = "☺️";
            funnyMessage = "Yay! Numbers made friends! 💕";
        } else if (expression.includes("-")) {
            emoji = "🥲";
            funnyMessage = "A little less, still the best! 🌷";
        } else if (expression.includes("*")) {
            emoji = "🥰";
            funnyMessage = "Love multiplied! 💖";
        } else if (expression.includes("/")) {
            emoji = "😛";
            funnyMessage = "Sharing is caring! 🍰";
        }

        expression = String(Number(result.toPrecision(10)));
        updateDisplay(expression);
        message.textContent = `${emoji} ${funnyMessage}`;
        justCalculated = true;

    } catch (error) {
        expression = "";
        updateDisplay("Error");
        message.textContent = "Oops! Check your calculation 🤭";
        justCalculated = true;
    }
}
