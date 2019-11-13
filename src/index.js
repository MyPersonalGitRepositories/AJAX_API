import './scss/main.scss';

console.log(`The time is ${new Date()}`);

let _makeProduct = require('./js/item');
let _productInCart = require('./js/itemInCart');

jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);
        json.forEach(product => $('.product-grid').append(_makeProduct(product)));
        console.log('Added to grid');
    },
    error: function (xhr) {
        alert("An error occurred: " + xhr.status + " " + xhr.statusText);
    },
});

let _listCategories = ({id, name}) => {
    return ($('<br><a class="dropdown-item" href="#" id="' + id + '"></a>').text(name));
};
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded category list!');
        // console.log(json);
        console.table(json);
        json.forEach(category => $('.dropdown-menu').append(_listCategories(category)));
        $(".dropdown-item").on('click', dropdownFunction);
        console.log('Added to list');
    },
    error: function (xhr) {
        alert("An error occurred: " + xhr.status + " " + xhr.statusText);
    },
});

function dropdownFunction() {
    let num = $(this).attr("id");
    $(".product-grid").empty();
    jQuery.ajax({

        url: 'https://nit.tron.net.ua/api/product/list/category/' + num,
        method: 'get',
        dataType: 'json',
        success: function (json) {

            console.log('Loaded via AJAX!');
            // console.log(json);
            console.table(json);
            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });

}
let arr = [];
let c = 0;
$(document).on('click', '.addToCart', function () {
    var num2 = $(this).closest('.card').data('product-id');
    //addCartItem(num2);
    // test1 = num2;
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${num2}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            /*if(arr.contains(itemId.name)){

            }*/
            c++;
            $(".prodInCartAmount").empty();
            ($(`<div>${c}</div>`)).appendTo(".prodInCartAmount");
            let kr = true;
            for (let l = 0; l < arr.length; l++) {
                if (arr[l].itemId.id == num2) {

                    console.log(arr[l].itemCount);
                    arr[l].itemCount++;
                    console.log(arr[l].itemCount);
                    kr = false;
                    break;
                }

            }
            if (kr)
                arr.push({itemId: json, itemCount: 1});
            //_productInCart(json);

        },
        error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });


});

$(document).on('click', '.addToCartDesc', function () {
    var num2 = $(this).data('product-id');
    //addCartItem(num2);
    // test1 = num2;
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${num2}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {

            c++;
            $(".prodInCartAmount").empty();
            ($(`<div>${c}</div>`)).appendTo(".prodInCartAmount");
            let kr = true;
            for (let l = 0; l < arr.length; l++) {
                if (arr[l].itemId.id == num2) {

                    console.log(arr[l].itemCount);
                    arr[l].itemCount++;
                    console.log(arr[l].itemCount);
                    kr = false;
                    break;
                }

            }
            if (kr)
                arr.push({itemId: json, itemCount: 1});
            //_productInCart(json);

        },
        error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });


});


//dropdown
$(".dropdown-item").on('click', dropdownFunction);
//DETAILS
let _makeDesc = require('./js/item-description');
$(document).on('click', '.details', function () {
    // let num = $(this).attr("data-product-id");
    let num = $(this).closest('.card').data('product-id');
    console.log(num);
    $(".modal-header").empty();
    $(".modal-body").empty();
    $(".modal-footer").empty();
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${num}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            _makeDesc(json);

        },
        error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });
    $('#myModal').modal('show');
});


$('.All').on('click', function () {
    $(".product-grid").empty();
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            // console.log(json);
            console.table(json);
            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });
});


let _makeOrder = require('./js/CartModal');

let kD = 0;
$('.cartMine').on('click', function () {

    $(".modal-header").empty();
    ($(`
    <div class="cartHeader">Cart</div>
    <button type="button" class="close " style="margin-left: 5px" data-dismiss="modal">&times;</button>`)).appendTo(".modal-header");
    $(".modal-body").empty();
    $(".modal-footer").empty();

    arr.forEach(_productInCart);

    if (arr.length == 0) {
        ($(`<div style="margin-top: 5px">Your cart is empty(</div>`)).appendTo('.modal-body');
    } else {


        for (let i = 0; i < arr.length; i++) {

            kD += arr[i].itemId.price * arr[i].itemCount;

        }
        console.log(kD);


        jQuery.ajax({
            url: 'https://nit.tron.net.ua/api/product/list/category/4',
            method: 'get',
            dataType: 'json',
            success: function (json) {
                _makeOrder(json);
                $('.totPrice > .totPrice-count').text('Total price: ' + kD);

            },
            error: function (xhr) {
                alert("An error occurrd: " + xhr.status + " " + xhr.statusText);
            },
        });

    }
    $('#myModal').modal('show');
});


$(document).on('click', '.deleteButton', function () {

    let num = $(this).attr("id");
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].itemId.id + ' ' + num);
        if (arr[i].itemId.id === num) {
            kD -= arr[i].itemId.price * arr[i].itemCount;
            c -= arr[i].itemCount;
            $(".prodInCartAmount").empty();
            $(`<div>${c}</div>`).appendTo(".prodInCartAmount");
            console.log('here ' + arr[i].itemId.price + ' ' + kD + ' ' + arr[i].itemCount);
            arr.splice(i, 1);
            break;
        }
    }
    $('.totPrice > .totPrice-count').text('Total price: ' + kD);

    console.log(arr);
    $(this).parent().parent().parent().remove();
    //('.totPrice').empty();
});

//$(document).on('click', '.totalPriceBut', function () {
//});
let errAmount = 0;
$(document).on('click', '.submitButton', function (e) {
    e.preventDefault();
    let $name = $('#clientName').val();
    let $email = $('#Email').val();
    let $tel = $('#clientPhone').val();
    let $data = {
        token: 'W0RlP4xUpxJD_kXGnxJ7',
        name: $name,
        phone: $tel,
        email: $email,
    };

    arr.forEach(product => {
        $data[`products[${product.itemId.id}]`] = product.itemCount;
    });

    jQuery.ajax({
        url: "https://nit.tron.net.ua/api/order/add",
        method: 'post',
        data: $data,
        dataType: 'json',

        success: function (json) {
            if (json.status === "success") {
                $(".modal-header").empty();
                $(".modal-body").empty();
                $(".modal-footer").empty();
                arr.splice(0, arr.length);

                $(".prodInCartAmount").text('0');
                c = 0;
                kD = 0;
                $(`<div class="successfulOrder">Thank you for your order!</div>`).appendTo('.modal-body');
                errAmount = 0;

            } else {
                if (errAmount == 0) {
                    console.log(json);
                    for (let key in json.errors) {
                        json.errors[key].forEach(err => $(`.modal-body`).append($(`<div style="color:darkred">`).text(err)));
                    }
                }
                errAmount++;

            }

            $('#myModal').modal('show');
        },
        error:
            function (xhr) {
                alert("An error occurred: " + xhr.status + json);
            },
    });


});