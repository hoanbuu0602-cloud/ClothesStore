// Mở popup sản phẩm
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".view-detail").forEach(button => {
    button.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price).toLocaleString() + "₫";
        const image = card.dataset.image;
        modalImg.src = image;
        modalName.textContent = name;
        modalPrice.textContent = price;

        modal.style.display = "flex";
    });
});

// Đóng popup
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Chọn size
document.querySelectorAll(".size-table button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".size-table button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
    });
});

// Style khi chọn size
const style = document.createElement('style');
style.innerHTML = `
  .size-table button.selected {
    background-color: #111;
    color: #fff;
  }
`;
document.head.appendChild(style);
