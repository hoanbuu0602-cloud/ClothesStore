function loadCategories() {
    const list = document.getElementById("categoryList");
    let cats = JSON.parse(localStorage.getItem("categories")) || [];

    list.innerHTML = "";

    cats.forEach((c, index) => {
        list.innerHTML += `
            <li>
                ${c}
                <button onclick="deleteCategory(${index})" class="delete-btn small">Xóa</button>
            </li>
        `;
    });
}

document.getElementById("addCategoryBtn").onclick = () => {
    let cats = JSON.parse(localStorage.getItem("categories")) || [];
    let newCat = document.getElementById("newCategory").value.trim();

    if (!newCat) return alert("Nhập tên danh mục!");

    cats.push(newCat);
    localStorage.setItem("categories", JSON.stringify(cats));
    loadCategories();
};

function deleteCategory(i) {
    let cats = JSON.parse(localStorage.getItem("categories"));
    cats.splice(i, 1);
    localStorage.setItem("categories", JSON.stringify(cats));
    loadCategories();
}

document.addEventListener("DOMContentLoaded", loadCategories);
