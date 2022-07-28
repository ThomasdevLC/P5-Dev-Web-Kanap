
function displayOrderId() {
    const getOrderId = new URL(location.href).searchParams.get("orderId");
    document.getElementById("orderId").textContent = getOrderId

}

displayOrderId()


// function clearLocalStorage() {
//     window.localStorage.clear()

// }

// clearLocalStorage()





