const APIdn = 'https://61bc10bdd8542f0017824520.mockapi.io/user';

function Login() {
    var userNamee_inf = document.getElementById('login').value;
    var pass_inf = document.getElementById('matkhau').value;

    if (userNamee_inf == "" || pass_inf == "") {
        alert("Hãy nhập đầy đủ thông tin!")
    } else {
        var d = "";
        var valid = false;
        axios.get(`${APIdn}`).then(res => {
            var dl = res.data;

            for (var i = 0; i < dl.length; i++) {
                if ((userNamee_inf == dl[i].mail) && (pass_inf == dl[i].password)) {
                    valid = true;
                    d = dl[i].mail
                    break;
                }
            }
            if (valid == true) {
                localStorage.setItem("email", userNamee_inf)
                alert(userNamee_inf + " Logged in successfully!")
                localStorage.setItem("fullname", userNamee_inf)
                localStorage.setItem("mail", d)
                    // valid = false;
            } else {
                alert("Hãy kiểm tra tài khoản của bạn!");
                document.getElementById('matkhau').value = "";
                document.getElementById('login').value = ""
            }
        })
    };
}