
var b = document.getElementById("theButton");


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