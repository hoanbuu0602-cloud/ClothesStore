
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
let selectedSize = "";
let currentProduct = null;


document.querySelectorAll(".view-detail").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");

        if (!card) return;

        currentProduct = {
            id: card.getAttribute("data-id") || Date.now(),
            name: card.getAttribute("data-name"),
            price: parseInt(card.getAttribute("data-price")),
            image: card.getAttribute("data-image"),
        };

        modalImage.src = currentProduct.image;
        modalName.textContent = currentProduct.name;
        modalPrice.textContent = currentProduct.price.toLocaleString() + "₫";

        selectedSize = "";
        document.querySelectorAll(".size-table button")
            .forEach(b => b.classList.remove("selected"));


        modal.style.display = "flex";
        modal.classList.add("fade-in");
    });
});

document.querySelector(".close").onclick = closeModal;

function closeModal() {
    modal.classList.remove("fade-in");
    modal.classList.add("fade-out");

    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fade-out");
    }, 200);
}


window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});


document.querySelectorAll(".size-table button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".size-table button")
            .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        selectedSize = btn.textContent;
    });
});


const btnAdd = document.getElementById("add-to-cart");

if (btnAdd) {
    btnAdd.addEventListener("click", () => {
        if (!selectedSize) {
            alert("❗ Vui lòng chọn size trước khi thêm vào giỏ hàng!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existing = cart.find(item =>
            item.id === currentProduct.id &&
            item.size === selectedSize
        );

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                size: selectedSize,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();

        closeModal();

        window.location.href = "/Cart";
    });

}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);

    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
}

document.addEventListener("DOMContentLoaded", updateCartBadge);


if (document.getElementById("cart-body")) {
    loadCartPage();
}

function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-body");
    const totalPrice = document.getElementById("total-price");

    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">Giỏ hàng trống</td></tr>`;
        totalPrice.textContent = "0₫";
        return;
    }

    cart.forEach((item, index) => {
        cartBody.innerHTML += `
        <tr>
            <td>
                <img src="${item.image}" width="55">
                <strong>${item.name}</strong>
                <br><small>Size: ${item.size}</small>
            </td>
            <td>${item.price.toLocaleString()}₫</td>

            <td class="quantity">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </td>

            <td>${(item.price * item.quantity).toLocaleString()}₫</td>

            <td><button onclick="removeItem(${index})" class="del-btn">X</button></td>
        </tr>`;
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toLocaleString() + "₫";
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
    updateCartBadge();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCartPage();
    updateCartBadge();
}


const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {
            const name = card.getAttribute("data-name").toLowerCase();
            card.style.display = name.includes(keyword) ? "block" : "none";
        });
    });
}


const style = document.createElement("style");
style.textContent = `
    #product-modal { 
        display: none; 
        opacity: 0; 
        transition: opacity .2s ease; 
    }
    #product-modal.fade-in { opacity: 1; }
    #product-modal.fade-out { opacity: 0; }
`;
document.head.appendChild(style);
document.getElementById("add-to-cart").addEventListener("click", () => {
    ...

    window.location.href = "/Cart"; 
});

