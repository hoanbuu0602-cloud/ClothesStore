const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');

document.getElementById('toRegister').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    formTitle.textContent = "Đăng ký";
});

document.getElementById('toLogin').addEventListener('click', e => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    formTitle.textContent = "Đăng nhập";
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Đăng nhập thành công!");
    window.location.href = "index.html"; // quay về trang chủ
});

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Đăng ký thành công!");
    window.location.href = "login.html"; // chuyển lại đăng nhập
});
