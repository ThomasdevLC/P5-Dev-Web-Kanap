let articleId = new URL(location.href).searchParams.get("id");

async function init() {
    const canapData = await fetch(`http://localhost:3000/api/products/${articleId}`);
    displayArticle(await canapData.json());
}

init()

// DISPLAY SELECTED PRODUCT DOM
const displayArticle = (article) => {

    const itemImg = document.getElementById("item__img");
    const image = document.createElement("img");
    image.setAttribute('src', article.imageUrl);
    image.setAttribute('alt', article.altTxt);
    itemImg.appendChild(image);


    document.getElementById("title").textContent = article.name;
    document.getElementById("price").textContent = article.price;
    document.getElementById("description").textContent = article.description;

    const options = article.colors

    const select = document.getElementById("colors")

    options.forEach(option => {

        const optionColor = document.createElement("option")
        optionColor.setAttribute('value', option)
        optionColor.appendChild(document.createTextNode(option))
        select.appendChild(optionColor)
    });

}


// ADD PRODUCT TO CART
const btn = document.getElementById("addToCart");

btn.addEventListener("click", () => {

    const colorChoice = document.getElementById("colors").value;
    const inputQty = parseInt(document.getElementById("quantity").value)

    if (colorChoice == null || colorChoice === "" || inputQty == null || inputQty == 0) {
        alert("Veuillez renseigner une couleur et une quantité")
    }

    else {
        btn.textContent = "Article(s) ajouté(s) !"
        btn.style.color = "greenyellow";

        const storageCart = localStorage.getItem("canap_cart")
        const cart = storageCart ? JSON.parse(storageCart) : [];

        const findProductIndex = (element) => element.id === articleId && element.color === colorChoice;

        const productIndex = cart.findIndex(findProductIndex)

        if (productIndex == -1) {
            const dataChoice = {
                id: articleId,
                color: colorChoice,
                quantity: inputQty,
            }
            cart.push(dataChoice)

        } else {

            cart[productIndex].quantity += inputQty
        }

        localStorage.setItem("canap_cart", JSON.stringify(cart))

        setTimeout(() => {
            if (confirm("Cliquez OK pour continuer vos achats, ou ANNULER pour être redirigé vers votre panier")) {
                window.location.href = "index.html"
            }
            else {
                window.location.href = "cart.html"
            }
        }, 800)


    }
});

