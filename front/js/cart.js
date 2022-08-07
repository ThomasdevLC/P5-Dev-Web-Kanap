
displayPage()

async function getProducts() {
    const canapData = await fetch(`http://localhost:3000/api/products/`);
    return await canapData.json();
}


async function displayPage() {
    const storageCart = JSON.parse(localStorage.getItem("canap_cart"));
    const products = await getProducts()
    displayArticles(storageCart, products)
    calculatePrices(storageCart, products);
}

function displayArticles(cart, products) {
    cart.forEach(cartItem => {
        const article = products.find((product) => product._id === cartItem.id)

        displayArticle(cartItem, article, products)
    })
}


function displayArticle(item, canapData, products) {

    const container = document.getElementById("cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item");

    // IMAGE DOM
    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img");

    const image = document.createElement("img");
    image.setAttribute('src', canapData.imageUrl);
    image.setAttribute('alt', canapData.altTxt);

    container.appendChild(article);
    article.appendChild(divImage);
    divImage.appendChild(image);


    // DESCRIPTION DOM
    const content = document.createElement("div");
    content.classList.add("cart__item__content");

    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");

    const name = document.createElement("h2");
    const displayName = document.createTextNode(canapData.name);

    const color = document.createElement("p");
    const displayColor = document.createTextNode(item.color);

    const price = document.createElement("p");
    const displayPrice = document.createTextNode(canapData.price + "€");

    article.appendChild(content);
    content.appendChild(description);
    description.appendChild(name);
    name.appendChild(displayName);
    description.appendChild(color);
    color.appendChild(displayColor);
    description.appendChild(price);
    price.appendChild(displayPrice);


    // QUANTITIES DOM
    const quantityBox = document.createElement("div");
    quantityBox.classList.add("cart__item__content__settings");

    const quantity = document.createElement("div");
    quantity.classList.add("cart__item__content__settings__quantity");

    const quantityText = document.createElement("p");
    quantityText.classList.add("cart__item__content__settings__quantity");
    const quantityTextDoc = document.createTextNode("Qté :");

    const displayQuantity = document.createElement("input");
    displayQuantity.classList.add("itemQuantity");
    displayQuantity.setAttribute("type", "Number");
    displayQuantity.setAttribute("min", "1");
    displayQuantity.setAttribute("max", "100");

    content.appendChild(quantityBox);
    quantityBox.appendChild(quantity);
    quantity.appendChild(quantityText);
    quantityText.appendChild(quantityTextDoc);
    quantity.appendChild(displayQuantity);

    displayQuantity.value = item.quantity



    // UPDATE QUANTITIES

    displayQuantity.addEventListener("change", function () {
        update(displayQuantity, item, products)
    })


    // DELETE DOM

    const deleteProd = document.createElement("div");
    deleteProd.classList.add("cart__item__content__settings__delete");
    const deleteText = document.createElement("p");
    deleteText.classList.add("deleteItem");
    const deleteTextDoc = document.createTextNode("Supprimer");

    quantityBox.appendChild(deleteProd);
    deleteProd.appendChild(deleteText);
    deleteText.appendChild(deleteTextDoc);


    // DELETE BUTTON

    deleteText.addEventListener("click", function () {
        deleteCanap(item)
    })
}


// CALCULATE TOTAL PRICE

function calculatePrices(storageCart, products) {

    const totalQty = document.getElementById("totalQuantity");
    const totalPrice = document.getElementById("totalPrice");

    let totalPriceText = 0
    let totalQuantity = 0
    storageCart.forEach(item => {
        const canapData = products.find((product) => product._id === item.id)

        totalQuantity += item.quantity
        totalPriceText = totalPriceText + (item.quantity * canapData.price)
    })

    totalPrice.textContent = totalPriceText
    totalQty.textContent = totalQuantity
}


// --------------------------FORM / REGEX-----------------------------


function isFirstNameValid() {

    const firstNameInput = document.getElementById("firstName")
    const errorDisplay = document.getElementById("firstNameErrorMsg")
    errorDisplay.style.fontWeight = "700"



    if (firstNameInput.value.length < 2) {
        errorDisplay.textContent = "champ non valide - Votre prénom doit comporter au minimun 2 caractères "
        errorDisplay.style.color = "#d35400"
        return false;
    }

    else if (!firstNameInput.value.match(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)) {
        errorDisplay.textContent = "champ non valide - La première lettre doit etre une majuscule"
        errorDisplay.style.color = "#d35400"
        return false;

    }

    else {
        errorDisplay.textContent = "valide"
        errorDisplay.style.color = "greenyellow";
        return true;

    }
}

