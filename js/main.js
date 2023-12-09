

var productCount = document.getElementById("pp");
var productPrice = document.getElementById("pc");
var nProduct = document.getElementById("np");
var addProdact = document.getElementById("addProdact");
var btnUpdate = document.getElementById("update");
var temp;
var allProduct = [];

let curentIndexUpdate


if(localStorage.getItem("allProduct") == null){

  allProduct = []
}
else {

  allProduct = JSON.parse(localStorage.getItem("allProduct"));
  displayProducts();
}


function getInputValues() {

  let discountPercentage  = Number(nProduct.value)
  let totalPrice = (Number(productCount.value) * Number(productPrice.value))
  let discountAmount = Number(productPrice.value) - Number(productPrice.value) * (discountPercentage / 100)  ;
  let totalOffer = totalPrice - totalPrice * (discountPercentage / 100)
  let profit =  (totalPrice - totalPrice * Number(nProduct.value / 100)) - (totalPrice - totalPrice * 45 / 100)


  var product = {
    productCount: productCount.value,
    productPrice: Number(productPrice.value),
    totalPrice: productCount.value*productPrice.value,
    nProduct: discountPercentage,
    priceOffer: discountAmount,
    totalOffer,
    profit
  }

  console.log(product);

  allProduct.push(product);
  // localStorage.setItem( "allProduct" , JSON.stringify( allProduct ));
  displayProducts();
  // clearForm();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Add in successfully'
  })

}

function getUpdate(){

  var product = {
    productCount: productCount.value,
    productPrice: Number(productPrice.value),
    totalPrice: productCount.value*productPrice.value,
    nProduct: total.value,
    priceOffer: productPrice.value*total.value,
  }

  console.log({total: product});

  allProduct[temp] = product;
  localStorage.setItem( "allProduct" , JSON.stringify( allProduct ));
  displayProducts();
  clearForm()


  addProdact.classList.replace('d-none' , 'd-block')
  btnUpdate.classList.replace("d-block" , "d-none")

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Update in successfully'
  })

}

console.log(allProduct)


function displayProducts(){
  var outProudct = ""
  for (var i=0 ; i<allProduct.length ; i++){
    outProudct += `<tr>
          <td>${i+1}</td>
          <td>${allProduct[i].productCount}</td>
          <td>${allProduct[i].productPrice}</td>
          <td>${allProduct[i].totalPrice}</td>
          <td>${allProduct[i].nProduct}</td>
          <td>${allProduct[i].priceOffer}</td>
          <td>${allProduct[i].totalOffer}</td>
          
          <td>
          <button onclick="deletElement(${i})" class="btn btn-danger">Delet</button>
          </td>
          <td>
           ${allProduct[i].profit}
          </td>
        </tr>`
  }

  document.getElementById("data").innerHTML = outProudct;

}


function clearForm(){
  productCount.value = ""
  productPrice.value = ""
  totalPrice.value = ""
}


function deletElement(index){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      allProduct.splice(index,1)
      displayProducts()
      localStorage.setItem( "allProduct" , JSON.stringify( allProduct ));
    }
  })
  
  
}


function updateForm(index){
  productName.value = allProduct[index].productName;
  productPrice.value = allProduct[index].productPrice;
  productCaregory.value = allProduct[index].productCaregory;
  productDescription.value = allProduct[index].productDescription;

  
  btnUpdate.classList.replace('d-none' , 'd-block')
  addProdact.classList.add("d-none")
  temp = index
}



function search(term) {

  var searchProduct = ''

  for ( var i=0 ; i< allProduct.length ; i++) {

    if (allProduct[i].productName.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ) {

      searchProduct += `<tr>
          <td>${i+1}</td>
          <td>${allProduct[i].productName}</td>
          <td>${allProduct[i].productPrice}</td>
          <td>${allProduct[i].productCaregory}</td>
          <td>${allProduct[i].productDescription}</td>
          
          <td>
            <button onclick="updateForm(${i})" class="btn btn-warning">Update</button>
          </td>
          <td>
            <button onclick="deletElement(${i})" class="btn btn-danger">Delet</button>
          </td>
        </tr>`
    }
  }

  document.getElementById("data").innerHTML = searchProduct;
}