document.getElementById("loginBtn").onclick = () => {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "admin" && p === "123456") {
        localStorage.setItem("adminLogin", "true");
        window.location.href = "/Admin";
    } else {
        document.getElementById("error").textContent = "Sai tài khoản hoặc mật khẩu!";
    }
};
