let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price,
                 }) => {
    let $product = $(`<div class=" item card" data-product-id="${id}">`);
    $product.append($(`<div class="img-container"><img src="${image_url}" alt="${name}" class="productImg"></div>`));
    $product.append($(`<div><span class="product-title" style="font-weight: bold"></div>`).text(name));

    if (special_price != null) {

        $product.append($(`<span class="product-price" style="text-decoration:line-through">`).text(price));
        $product.append($(`<span class="product_special_price">`).text(special_price));
    } else {
        $product.append($(`<span class="product-price">`).text(price));
    }
    $product.append($(`<br><button type="button" data-target="#myModal" data-toggle="modal" class="details btn btn-default btn-sm mt-2 mb-2" >`).text("Details"));
    $product.append($(`<button type="button" href="#cartBut" class="addToCart btn btn-info btn-sm mt-2 mb-2" data-product-id="${id}">`).text("Add to cart"));

    return $product;
};
module.exports = _makeHtml;