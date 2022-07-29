init()

async function init() {
    const products = await fetch('http://localhost:3000/api/products/');
    createArticle(await products.json());
}

// DISPLAY ALL PRODUCTS DOM
const createArticle = (canaps) => {

    canaps.forEach((canap) => {

        const container = document.getElementById("items");

        const card = document.createElement("a");
        card.setAttribute('href', `./product.html?id=${canap._id}`);

        const article = document.createElement("article");
        const image = document.createElement("img");

        image.setAttribute('src', canap.imageUrl);
        image.setAttribute('alt', canap.altTxt);

        const title = document.createElement("h3");
        title.classList.add("productName");
        const titleText = document.createTextNode(canap.name);
        title.appendChild(titleText)

        const paragraphe = document.createElement("p");
        paragraphe.classList.add("productDescription");
        const descText = document.createTextNode(canap.description);
        paragraphe.appendChild(descText)

        article.appendChild(title);
        article.appendChild(image);
        article.appendChild(paragraphe);
        card.appendChild(article);
        container.appendChild(card);

    });
}


