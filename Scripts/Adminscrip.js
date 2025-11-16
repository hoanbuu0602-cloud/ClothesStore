document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu li').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    alert('Đăng xuất thành công!');
    window.location.href = 'index.html';
});
