import './scss/main.scss';

console.log(`The time is ${new Date()}`);

// $(function () {
//     $("#navbarToggle").blur(function (event) {
//         var screenWidth = window.innerWidth;
//         if (screenWidth < 768) {
//             $("#collapsable-nav").collapse('hide');
//         }
//     });
// });
//
// $('#btn').on('click', showModal);
//
// function showModal() {
//     $('#cart').modal('show');
// }

let _makeProduct = require('./js/item');

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
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});
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
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
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
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });

}




// var shoppingCart = (function () {
//
//     var cart = [];
//
//     function Item(name, price, count) {
//         this.name = name;
//         this.price = price;
//         this.count = count;
//     }
//
//     function saveCart() {
//         localStorage.setItem('shoppingCart', JSON.stringify(cart));
//     }
//
//     function loadCart() {
//         cart = JSON.parse(localStorage.getItem('shoppingCart'));
//     }
//
//     if (localStorage.getItem("shoppingCart") != null) {
//         loadCart();
//     }
//
//     var obj = {};
//
//     obj.addItemToCart = function (name, price, count) {
//         for (var item in cart) {
//             if (cart[item].name === name) {
//                 cart[item].count++;
//                 saveCart();
//                 return;
//             }
//         }
//         var item = new Item(name, price, count);
//         cart.push(item);
//         saveCart();
//     }
//
//     obj.setCountForItem = function (name, count) {
//         for (var i in cart) {
//             if (cart[i].name === name) {
//                 cart[i].count = count;
//                 break;
//             }
//         }
//     };
//
//     obj.removeItemFromCart = function (name) {
//         for (var item in cart) {
//             if (cart[item].name === name) {
//                 cart[item].count--;
//                 if (cart[item].count === 0) {
//                     cart.splice(item, 1);
//                 }
//                 break;
//             }
//         }
//         saveCart();
//     }
//
//     obj.removeItemFromCartAll = function (name) {
//         for (var item in cart) {
//             if (cart[item].name === name) {
//                 cart.splice(item, 1);
//                 break;
//             }
//         }
//         saveCart();
//     }
//     obj.clearCart = function () {
//         cart = [];
//         saveCart();
//     }
//
//     obj.totalCount = function () {
//         var totalCount = 0;
//         for (var item in cart) {
//             totalCount += cart[item].count;
//         }
//         return totalCount;
//     }
//
//     obj.totalCart = function () {
//         var totalCart = 0;
//         for (var item in cart) {
//             totalCart += cart[item].price * cart[item].count;
//         }
//         return Number(totalCart.toFixed(2));
//     }
//
//     obj.listCart = function () {
//         var cartCopy = [];
//         for (var i in cart) {
//             var item = cart[i];
//             var itemCopy = {};
//             for (var p in item) {
//                 itemCopy[p] = item[p];
//
//             }
//             itemCopy.total = Number(item.price * item.count).toFixed(2);
//             cartCopy.push(itemCopy)
//         }
//         return cartCopy;
//     }
//     return obj;
// })();
//
// $('.add-to-cart').click(function (event) {
//     event.preventDefault();
//     var name = $(this).data('name');
//     var price = Number($(this).data('price'));
//     shoppingCart.addItemToCart(name, price, 1);
//     displayCart();
// });
//
// // Clear items
// $('.clear-cart').click(function () {
//     shoppingCart.clearCart();
//     displayCart();
// });
//
//
// function displayCart() {
//     var cartArray = shoppingCart.listCart();
//     var output = "";
//     for (var i in cartArray) {
//         output += "<tr>"
//             + "<td>" + cartArray[i].name + "</td>"
//             + "<td>" + cartArray[i].price + " hrn.</td>"
//             + "<td><button class='minus-item btn btn-primary' data-name=" + cartArray[i].name + "><span class='glyphicon glyphicon-minus'></span></button></td>"
//             + "<td><span >" + cartArray[i].count + "</span></td>"
//             + "<td><button class='plus-item btn btn-primary' data-name=" + cartArray[i].name + "><span class='glyphicon glyphicon-plus'></span></button></td>"
//             + "</tr>"
//             + "<tr>"
//             + "<td><strong>Overall price: </strong>" + cartArray[i].total + "</td>"
//             + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + "><span class='glyphicon glyphicon-trash'></span></button></td>"
//             + "</tr>"
//         ;
//     }
//     $('.show-cart').html(output);
//     $('.total-cart').html(shoppingCart.totalCart());
//     $('.total-count').html(shoppingCart.totalCount());
// }
//
// $('.show-cart').on("click", ".delete-item", function (event) {
//     var name = $(this).data('name')
//     shoppingCart.removeItemFromCartAll(name);
//     displayCart();
// })
//
// $('.show-cart').on("click", ".minus-item", function (event) {
//     var name = $(this).data('name')
//     shoppingCart.removeItemFromCart(name);
//     displayCart();
// })
//
// $('.show-cart').on("click", ".plus-item", function (event) {
//     var name = $(this).data('name')
//     shoppingCart.addItemToCart(name);
//     displayCart();
// })
//
// $('.show-cart').on("change", ".item-count", function (event) {
//     var name = $(this).data('name');
//     var count = Number($(this).val());
//     shoppingCart.setCountForItem(name, count);
//     displayCart();
// });
//
// displayCart();