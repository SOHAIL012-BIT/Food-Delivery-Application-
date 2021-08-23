// let getCurrentUser = () => {
//     // function getCurrentUser() {
//     let currentUrl = window.location.pathname;
  
//     var detail = document.getElementById("detail");
//     if (JSON.parse(localStorage.getItem("user"))) {
//       var user = JSON.parse(localStorage.getItem("user"));
//     } else {
//       location.replace("../index.html");
//     }
//   };

let registerUser = () => {
    let username = document.getElementById("username");
    let phone = document.getElementById("phone");
    let country=document.getElementById("country")
    let city =document.getElementById("city");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                username: username.value,
                phone: phone.value,
                country:country.value,
                city: city.value,
                email: email.value,
                password: password.value
            }

            firebase.database().ref(`users/${res.user.uid}`).set(user)
                .then(() => {
                    alert("Registered")
                    window.location = "loginUser.html"
                })

        })
        .catch((err) => {
            console.log("err=>", err)
        })
}
let registerAdmin = () => {
    let resturantname = document.getElementById("resturantname");
    let phone = document.getElementById("phone");
    let city =document.getElementById("city");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                resturantname: resturantname.value,
                phone: phone.value,
                city: city.value,
                email: email.value,
                password: password.value
            }

            firebase.database().ref(`resturants/${res.user.uid}`).set(user)
                .then(() => {
                    alert("Registered")
                    window.location = "loginAdmin.html"
                })

        })
        .catch((err) => {
            console.log("err=>", err)
        })
}


let loginUser = () => {
    let emailLogin = document.getElementById("emailLogin");
    let passwordLogin = document.getElementById("passwordLogin");

    firebase.auth().signInWithEmailAndPassword(emailLogin.value, passwordLogin.value)
        .then((res) => {
            firebase.database().ref(`users/${res.user.uid}`).once('value', (data) => {
                // console.log(data.val())
                alert("Login")
                    window.location = "dashboardUser.html"
                    
            })
        })
        .catch((err) => {
            console.log('err=>', err)
        })

}
let loginAdmin = () => {
    let emailLogin = document.getElementById("emailLogin");
    let passwordLogin = document.getElementById("passwordLogin");

    firebase.auth().signInWithEmailAndPassword(emailLogin.value, passwordLogin.value)
        .then((res) => {
            firebase.database().ref(`users/${res.user.uid}`).once('value', (data) => {
                // console.log(data.val())
                alert("Login")
                    window.location = "dashboardAdmin.html"
            })
        })
        .catch((err) => {
            console.log('err=>', err)
        })

}
let logout = ()=>{
    localStorage.removeItem("user");
    location.href = "../index.html";
}



// Order Create
let createorder = () => {
    // let user = JSON.parse(localStorage.user);
    // let id = user.id;
    let id="id"+Math.random();
    let name = document.getElementById("name");
    let price = document.getElementById("price");
    let categories = "";
    for (let option of document.getElementById("category").options) {
      if (option.selected) {
        categories = categories + option.value + ",";
      }
    }
    categories.slice(0, -1);
    let delivery_type = document.getElementById("delivery_type");
    let status = document.getElementById("status");
  
    // Add a new document in collection "orders"
    firebase.database().ref("orders").push({
        name: name.value,
        price: price.value,
        category: categories,
        delivery_type: delivery_type.value,
        status: status.value,
        id: id,
      })
      .then(() => {
        $("#alert-response")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .append(`Order Created Successfully`)
          .css("display", "block");
        $("button[type=submit]").addClass("disabled");
        alert("Order Created Successfully");
        setTimeout(function () {
         
        }, 5000);
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
        $("#alert-response")
          .addClass("alert-danger")
          .append(`Error: ${err.message}`)
          .css("display", "block");
        $("button[type=submit]").addClass("disabled");
      });
    setTimeout(function () {
      $("#alert-response").css("display", "none").text("");
      $("button[type=submit]").removeClass("disabled");
    }, 5000);
  };
//   Get order
const showOrder = () => {
    // getCurrentUser();
    // let user = JSON.parse(localStorage.user);
    // const id = user.id;
    $(".dataTables_empty").remove();
    firebase
      .database()
      .ref(`orders`)
      .on("value", (snapshot) => {
        if (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
           
            let data = "<tr>";
            for (const property in childData) {
              data = data + `<td>${childData[property]}</td>`;
            }
            data = data + "</tr>";
            $("#dataTable").append(data);
          });
        }
      });
  };


//   Create Dishes
let createdishes= () => {
    let name = document.getElementById("name");
    let price = document.getElementById("price");
    let categories = "";
    for (let option of document.getElementById("category").options) {
      if (option.selected) {
        categories = categories + option.value + ",";
      }
    }
    categories.slice(0, -1);
    let delivery_type = document.getElementById("delivery_type");
  
    firebase.database().ref("dishes").push({
        name: name.value,
        price: price.value,
        category: categories,
        delivery_type: delivery_type.value,
      })
      .then(() => {
        $("#alert-response")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .append(`Order Created Successfully`)
          .css("display", "block");
        $("button[type=submit]").addClass("disabled");
        alert("Dish Created Successfully");
        setTimeout(function () {
        }, 5000);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
        $("#alert-response")
          .addClass("alert-danger")
          .append(`Error: ${err.message}`)
          .css("display", "block");
        $("button[type=submit]").addClass("disabled");
      });
    setTimeout(function () {
      $("#alert-response").css("display", "none").text("");
      $("button[type=submit]").removeClass("disabled");
    }, 5000);
  };
//   Get dishes
let getDishes = () => {
    // getCurrentUser();
    $(".dataTables_empty").remove();
    firebase
      .database()
      .ref("dishes")
      .on("value", (snapshot) => {
        if (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            let data = "<tr>";
            for (let property in childData) {
              data = data + `<td>${childData[property]}</td>`;
            }
            data = data + "</tr>";
            $("#dataTable").append(data);
          });
        }
      });
  };