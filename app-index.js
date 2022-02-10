import { initializeApp } from 
"https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore, collection, getDocs, addDoc } from 
"https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

$( function() {
  

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDq9J3BPmlPNLPjtVmTzM5T8E_2r0wdais",
    authDomain: "ultimaterecipes-8acca.firebaseapp.com",
    projectId: "ultimaterecipes-8acca",
    storageBucket: "ultimaterecipes-8acca.appspot.com",
    messagingSenderId: "159083665721",
    appId: "1:159083665721:web:bcbbd6d935a62459f630e8"
  };

  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  const firestore1 = getFirestore(firebaseapp)

  function makeRow(table, rowData) {
        var row = table.insertRow(-1)
        rowData.forEach( function(item) {
            var cell = document.createElement("td")
            cell.innerHTML = item
            row.appendChild(cell)
        });
  }


    function makeTable() {
        var table = document.createElement("table")
        table.className = "table table-bordered"
        return table
    }

    $("#add_button").click(function(){
        addDoc(collection(firestore1, "recipes"),  {
            recipe_title:$("#recipe_title").val(),
            ingredient_one:$("#ingredient_one").val(),
            ingredient_two:$("#ingredient_two").val(),
            ingredient_three:$("#ingredient_three").val(),
            ingredient_four:$("#ingredient_four").val()
        }).then(function(docRef){
            console.log("Document written with ID ", docRef.id)
            $("#add_recipes")[0].reset()
        })
        .catch(function(error){
            console.error("Error adding document: ", error)
        });

    });
    $("#show_button").click(function(){
        var table = makeTable()
        var recipes = []
        recipes.push(["Recipe Title", "Ing1", "Ing2", "Ing3", "Ing4"])
        getDocs(collection(firestore1,"recipes"))
        .then(function(querySnapshot) {
            querySnapshot.forEach( function(doc){
                var data = doc.data()
                recipes.push([data.recipe_title, data.ingredient_one, data.ingredient_two, data.ingredient_three, data.ingredient_four])
            } )
        })
        .then(function() {
                recipes.forEach(function(rowData) {
                    makeRow(table, rowData)
                })
        });
        var recipeDiv = document.getElementById("recipe_data")
        recipeDiv.innerHTML = ""
        recipeDiv.appendChild(table)
    })


} )