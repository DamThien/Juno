const APIdK = 'https://61bc10bdd8542f0017824520.mockapi.io/user';

// =============================================================
function dangky() {

    var add_name = document.getElementById('name').value;
    var add_phonenumber = document.getElementById('phone').value;
    var add_mail = document.getElementById('email').value;
    var add_password = document.getElementById('mk').value;
    var add_address = document.getElementById('address').value

    if (validatEemail() == false || (checkinput() == true)) {

        if (checkinput() == true) {
            alert("Enter full information, Please!")
        } else if (validatEemail() == false) {
            alert("Please enter a valid e-mail address.");
        }
    } else {
        axios.get(`${APIdK}`).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                if (add_mail == res.data[i].mail || add_phonenumber == res.data[i].add_phonenumber) {
                    alert('tài khoản đã tồn tại! vui lòng đăng ký bằng tài khoản khác')
                    return
                }
            }

            // post data có từ cái mock tao lạy m
            var data = {
                fullname: add_name,
                mail: add_mail,
                password: add_password,
                phonenumber: add_phonenumber,
                add_address: add_address
            }
            axios.post(APIdK, data)
                .then(() => {
                    alert("Logged up successfully!");
                    emailToAccount();
                    location.reload()
                })
        })
    }
}

function checkinput() {
    var name1 = document.getElementById('name').value;
    var add_phonenumber = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var passwordres = document.getElementById('mk').value;
    var add_address = document.getElementById('address').value;
    if (name1 == "" || email == "" || passwordres == "" || add_phonenumber == "" || add_address == "") {
        return true
    }
}

function validatEemail() {
    var x = document.getElementById('email').value
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < (atposition + 2) ||
        (dotposition + 2) >= x.length) {
        return false;
    }
}
// =============================================================

//  email gửi sau khi khách hàng đang ký
function emailToAccount() {
    var add_name = document.getElementById('name').value;
    var add_mail = document.getElementById('email').value;
    var add_password = document.getElementById('mk').value;
    var nhapthong = {
        userNamee_inf: add_name,
        pass_inf: add_password,
        email: add_mail
    };
    emailjs.send('service_7fmyhym', 'Dieuu', nhapthong).then(alert("check email please"))


}
// ============================================================