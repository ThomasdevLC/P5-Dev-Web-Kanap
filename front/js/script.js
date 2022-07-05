console.log("helllo")


function init() {
    // récuperer nos produits
    // afficher les produits
    displayProducts()

}

function displayProducts() {
    let sectionElement = document.getElementById("items")

    let a = document.createElement("a")
    sectionElement.appendChild(a)

};

init();