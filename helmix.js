var add=document.getElementById('add')
var sub=document.getElementById('sub')

add.addEventListener('click',()=>{
    var num=document.getElementById('num').innerHTML;
  num++;
  document.getElementById('num').innerHTML=num++;
});

sub.addEventListener('click',()=>{
    var num=document.getElementById('num').innerHTML;
    if(num==0){
        return false;
    }else{
     num--;
     document.getElementById('num').innerHTML=num--;
    }
});




let cart = [];

// Function to Add Item to Cart
function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    updateCart();
    toggleCart(); // Open the cart when an item is added
}

// Function to Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to Increase/Decrease Quantity
function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1); // Remove item if quantity goes to 0
    }
    updateCart();
}

// Function to Update Cart UI
function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p><b>${item.name}</b></p>
                    <p>Rs. ${item.price}</p>
                    <div class="quantity">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
    });

    cartCount.innerText = itemCount;
    cartTotal.innerText = total;
}

// Function to Toggle Cart Open/Close
function toggleCart() {
    let cartPanel = document.getElementById("cart-panel");
    if (cartPanel.style.right === "0px") {
        cartPanel.style.right = "-400px";
    } else {
        cartPanel.style.right = "0px";
    }
}
