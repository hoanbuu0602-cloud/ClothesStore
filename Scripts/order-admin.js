function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const body = document.getElementById("orderTableBody");

    body.innerHTML = "";

    orders.forEach((o, index) => {
        body.innerHTML += `
            <tr>
                <td>#${o.id}</td>
                <td>${o.name}</td>
                <td>${o.phone}</td>
                <td>${o.total.toLocaleString()}₫</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option value="Pending" ${o.status == "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Shipping" ${o.status == "Shipping" ? "selected" : ""}>Shipping</option>
                        <option value="Completed" ${o.status == "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>

                <td>
                    <button onclick="viewOrder(${index})" class="edit-btn">Xem</button>
                    <button onclick="deleteOrder(${index})" class="delete-btn">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function updateStatus(i, status) {
    let orders = JSON.parse(localStorage.getItem("orders"));
    orders[i].status = status;

    localStorage.setItem("orders", JSON.stringify(orders));
}

function viewOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const o = orders[index];

    let html = `
        <p><b>Khách hàng:</b> ${o.name}</p>
        <p><b>SĐT:</b> ${o.phone}</p>
        <p><b>Địa chỉ:</b> ${o.address}</p>

        <h3>Sản phẩm:</h3>
        <ul>
    `;

    o.items.forEach(p => {
        html += `<li>${p.name} (Size: ${p.size}) x ${p.quantity} — ${p.price.toLocaleString()}₫</li>`;
    });

    html += `</ul>`;
    html += `<h3>Tổng tiền: ${o.total.toLocaleString()}₫</h3>`;

    document.getElementById("orderDetail").innerHTML = html;
    document.getElementById("orderPopup").style.display = "flex";
}

function deleteOrder(index) {
    if (confirm("Xóa đơn hàng?")) {
        let orders = JSON.parse(localStorage.getItem("orders"));
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    }
}

document.getElementById("closeOrderPopup").onclick = () =>
    document.getElementById("orderPopup").style.display = "none";

document.addEventListener("DOMContentLoaded", loadOrders);
