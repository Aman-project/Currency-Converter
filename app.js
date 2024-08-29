const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const fromImg = document.querySelector('.from img');
const toImg = document.querySelector('.to img');


for (let select of dropdowns) {

    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";

        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";

        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    })

};



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

document.querySelector('i').addEventListener('click', function () {

    const tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    const tempSrc = fromImg.src;
    fromImg.src = toImg.src;
    toImg.src = tempSrc;
});


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchnageRate();
})

const updateExchnageRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }


    let response = await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = rate * amtVal;
    msg.innerHTML = `<b>${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}</b>`
}

window.addEventListener("load", updateExchnageRate);

