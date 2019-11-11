let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price,
                 }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image" >`));
    $product.append($(`<span class="product-title" style="font-weight: bold">`).text(name));

    if (special_price != null) {

        $product.append($(`<span class="product-price" style="text-decoration:line-through">`).text(price));
        $product.append($(`<span class="product_special_price">`).text(special_price));
    } else {
        $product.append($(`<span class="product-price">`).text(price));
    }
    $product.append($(`<button type="button" data-target="#myModal" data-toggle="modal" class="details btn btn-default btn-sm mt-2 mb-2" >`).text("Details"));
    $product.append($(`<button type="button" href="#cartBut" class="addToCart btn btn-info btn-sm mt-2 mb-2" data-product-id="${id}">`).text("Add to cart"));
    //$product.append($('<span class="product-description">').text(description));

    return $product;
};
module.exports = _makeHtml;