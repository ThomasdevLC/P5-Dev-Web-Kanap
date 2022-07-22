
let storageCart = JSON.parse(localStorage.getItem("canap_cart"));

storageCart.forEach(item => {

    let eachId = item.id

    // get ID for each item
    fetch(`http://localhost:3000/api/products/${eachId}`)
        .then((res) => res.json()
            .then(function (canapData) {
                addToCart(item, canapData)
            }));
})


function addToCart(item, canapData) {


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

    displayQuantity.value = item.quantity


    content.appendChild(quantityBox);
    quantityBox.appendChild(quantity);
    quantity.appendChild(quantityText);
    quantityText.appendChild(quantityTextDoc);
    quantity.appendChild(displayQuantity)


    // DELETE DOM
    const deleteProd = document.createElement("div");
    deleteProd.classList.add("cart__item__content__settings__delete");
    const deleteText = document.createElement("p");
    deleteText.classList.add("deleteItem");
    const deleteTextDoc = document.createTextNode("Supprimer");

    quantityBox.appendChild(deleteProd);
    deleteProd.appendChild(deleteText);
    deleteText.appendChild(deleteTextDoc);


    // CALCULATE TOTAL 


}