function isLastNameValid() {
    const lastNameInput = document.getElementById("lastName")
    const errorDisplay = document.getElementById("lastNameErrorMsg")
    errorDisplay.style.fontWeight = "700"



    if (lastNameInput.value.length < 2) {
        errorDisplay.textContent = "champ non valide - Votre nom doit comporter au minimun 2 caractères"
        errorDisplay.style.color = "#d35400"
        return false;

    }

    else if (!lastNameInput.value.match(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)) {
        errorDisplay.textContent = "champ non valide - La première lettre doit etre une majuscule"
        errorDisplay.style.color = "#d35400"
        return false;
    }
    else {
        errorDisplay.textContent = "valide"
        errorDisplay.style.color = "greenyellow";
        return true;
    }
}

function isAddressValid() {
    const addressInput = document.getElementById("address")
    const errorDisplay = document.getElementById("addressErrorMsg")
    errorDisplay.style.fontWeight = "700"



    if (!addressInput.value.match(/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/)) {
        errorDisplay.textContent = "champ non valide"
        errorDisplay.style.color = "#d35400"
        return false;

    }
    else {
        errorDisplay.textContent = "valide"
        errorDisplay.style.color = "greenyellow";
        return true;
    }
}

function isCityValid() {
    const cityInput = document.getElementById("city")
    const errorDisplay = document.getElementById("cityErrorMsg")
    errorDisplay.style.fontWeight = "700"


    if (!cityInput.value.match(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)) {
        errorDisplay.textContent = "champ non valide"
        errorDisplay.style.color = "#d35400"
        return false;
    }

    else {
        errorDisplay.textContent = "valide"
        errorDisplay.style.color = "greenyellow";
        return true;
    }
}

function isEmailValid() {
    const emailInput = document.getElementById("email")
    const errorDisplay = document.getElementById("emailErrorMsg")
    errorDisplay.style.fontWeight = "700"


    if (!emailInput.value.match(/^[_a-z0-9-]+[\._a-z0-9-]*@[a-z0-9-]+[.a-z0-9-]*\.[a-z]{2,4}$/)) {
        errorDisplay.textContent = "champ non valide"
        errorDisplay.style.color = "#d35400"
        return false;
    }

    else {
        errorDisplay.textContent = "valide"
        errorDisplay.style.color = "greenyellow";
        return true;
    }
}

const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {

        switch (e.target.id) {

            case "firstName":
                isFirstNameValid()
                break;

            case "lastName":
                isLastNameValid()
                break;

            case "address":
                isAddressValid()
                break;

            case "city":
                isCityValid()
                break;

            case "email":
                isEmailValid()
                break;
            default:
                null;
        }
    });
});



// ----------------------------POST ORDER -------------------------------------------

const submitButton = document.getElementById("order")
submitButton.addEventListener("click", (e) => submitForm(e))
const storageCart = JSON.parse(localStorage.getItem("canap_cart"));

const totalQty = document.getElementById("totalQuantity");


function submitForm(e) {
    e.preventDefault()

    if (storageCart.length === 0 || storageCart == null) {
        alert("Votre panier est vide")
    }

    else if (isFirstNameValid() && isLastNameValid() && isAddressValid() && isCityValid() && isEmailValid()) {
        {
            let storageCart = JSON.parse(localStorage.getItem("canap_cart"));
            let idArray = []
            storageCart.forEach((item) => {
                let productId = item.id
                idArray.push(productId)
            })

            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }

            const products = idArray

            const dataToFetch = {
                contact, products
            }

            fetch(`http://localhost:3000/api/products/order`, {
                method: "POST",
                body: JSON.stringify(dataToFetch),
                headers: {
                    "content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const orderId = data.orderId
                    window.location.href = `confirmation.html?orderId=${orderId}`
                })
        }
    }

    else {
        alert("Veuillez renseigner tous les champs du formulaire")
    }



}
// UPDATE QUANTITIES

function update(displayQuantity, item, products) {

    let storageCart = JSON.parse(localStorage.getItem("canap_cart"));

    const newQuantity = parseInt(displayQuantity.value)

    function update(productId, quantity, productColor) {
        for (let item of storageCart) {
            if (item.id === productId && item.color === productColor) {
                item.quantity = quantity
            }
        }
        localStorage.setItem("canap_cart", JSON.stringify(storageCart))
    }
    update(item.id, newQuantity, item.color)

    calculatePrices(storageCart, products)
}

// DELETE BUTTON

function deleteCanap(item) {

    if (confirm("Etes vous sûr de vouloir supprimer cet article !")) {

        let storageCart = JSON.parse(localStorage.getItem("canap_cart"));
        const deleteItem = storageCart.findIndex((product) => product.id === item.id && product.color === item.color)

        function deleteProd(productId, productColor) {
            for (let item of storageCart) {
                if (item.id === productId && item.color === productColor) {
                    storageCart.splice(deleteItem, 1)
                }
            }
            localStorage.setItem("canap_cart", JSON.stringify(storageCart))
        }
        deleteProd(item.id, item.color)

        window.location.reload()

    } else {
        window.location.href = "cart.html"
    }
}
