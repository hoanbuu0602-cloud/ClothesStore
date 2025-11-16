document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tbody = document.getElementById("cart-body");
    const totalPrice = document.getElementById("total-price");

    tbody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="5" style="padding:20px">Giỏ hàng trống.</td></tr>
        `;
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        tbody.innerHTML += `
            <tr>
                <td>
                    <img src="${item.image}">
                    <br>${item.name}<br>
                    <small>Size: ${item.size}</small>
                </td>

                <td>${item.price.toLocaleString()}₫</td>

                <td>
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </td>

                <td>${itemTotal.toLocaleString()}₫</td>

                <td>
                    <span class="remove-btn" onclick="removeItem(${index})">Xóa</span>
                </td>
            </tr>
        `;
    });

    totalPrice.textContent = total.toLocaleString() + "₫";

    // liên kết nút đặt hàng
    document.getElementById("go-order").onclick = () => {
        window.location.href = "/Home/Order";
    };
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadOrderSummary();

    document.getElementById("orderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        submitOrder();
    });
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    let total = 0;
    orderItems.innerHTML = "";

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderItems.innerHTML += `
            <li>
                ${item.name} (Size: ${item.size}) – 
                ${item.quantity} x ${item.price.toLocaleString()}₫ 
                = <strong>${itemTotal.toLocaleString()}₫</strong>
            </li>
        `;
    });

    orderTotal.textContent = total.toLocaleString() + "₫";
}

function submitOrder() {
    const name = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !phone || !address || !payment) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Xóa giỏ hàng sau khi đặt
    localStorage.removeItem("cart");

    document.getElementById("successPopup").style.display = "flex";
}
