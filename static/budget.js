function addPurchase() {
    var v = document.getElementById("PurchaseCost").value;
    var n = document.getElementById("PurchaseName").value;
    var b = document.getElementById("budgetTitle").value;
    var d = document.getElementById("date").value;
    if (v%1===0 && v && n ) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/purchases', true);
        console.log(n);
        console.log(v);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (0 == 0) {
            var data = JSON.stringify(
                {
                    new_purchase_name: n,
                    new_purchase_price: v,
                    new_purchase_budget: b,
                    new_purchase_date:d
                }
            );
        }
        console.log("My data:" + data)
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("ADD PURCHASE - POST: /purchases");
                console.log('SENT: ');
                console.log(data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to create new category");

            }
            window.location.replace('/purchases/'+b);
        };
        xhr.send(data);
    }
    else {
        // Bad
        console.log("Failed to add purchase");
        window.location.replace('/purchases/'+b);
    }
}


function addCPurchase() {
    var v = document.getElementById("PN").value;
    var n = document.getElementById("PV").value;
    var b = document.getElementById("purchaseCat").value;
    var d = document.getElementById("datee").value;
    if (n%1===0 && v && n && b) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/purchases', true);
        console.log(n);
        console.log(v);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (0 == 0) {
            var data = JSON.stringify(
                {
                    new_purchase_name: v,
                    new_purchase_price: n,
                    new_purchase_budget: b,
                    new_purchase_date:d
                }
            );
        }
        console.log("My data:" + data)
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("ADD PURCHASE - POST: /purchases");
                console.log('SENT: ');
                console.log(data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to create new category");

            }
            window.location.replace('/');
        };
        xhr.send(data);
    }
    else {
        // Bad
        console.log("Failed to add purchase");
        window.location.replace('/');
    }
}



function addUPurchase() {
    var v = document.getElementById("PurchaseValue").value;
    var n = document.getElementById("PurchaseN").value;
    console.log("here: "+n);
    console.log("j: "+v);
    var d = document.getElementById("date").value;
    var b = "__________________________________________"
    if (v%1===0&& v && n ) {
        alert("NothingHere");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/purchases', true);
        console.log(n);
        console.log(v);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (0 == 0) {
            var data = JSON.stringify(
                {
                    new_purchase_name: n,
                    new_purchase_price: v,
                    new_purchase_budget: b,
                    uncat: 1,
                    new_purchase_date: d
                }
            );
        }
        console.log("My data:" + data)
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("ADD PURCHASE - POST: /purchases");
                console.log('SENT: ');
                console.log(data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to create new category");

            }
            window.location.replace('/');
        };
        xhr.send(data);
    }
    else {
        // Bad
        console.log("Failed to add purchase");
        window.location.replace('/');
    }


}

function deletePurchase(button){
     var element = button;
     var val = element.nextSibling.nextSibling.value;
     var title = element.nextSibling.value;
     var xhr = new XMLHttpRequest();
     console.log("Title: "+title);
     console.log("DELETE: "+val)
    xhr.open("DELETE", '/purchases', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify(
                {
                    del_purchase_id: val
                }
    );
    xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("DELETE PURCHASE - DELETE: /purchases");
                console.log('SENT: ');
                console.log("Purchase ID: "+data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to delete");

            }
           // window.open(url, "_self");
            window.location.replace('');
        };
        xhr.send(data);
}



function deleteUPurchase(button){
     var element = button;
     var val = element.nextSibling.nextSibling.value;
     var title = element.nextSibling.value;
     var xhr = new XMLHttpRequest();
     console.log("Title: "+title);
     console.log("DELETE: "+val)
    xhr.open("DELETE", '/purchases', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify(
                {
                    del_purchase_id: val
                }
    );
    xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("DELETE PURCHASE - DELETE: /purchases");
                console.log('SENT: ');
                console.log("Purchase ID: "+data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to delete");

            }
           // window.open(url, "_self");
            window.location.replace('/purchases/uncategorized');
        };
        xhr.send(data);
}


function addUUPurchase() {
    var v = document.getElementById("PurchaseValue").value;
    var n = document.getElementById("PurchaseN").value;
    var b = "__________________________________________";
    var d = document.getElementById("date").value;
    if (v%1===0&& v && n ) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/purchases', true);
        console.log(n);
        console.log(v);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (0 == 0) {
            var data = JSON.stringify(
                {
                    new_purchase_name: n,
                    new_purchase_price: v,
                    new_purchase_budget: b,
                    uncat: 1,
                    new_purchase_date:d
                }
            );
        }
        console.log("My data:" + data)
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                console.log("Network Error:" + xhr.status);
                //signal();
            }
            if (res["completed"]) {
                //signal('New category was created');
                console.log("ADD PURCHASE - POST: /purchases");
                console.log('SENT: ');
                console.log(data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to create new category");

            }
            window.location.replace('/purchases/uncategorized');
        };
        xhr.send(data);
    }
    else {
        // Bad
        console.log("Failed to add purchase");
        window.location.replace('/purchases/uncategorized');
    }


}