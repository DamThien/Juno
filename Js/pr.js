const APIitem = 'https://61bc10bdd8542f0017824520.mockapi.io/product';
const APIcart = 'https://61bc10bdd8542f0017824520.mockapi.io/addpr';

function showData(type) {
    document.getElementById('product').innerHTML = ''
    axios.get(`${APIitem}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].type == type) {
                document.getElementById('product').innerHTML += `
                    <div class="col-12 col-sm-6 col-md-4 mb-3 ">     
                        <div class="card box" style="width: 20rem;height: 34rem;">
                                <img class="card-img-top sizeimg" src="${res.data[i].image}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title text-center">${res.data[i].nameItem}</h4>
                                <h5 class="card-text text-danger text-center font-weight-bold">${res.data[i].price}</h5>
                                <button type= "button" id="cart" class="btn btn-warning" onclick="addcart(${res.data[i].id})"> <i class="fas fa-shopping-bag"></i> Mua ngay</button>
                            </div>
                        </div>
                    </div>  
                `
            }
        }
    })
}

function addcart(id) {
    var names = localStorage.getItem("email");
    if (names == null || names == undefined) {
        alert('Bạn phải đăng nhập để mua hàng');
        return
    }

    axios.get(`${APIitem}/${id}`).then(function(res) {
        var datas = {
            id: res.data.id,
            nameItem: res.data.nameItem,
            image: res.data.image,
            price: parseInt(res.data.price) * 1000,
            quanlity: 1,
            total: parseInt(res.data.price) * 1000,
        };

        axios.post(APIcart, datas).then()
        alert("Đã thêm vào giỏ hàng")
    })
}

function showallData() {
    document.getElementById('product').innerHTML = ''
    axios.get(`${APIitem}`).then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            document.getElementById('product').innerHTML += `
                    <div class="col-12 col-sm-6 col-md-4 mb-3 ">     
                        <div class="card box" style="width: 20rem;height: 34rem;">
                                <img class="card-img-top sizeimg" src="${res.data[i].image}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title text-center">${res.data[i].nameItem}</h4>
                                <h5 class="card-text text-danger text-center font-weight-bold">${res.data[i].price}</h5>
                                <button type= "button" id="cart" class="btn btn-warning" onclick="addcart(${res.data[i].id})"> <i class="fas fa-shopping-bag"></i> Mua ngay</button>
                            </div>
                        </div>
                    </div>  
                `
        }
    })
}
showallData();