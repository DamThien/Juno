const APIcart = 'https://61bc10bdd8542f0017824520.mockapi.io/addpr';
const APIlogin = 'https://61bc10bdd8542f0017824520.mockapi.io/user';
const APIgiohang = 'https://61bc10bdd8542f0017824520.mockapi.io/order';
var a = '';
var dem = 0;
var total = 0;
var tong = 0;
// tinh san pham vao gio hang 
function showcart() {

    axios.get(`${APIcart}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {

            document.getElementById('tbl').innerHTML += `
            <tr>
            <td >${i+1}</td>
            <td>${res.data[i].nameItem}</td>
            <td><img id ="kichthuoc" src="${res.data[i].image}" alt=""></td>
            <td id="cost${i}" >${res.data[i].price}</td>
            <td> <input type="number" value='${res.data[i].quanlity}' min="1"  id="quantity${i}" oninput="updatecar(${i}), updatetotal()" style="width: 37px;"></td>
            <td id="total${i}">${res.data[i].price}</td>
            <td ><button class="del" onclick ="deleteproduct(${res.data[i].id})">Delete</button></td>
          </tr>`;
        }
        updatetotal()
    })

}
// tinh tong san pham

function updatecar(x) {
    var qquanlity = parseInt(document.getElementById("quantity" + x).value); // thay đổi giá trị trong iput đẩy lên mock và tính tổng
    axios.get(`${APIcart}`).then(function(res) {
        document.getElementById("total" + x).innerHTML = qquanlity * res.data[x].price; // đẩy gái trị tổng vô mảng funtion enter
    })
    document.getElementById("quantity" + x).setAttribute("value", qquanlity);
    updatetotal()
}

function updatetotal() {
    var tong = 0;
    axios.get(`${APIcart}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            var quan = parseInt(document.getElementById("quantity" + i).value);
            tong += (quan * res.data[i].price);
        }
        document.getElementById("tien").innerHTML = tong + " VND";
        document.getElementById('sumtotal').innerHTML = tong + " VND";
        document.getElementById('tongtienbill').innerHTML = tong + " VND";
    });

}
// xoa san pham
function deleteproduct(id) {
    axios.delete(`${APIcart}/${id}`).then(

        () => {
            location.reload()
            alert("Bạn đã xóa thành công mặt hàng này")
        }
    )
}
// thông tin đặt hàng
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();


function checktt() {
    var tenkh = document.getElementById("fn").value;
    var sdt = document.getElementById("dt").value;
    var dc = document.getElementById("dc").value;
    if (tenkh == "" || sdt == "" || dc == "") {
        alert("Bạn phải điền đầy đủ thông tin")
        return
    }
}

function thanhtoan() {

    document.getElementById("cart1").style.display = "none"
    document.querySelector(".pag3").style.display = 'block'
    axios.get(`${APIcart}`).then(function(res) {
        document.getElementById('Date').innerHTML = day + "/" + month + "/" + year
        for (var i = 0; i < res.data.length; i++) {
            document.getElementById('nameProduct').innerHTML += i + 1 + ". " + res.data[i].nameItem + "</br> "
        }

    })
    axios.get(`${APIlogin}`).then(function(res) {
        id = window.localStorage.getItem('idlogin');
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id == id) {
                document.getElementById('fn').value = res.data[i].fullname
                document.getElementById('dt').value = res.data[i].phonenumber
                document.getElementById('dc').value = res.data[i].add_address
            }
        }
    })
    addIteminlogin()

}

function addIteminlogin() {
    var arr = [];
    axios.get(`${APIcart}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            var data = {
                nameItem: res.data[i].nameItem,
                price: res.data[i].price,
                quanlity: res.data[i].quanlity,
                total: res.data[i].price * res.data[i].quanlity,
                date: document.getElementById('Date').innerHTML
            }
            arr.push(data)
        }

        axios.get(`${APIlogin}`).then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id == id) {
                    arr1 = res.data[i].cart

                    for (var j = 0; j < arr.length; j++) {
                        arr1.push(arr[j])
                    }
                    var data1 = {
                        fullname: res.data[i].fullname,
                        phonenumber: res.data[i].phonenumber,
                        password: res.data[i].password,
                        add_address: res.data[i].add_address,
                        cart: arr1,
                        id: id,
                    }
                    axios.put(`${APIlogin}/${id}`, data1).then()

                }
            }

        })
    })


}
var array = [];

function abc() {


    var array = [];
    id = window.localStorage.getItem('idlogin');
    axios.get(`${APIcart}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            var quan = parseInt(document.getElementById("quantity" + i).value);
            var data = {
                nameItem: res.data[i].nameItem,
                price: res.data[i].price,
                quanlity: quan,
                total: res.data[i].price * quan
            }
            array.push(data)
        }




        document.getElementById('ten').innerHTML = document.getElementById('fn').value
        document.getElementById('sodienthoai').innerHTML = document.getElementById('dt').value
        document.getElementById('diachi').innerHTML = document.getElementById('dc').value
        document.getElementById('phuongthucthanhtoan').innerHTML = document.getElementById('exampleFormControlSelect').value
        axios.get(`${APIlogin}`).then(function(res) {
            var names = document.getElementById('dt').value
            for (var i = 0; i < res.data.length; i++) {
                if (names == res.data[i].phonenumber) {
                    var vdata = {
                        MaKH: res.data[i].id,
                        date: day + "/" + month + "/" + year,
                        mathang: array,
                        Tongtien: tong
                    }
                    axios.post(APIgiohang, vdata).then()
                }
            }


        });
        for (var i = 0; i < array.length; i++) {
            document.getElementById('chitiethoadon').innerHTML += `
            <tr>
            <td> ${array[i].nameItem}</td>
            <td> ${array[i].price}</td>
            <td> ${array[i].quanlity}</td>
            <td> ${array[i].total}</td>

            </tr>
            `
        }

        deleteItemofcart()
        localStorage.clear();

    })

}
showcart()