
var b = document.getElementById("theButton");




function goToPurchases(button){
    var element = button;
    var val = element.nextSibling.nextSibling.value;
     var xhr = new XMLHttpRequest();
     console.log("POST: "+val)
    //xhr.open("GET", '/purchases', true);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify(
                {
                    get_budget_id: val
                }
    );
  //  xhr.onload = function () {
            //var res = JSON.parse(xhr.responseText);
          //  if (xhr.status !== 200) {
              //  console.log("Network Error:" + xhr.status);
                //signal();
            //}
            if (1==1) {
                //signal('New category was created');
                console.log("GET PURCHASES - GET: /purchases");
                console.log('SENT: ');
                console.log("BUDGET ID: "+data);
                console.log('RECEIVED: ');
                console.log('Completed');
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to get");

            }
           // window.open(url, "_self");
            window.location.replace('/purchases/'+val);
       // };
       // xhr.send(null);
}

function deleteCategory(button){
     var element = button;
     var val = element.nextSibling.nextSibling.value;
     var xhr = new XMLHttpRequest();
     console.log("DELETE: "+val)
    xhr.open("DELETE", '/cats', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify(
                {
                    del_budget_id: val
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
                console.log("DELETE BUDGET - DELETE: /cats");
                console.log('SENT: ');
                console.log("BUDGET ID: "+data);
                console.log('RECEIVED: ');
                console.log(res);
                console.log("--------------------------------");


            }
            else {
                // Bad
                console.log("Failed to delete");

            }
           // window.open(url, "_self");
            window.location.replace('/');
        };
        xhr.send(data);
}







function addCategory() {
    var v = document.getElementById("BudgetValue").value;
    var n = document.getElementById("BudgetName").value;
    //if (v === parseInt(v, 10)){
    if(v%1===0){
        var xhr = new XMLHttpRequest();
    xhr.open("POST", '/cats', true);
    console.log(n);
    console.log(v);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (0 == 0) {
        var data = JSON.stringify(
            {
                new_cat_name: n,
                new_cat_limit: v
            }
        );
    }
    console.log("My data:"+data)
    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText);
        if (xhr.status !== 200) {
            console.log("Network Error:" + xhr.status);
            //signal();
        }
        if (res["completed"]) {
            //signal('New category was created');
            console.log("CREATE CATEGORY - POST: /cats");
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
            console.log("Failed to create new category");
            window.location.replace('/');
        }


}