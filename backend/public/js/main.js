document.querySelector('#amount').addEventListener('input', function () {
    const amount = parseFloat(this.value);
    const interest = amount * 0.05;
    document.querySelector('#duration').placeholder = `Estimated Interest: ₦${interest}`;
});