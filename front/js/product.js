let articleId = new URL(location.href).searchParams.get("id");

const CanapData = async () => {
    await fetch(`http://localhost:3000/api/products/${articleId}`)
        .then((res) => res.json()
            .then(function (article) {
                addArticle(article)
            }));

}

CanapData()



const addArticle = (article) => {

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
    // console.log(options);


    // for (i = 0; i < options.length; i++) {
    //     console.log(options[i]);
    //     let option = document.createElement("option")
    //     option.setAttribute('value', options[i])
    //     option.appendChild(document.createTextNode(options[i]))
    //     select.appendChild(option)
    // }


    options.forEach(option => {

        let optionColor = document.createElement("option")
        optionColor.setAttribute('value', option)
        optionColor.appendChild(document.createTextNode(option))
        select.appendChild(optionColor)
    });

}


const btn = document.getElementById("addToCart");

btn.addEventListener("click", () => {

    const colorChoice = document.getElementById("colors").value;
    const inputQty = document.getElementById("quantity").value

    let storageCart = localStorage.getItem("canap_cart")

    let cart
    if (storageCart)
        cart = JSON.parse(storageCart)
    else
        cart = []


    let dataChoice = {
        id: articleId,
        color: colorChoice,
        quantity: Number(inputQty),
    }

    cart.push(dataChoice)

    localStorage.setItem("canap_cart", JSON.stringify(cart))


    if (colorChoice == null || colorChoice === "" || inputQty == null || inputQty == 0) {
        alert("Veuillez selectionner une couleur et une quantité")
    }


    window.location.href = "index.html"

});



// const inputQty = document.getElementById("quantity");
// let finalQty = "";

// inputQty.addEventListener("input", (e) => {
//     finalQty = e.target.value;
//     console.log(finalQty)
// });


// const colorChoice = document.getElementById("colors");
// let finalColor = "";

// colorChoice.addEventListener("input", (e) => {
//     finalColor = e.target.value;
//     console.log(finalColor)
// })


