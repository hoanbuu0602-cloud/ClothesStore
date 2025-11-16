let productPopup = document.getElementById("productPopup");
let addProductBtn = document.getElementById("addProductBtn");
let saveBtn = document.getElementById("saveProduct");
let closePopup = document.getElementById("closePopup");

let editingIndex = null;

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("admin_products")) || [];
    const table = document.getElementById("productTableBody");

    table.innerHTML = "";

    products.forEach((p, index) => {
        table.innerHTML += `
            <tr>
                <td><img src="${p.image}" width="60"></td>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}₫</td>
                <td>${p.category}</td>
                <td>
                    <button onclick="editProduct(${index})" class="edit-btn">Sửa</button>
                    <button onclick="deleteProduct(${index})" class="delete-btn">Xóa</button>
                </td>
            </tr>
        `;
    });
}

addProductBtn.onclick = () => {
    editingIndex = null;
    document.getElementById("popupTitle").innerText = "Thêm sản phẩm";
    productPopup.style.display = "flex";
};

closePopup.onclick = () => productPopup.style.display = "none";

saveBtn.onclick = () => {
    const name = document.getElementById("pName").value.trim();
    const price = parseInt(document.getElementById("pPrice").value);
    const img = document.getElementById("pImg").value.trim();
    const category = document.getElementById("pCategory").value.trim();

    if (!name || !price || !img || !category) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("admin_products")) || [];

    if (editingIndex === null) {
        products.push({ name, price, image: img, category });
    } else {
        products[editingIndex] = { name, price, image: img, category };
    }

    localStorage.setItem("admin_products", JSON.stringify(products));
    productPopup.style.display = "none";
    loadProducts();
};

function editProduct(index) {
    const products = JSON.parse(localStorage.getItem("admin_products"));
    const p = products[index];

    editingIndex = index;

    document.getElementById("popupTitle").innerText = "Sửa sản phẩm";
    document.getElementById("pName").value = p.name;
    document.getElementById("pPrice").value = p.price;
    document.getElementById("pImg").value = p.image;
    document.getElementById("pCategory").value = p.category;

    productPopup.style.display = "flex";
}

function deleteProduct(i) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        let products = JSON.parse(localStorage.getItem("admin_products"));
        products.splice(i, 1);
        localStorage.setItem("admin_products", JSON.stringify(products));
        loadProducts();
    }
}

document.addEventListener("DOMContentLoaded", loadProducts);
