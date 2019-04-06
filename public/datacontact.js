const myForm = document.querySelector('#my-form');
show_data = document.getElementById('show_data');
message = document.getElementById('message');
n = document.getElementById('n');
category = document.getElementById('category');
email = document.getElementById('email');
myForm.addEventListener('submit',onsubmit);
var robot = false;
var priority = "low";
function onsubmit(e){
    e.preventDefault();
    console.log("OK");
    if (n.value != "" && email.value != "" && category.value != "Category" && message.value != "" && robot != false) {
        var d = new Date();
        var key = d.getTime();
        //alert(n);
        var data = "<table id='" + key + "' style='background-color:black;color:white'><tr ><td width='10%'>Name:</td><td>" + n.value + "</td></tr>";
        data = data + "<tr><td width='10%'>Email:</td><td>" + email.value + "</td></tr>";
        data = data + "<tr><td width='10%'>Catagory:</td><td>" + category.value + "</td></tr>";
        if(priority==="low"){
            data = data + "<tr style='background-color:green;color:white'><td width='20%'>Low priority</td></tr>";
        }else if(priority==="normal"){
            data = data + "<tr style='background-color:DarkGoldenRod ;color:white'><td width='20%'>Normal priority</td></tr>";
        }else{
            data = data + "<tr style='background-color:red;color:white'><td width='20%'>High priority</td></tr>";
        }
        data = data + "<tr><td width='10%'>Massage:</td><td>" + message.value.replace(/\n/g, '<br>') + "</td></tr>";
        data = data + "<tr><td align='center' colspan='2'><input onclick='remove("+key+")' type='button' value='Remove'/></td></tr></table>";
        var old_data = show_data.innerHTML + data;
        show_data.innerHTML = old_data;
        save_data();
        n.value = "";
        message.value = "";
        category.value = "Category";
        email.value = "";
        robot = false;
    }
    else{
        if(n.value=="")
        {
            alert("Fill your name!!!");
        }
        if(email.value=="")
        {
            alert("Fill your email!!!");
        }
        if(category.value=="Category")
        {
            alert("Select category!!!");
        }
        if(message.value=="")
        {
            alert("Write the message!!!");
        }
        if(robot==false)
        {
            alert("Really?! You are not human");
        }
        
    }
}

document.getElementById('human').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
        // if checked ...
        robot = true;
    } else {
        alert( "Really?! You are not human" );
    }
};

document.getElementById('priority-low').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
        // if checked ...
        priority = "low";
    } else {

    }
};

document.getElementById('priority-normal').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
        // if checked ...
        priority = "normal";
    } else {

    }
};

document.getElementById('priority-high').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
        // if checked ...
        priority = "high";
    } else {

    }
};
function remove(key)
{
    //alert(key);
    document.getElementById(key).remove();
    save_data();
}

function keep_data()
{
    //alert("OK");  
    read_data();
}

function save_data()
{
    var playersRef = firebase.database().ref("data/");

    playersRef.set ({
           data : document.getElementById("show_data").innerHTML
        });
}

function read_data()
{
    var ref = firebase.database().ref();

    ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    show_data.innerHTML = snapshot.val().data.data;
    console.log(snapshot.val().data.data);
    }, function (error) {
    console.log("Error: " + error.code);
    });
}