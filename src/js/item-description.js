let _makeDesc = ({
                     id,
                     name,
                     description,
                     image_url,
                     price,
                     special_price,
                 }) => {
    ($(`<button type="button" class="close"  data-dismiss="modal">&times;</button>`)).appendTo(".modal-header");

    ($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image ">`)).appendTo(".modal-body");
    ($(`<div class="description" ></div>`).text("Description: " + "\n" + description)).appendTo(".modal-body");
    if (special_price != null) {
        ($(`<div class="product_price">`).text(price + " uah")).appendTo(".modal-body");
        ($(`<div class="product_special_price">`).text(special_price + " uah")).appendTo(".modal-body");
    } else {
        ($(`<div class="">⠀</div>`)).appendTo(".modal-body");
        ($(`<div class="product_price">`).text(price + " uah")).appendTo(".modal-body");
    }
    ($(`<button type="button" class="addToCartDesc btn float-left" data-product-id="${id}">Add to cart</button>`)).appendTo(".modal-footer");
    //($(`<button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>`)).appendTo('.modal-footer');
};

module.exports = _makeDesc;