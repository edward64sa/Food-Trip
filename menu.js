
var cartVisible = false;


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    
    var btnesRemoveItem = document.getElementsByClassName('btn-Remove');
    for(var i=0;i<btnesRemoveItem.length; i++){
        var button = btnesRemoveItem[i];
        button.addEventListener('click',RemoveItemcart);
    }

   
    var btnesSumarAmount = document.getElementsByClassName('sumar-Amount');
    for(var i=0;i<btnesSumarAmount.length; i++){
        var button = btnesSumarAmount[i];
        button.addEventListener('click',sumarAmount);
    }

   
    // var btnesRestarAmount = document.getElementsByClassName('restar-Amount');
    // for(var i=0;i<btnesRestarAmount.length; i++){
    //     var button = btnesRestarAmount[i];
    //     button.addEventListener('click',restarAmount);
    // }

    
    var btnesAddtocart = document.getElementsByClassName('btn-item');
    for(var i=0; i<btnesAddtocart.length;i++){
        var button = btnesAddtocart[i];
        button.addEventListener('click', AddtocartClicked);
    }

  
    document.getElementsByClassName('btn-pay')[0].addEventListener('click',payClicked)
}

function payClicked(){
    alert("Thank You For Ordering");
   
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    actualizarTotalcart();
    ocultarcart();
}

function AddtocartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imageSrc);

    agregarItemAlcart(title, price, imageSrc);

    hacerVisiblecart();
}


function hacerVisiblecart(){
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}


function agregarItemAlcart(title, price, imageSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemscart = document.getElementsByClassName('cart-items')[0];

    
    var numsItemscart = itemscart.getElementsByClassName('cart-item-title');
    for(var i=0;i < numsItemscart.length;i++){
        if(numsItemscart[i].innerText==title){
            alert("You Have Already Added This Item");
            return;
        }
    }

    var itemcartContent = `
        <div class="cart-item">
            <img src="${imageSrc}" width="80px" alt="">
            <div class="cart-item-detalles">
                <span class="cart-item-title">${title}</span>
                <div class="selector-Amount">
                    <i class="fa-solid fa-minus restar-Amount"></i>
                    <input type="text" value="1" class="cart-item-Amount" disabled>
                    <i class="fa-solid fa-plus sumar-Amount"></i>
                </div>
                <span class="cart-item-price">${price}</span>
            </div>
            <button class="btn-Remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemcartContent;
    itemscart.append(item);

    
     item.getElementsByClassName('btn-Remove')[0].addEventListener('click', RemoveItemcart);

    
    var btnRestarAmount = item.getElementsByClassName('restar-Amount')[0];
    btnRestarAmount.addEventListener('click',restarAmount);

    
    var btnSumarAmount = item.getElementsByClassName('sumar-Amount')[0];
    btnSumarAmount.addEventListener('click',sumarAmount);

   
    actualizarTotalcart();
}

function sumarAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-Amount')[0].value);
    var AmountActual = selector.getElementsByClassName('cart-item-Amount')[0].value;
    AmountActual++;
    selector.getElementsByClassName('cart-item-Amount')[0].value = AmountActual;
    actualizarTotalcart();
}

function restarAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-Amount')[0].value);
    var AmountActual = selector.getElementsByClassName('cart-item-Amount')[0].value;
    AmountActual--;
    if(AmountActual>=1){
        selector.getElementsByClassName('cart-item-Amount')[0].value = AmountActual;
        actualizarTotalcart();
    }
}


function RemoveItemcart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
  
    actualizarTotalcart();

    
    ocultarcart();
}

function ocultarcart(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalcart(){
    
    var cartcontainer = document.getElementsByClassName('cart')[0];
    var cartItems = cartcontainer.getElementsByClassName('cart-item');
    var total = 0;

    for(var i=0; i< cartItems.length;i++){
        var item = cartItems[i];
        var priceElement = item.getElementsByClassName('cart-item-price')[0];
       
        var price = parseFloat(priceElement.innerText.replace('$','').replace('.',''));
        var AmountItem = item.getElementsByClassName('cart-item-Amount')[0];
        console.log(price);
        var Amount = AmountItem.value;
        total = total + (price * Amount);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-price-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}








