let _productInCart = ({
                          itemId,
                          itemCount
                      }) => {
    let $modalCart = ($(`<div class="prod"><div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <img src="${itemId.image_url}" alt="${itemId.name}" class="productImg img-fluid product-image ">
    </div>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">       
        <button type="button" id="${itemId.id}" class="deleteButton btn btn-warning btn-sm">Delete</button>
    </div>
</div>
<div class="row" style="padding-bottom: 10px; padding-top: 10px">
    <div class="decreaseButton col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <img src="img/left-arrow.png" width="15" height="auto" alt="left">
    </div>
    <div class="productAmount col-xs-2 col-sm-2 col-md-2 col-lg-2">
        ${itemCount}
    </div>
    <div class="increaseButton col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <img src="img/right-arrow.png" width="15" height="auto" alt="right">
    </div>    
</div></div>
`));
    $modalCart.appendTo(".modal-body");
    if (itemId.special_price != null) {
        ($(`<div class="product_price" style="font-size: 15px; text-decoration:line-through">`).text(parseInt(itemId.price) * itemCount + " uah")).appendTo($modalCart);
        ($(`<div class="product_special_price" style="padding-bottom: 10px; font-size: 15px">`).text(parseInt(itemId.special_price) * itemCount + " uah")).appendTo($modalCart);
        ($(`<div id="border" style="padding-bottom: 10px"></div>`)).appendTo($modalCart);
    } else {
        ($(`<div class="product_price" style="padding-bottom: 10px; font-size: 15px">`).text(parseInt(itemId.price) * itemCount + " uah")).appendTo($modalCart);
        ($(` <div id="border" style="padding-bottom: 10px"></div>`)).appendTo($modalCart);
    }

};

module.exports = _productInCart;