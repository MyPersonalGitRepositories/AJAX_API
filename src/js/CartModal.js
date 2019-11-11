let _makeOrder = ({}) => {

//<button type="button"  class="totalPriceBut btn btn-warning btn-sm">Maybe you want to know total price?))</button>
    ($(`  
  <div class="totPrice">
  <div style="margin-top: 5px; text-decoration: underline; text-decoration-color: #c69500" class="totPrice-count">Total price: 0</div>
</div>
  <form class="orderForm">
                    
                    <label for="formHeader">Fill the form to order these products. </label>
                    <div class="form-group">
                      
                        <input type="text" class="form-control" id="clientName" placeholder="Your name">
                    </div>
                    <div class="form-group">
                      
                        <input type="tel" class="form-control" id="clientPhone" placeholder="Your phone number">
                   
                    </div>
                   
                    <div class="form-group">
                      
                        <input type="email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Your email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else;)</small>
                    </div>
                    
                    
                    
                    <button type="submit" class="submitButton btn btn-info btn-sm" style="margin-bottom: 10px; float: right">Submit</button>
                </form>`)).appendTo(".modal-body");


};

module.exports = _makeOrder;