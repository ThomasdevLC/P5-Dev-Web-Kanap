
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


    // UPDATE
    displayQuantity.addEventListener("change", quantityUpdate)

    function quantityUpdate(event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1

        }

        console.log(input)

    }



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


    const totalQty = document.getElementById("totalQuantity");

    let total = 0
    storageCart.forEach(item => {

        let eachQty = item.quantity
        total = total + eachQty
    })
    totalQty.textContent = total


    const totalPrice = document.getElementById("totalPrice");

    let totalPriceText = 0
    storageCart.forEach(item => {

        let eachQty = item.quantity
        totalPriceText = totalPriceText + (eachQty * canapData.price)
    })

    totalPrice.textContent = totalPriceText









    const deleteBtn = document.querySelectorAll(".cart__item__content__settings__delete")
    // for (i = 0; i < deleteBtn.length; i++) {
    //     // deleteBtn[i].addEventListener('click', () => deleteItem(item));
    //     deleteBtn[i].addEventListener('click', () => { console.log("hello") });
    // }


    // const deleteBtn = document.querySelectorAll(".cart__item__content__settings__delete")

    // deleteBtn.forEach((bt) => {
    //     bt.addEventListener('click', () => { console.log("hello") });
    // })



    // for (i = 0; i < deleteBtn.length; i++) {
    //     // deleteBtn[i].addEventListener('click', () => deleteItem(item));
    //     deleteBtn[i].addEventListener('click', () => { console.log("hello") });
    // }

    // let button = Array.prototype.slice.call(deleteBtn);
    // console.log(button);

    console.log(container.dataset);


    // function deleteItem(item) {

    //     // let index = storageCart.findIndex((product) => product.id === item.id && product.color === item.color)
    //     // storageCart.splice(index, 1)

    // }


}
