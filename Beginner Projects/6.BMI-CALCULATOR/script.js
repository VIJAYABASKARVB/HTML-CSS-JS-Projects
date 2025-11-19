document.getElementById('submit').addEventListener('click', displayFunction);

function displayFunction() {
    let weight = Number(document.getElementById("weight").value);
    let height = Number(document.getElementById("height").value);

    if (!weight || !height) {
        document.getElementById('result').textContent = "Please enter valid numbers!";
        return;
    }

    let bmi = weight / ((height / 100) ** 2);
    document.getElementById('result').textContent = "Your BMI is: " + bmi.toFixed(2);
}
