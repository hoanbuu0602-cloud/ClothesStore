let selectedSize = "";
let currentProduct = null;

const modal = document.getElementById("product-modal");
const cartCount = document.getElementById("cart-count");

document.querySelectorAll(".view-detail").forEach(btn => {
    btn.addEventListener("click", (e) => {

        const card = e.target.closest(".product-card");

        currentProduct = {
            name: card.dataset.name,
            price: parseInt(card.dataset.price),
            image: card.dataset.image,
            category: card.dataset.category
        };

        document.getElementById("modal-image").src = currentProduct.image;
        document.getElementById("modal-name").textContent = currentProduct.name;
        document.getElementById("modal-price").textContent = currentProduct.price.toLocaleString() + "₫";

        modal.style.display = "flex";
    });
});

// Chọn size
document.querySelectorAll(".size-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSize = btn.textContent;
    }
});

// Thêm vào giỏ hàng → chuyển sang Order
document.getElementById("add-to-cart").onclick = () => {

    if (!selectedSize) {
        alert("Vui lòng chọn size!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(p => p.name === currentProduct.name && p.size === selectedSize);

    if (existing) existing.quantity += 1;
    else {
        cart.push({ ...currentProduct, size: selectedSize, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    window.location.href = "/Home/Order";  // CHUYỂN TRANG
};

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((s, p) => s + p.quantity, 0);
    cartCount.textContent = total;
}

updateCartCount();

document.querySelector(".close").onclick = () => modal.style.display = "none";
