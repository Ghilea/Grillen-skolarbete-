let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let date = document.getElementById("date");
let time = document.getElementById("time");
let guests = document.getElementById("guests");
let mailContainer = document.getElementById("mailContainer");
let modalBody = document.getElementById("modalBody");
let modalButton = document.getElementById("modalButton");
let dismissButton = document.getElementById("dismissButton");
let successButton = document.getElementById("successButton");
let removeItemButtons = document.getElementsByClassName("removeItemButton");
let submitButton = document.getElementById("submitButton");
let modalTrigger = document.getElementById("staticBackdrop");

const meals = document.getElementById("meals");
const course = document.getElementById("course");
const cart = document.getElementById("cart");

var soonestTime;
var latestTime;
var success = false;

var soonestDate = getSoonestBookingDay();

var shoppingCart = [];
var totalPrice = 0;
var itemIndex = 0;

date.setAttribute("min", soonestDate);
date.setAttribute("value", soonestDate);
setAvailableTimes();

// Denna loop fyller gästlistan från 2 till 10 personer
for(let i = 2; i <= 10; i++)
{
    guests.innerHTML += "<option>" + i + "</option>";
}

// Denna funktion sätter den tidigaste och den senaste tiden det går att boka bord för alla veckans dagar.
function setAvailableTimes(){
    const weekday = new Date(date.value).getDay();
    switch(weekday){
        case 0:
        case 1:
        case 2:
            soonestTime = 16;
            latestTime = 20;
            break;
        case 3:
        case 4:
            soonestTime = 16;
            latestTime = 21;
            break;
        case 5:
            soonestTime = 14;
            latestTime = 21;
            break;
        case 6:
            soonestTime = 12;
            latestTime = 21;
            break;
    }

    time.innerHTML = "";
    for(let i = soonestTime; i < latestTime; ++i)
    {
        time.innerHTML += 
        "<option>" + i + ":00 </option>";
    }
}

// Denna funktion ser till att man enbart kan välja att boka bord minst tre dagar in i framtiden.
function getSoonestBookingDay(){
    let soonestDate = new Date();
    soonestDate.setDate(soonestDate.getDate() + 3);
    let dd = soonestDate.getDate();
    let mm = soonestDate.getMonth() + 1; //January is 0!
    let yyyy = soonestDate.getFullYear();
    
    if (dd < 10) {
       dd = '0' + dd;
    }
    
    if (mm < 10) {
       mm = '0' + mm;
    } 
        
    soonestDate = yyyy + '-' + mm + '-' + dd;

    return soonestDate;
}

// Denna funktion skapar e-postrutor för varje gäst (förutom användaren) som har valts vid bokning.
function addMailInputs(){
    mailContainer.innerHTML = "";
    let content = "";
    content += "<div class='container card card-body w-100 my-3'>";
    for(let i = 0; i < guests.value - 1; i++)
    {
        content +=
            "<div class='w-75 mx-auto mt-2'>" +
                "<label for='email' class='form-label'>E-post</label>" +
                "<input type='email' class='form-control text-center' id='email' placeholder='namn@mail.com'>" +
            "</div>";
    }
    content += "</div>";
    mailContainer.innerHTML += content;
}

// Denna text visas i en modal när användaren klickar på boka-knappen.
function fillModal(){
    modalBody.innerHTML = "";
    if(guests.value == 2){
        modalBody.innerHTML += "Ett bord kommer vara redo för dig och din vän.<br><br>";
    }
    else{
        modalBody.innerHTML += "Ett bord kommer vara redo för dig och dina " + parseInt(guests.value - 1)  + " vänner.<br><br>";
    }
    modalBody.innerHTML += "Vi ser fram emot att servera er " + date.value + " klockan " + time.value + ".";
    modalBody.innerHTML += "<br><br>Vänligen bekräfta att detta stämmer överens med dina önskemål.";
    dismissButton.style.display = "block";
    successButton.innerHTML = "Godkänn";
    successButton.setAttribute("onclick", "successfulBooking()");
    successButton.removeAttribute("data-bs-dismiss", "modal");
}

// Denna text visas när användaren har godkänt att allt är rätt med bokningen. 
function successfulBooking(){
    modalBody.innerHTML = "";
    modalBody.innerHTML += "<h2><i class='bi bi-check-circle'></i></h2>";
    modalBody.innerHTML += "Tack så mycket för din bokning " + userName.value + "!<br><br>";
    modalBody.innerHTML += "Ett bekräftelsemail kommer att skickas ut till dig och ditt sällskap inom kort.";
    dismissButton.style.display = "none";
    successButton.innerHTML = "Stäng";
    successButton.removeAttribute("onclick", "successfulBooking()");
    successButton.setAttribute("data-bs-dismiss", "modal");
}

function submitForm(event){
    var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
    event.preventDefault();
    fillModal();
    myModal.show();
}

// Här nedan är funktioner till bokningssystemet jag inte hann med att färdigställa.

// starterMeals.forEach(element => {
//     meals.innerHTML += "<option>" + element.name + " " + element.price + ":-</option>";
// });

// function changeMealArray(){
//     meals.innerHTML = "";
//     if(course.value == "Förrätter")
//     {
//         printArrayList(starterMeals);
//     }
//     else if(course.value == "Varmrätter")
//     {
//         printArrayList(mainMeals);
//     }
//     else if(course.value == "Från Grillen")
//     {
//         printArrayList(bbqMeals);
//     }
//     else if(course.value == "Tillbehör")
//     {
//         printArrayList(sidesMeals);
//     }
//     else
//     {
//         printArrayList(dessertMeals);
//     }
// }

// function addToCart(){
//     if(course.selectedIndex == "0")
//     {
//         shoppingCart.push(starterMeals[meals.selectedIndex]);
//         totalPrice += parseInt(starterMeals[meals.selectedIndex].price);
//     }
//     else if(course.selectedIndex == "1")
//     {
//         shoppingCart.push(mainMeals[meals.selectedIndex]);
//         totalPrice += parseInt(mainMeals[meals.selectedIndex].price);
//     }
//     else if(course.selectedIndex == "2")
//     {
//         shoppingCart.push(bbqMeals[meals.selectedIndex]);
//         totalPrice += parseInt(bbqMeals[meals.selectedIndex].price);
//     }
//     else if(course.selectedIndex == "3")
//     {
//         shoppingCart.push(sidesMeals[meals.selectedIndex]);
//         totalPrice += parseInt(sidesMeals[meals.selectedIndex].price);
//     }
//     else
//     {
//         shoppingCart.push(dessertMeals[meals.selectedIndex]);
//         totalPrice += parseInt(dessertMeals[meals.selectedIndex].price);
//     }

//     printShoppingCart();
// }

// function printShoppingCart(){
//     let content = "";
//     document.getElementById("sum").innerHTML = "<hr><strong>Total: " + totalPrice + ":-</strong><hr>";
//     content = "";
//     content += '<div class="cartItem d-flex flex-lg-row">'
//     content += "<div class='p-2 flex-grow-1'><strong>" + shoppingCart.at(-1).name + "</strong>";
//     if(shoppingCart.at(-1).priceDescription != undefined){
//         content += "<strong> " + shoppingCart.at(-1).priceDescription + "</strong>";
//     } 
//     if(shoppingCart.at(-1).description != undefined){
//         content += "<p>" + shoppingCart.at(-1).description + "</p>";
//     }
//     else{
//         content += "<br><br>"
//     }
//     content += "</div>";
//     content += "<div class='p-2 mx-3 px-lg-4'><input type='number' min='1' max='10' value='1' class='form-control text-center mx-auto' onchange='changeAmount(this)'></div>";
//     content += "<div class='p-2 mx-auto mx-3 px-lg-4' id='priceContainer'><strong id='price'> " + shoppingCart.at(-1).price + ":-</strong></div>";
//     content += "<button class='itemButton p-2 mx-3 px-lg-4' onclick='removeItemFromCart(this);'><i class='bi bi-x-circle-fill'></i></button>";
//     content += "</div>";
//     content += "</div>";
//     cart.innerHTML += content;
//     itemIndex++;
// }

// function removeItemFromCart(e){
//     let price = e.parentElement.children[2].innerText;
//     var letPrice = price.slice(0, -2);
    
//     totalPrice -= letPrice;
//     e.parentElement.remove();

//     document.getElementById("sum").innerHTML = "<hr><strong>Total: " + totalPrice + ":-</strong><hr>";
// }

// function changeAmount(e){
//     let price = e.parentElement.parentElement.children[2].innerText;
//     var letPrice = price.slice(0, -2);
    
//     letPrice *= e.value;
//     totalPrice += letPrice;

//     document.getElementById("sum").innerHTML = "<hr><strong>Total: " + totalPrice + ":-</strong><hr>";
// }

// function printArrayList(array){
//     let text;
//     array.forEach(element => {
//         text = "";
//         text += element.name + " ";
//         if(element.priceDescription != undefined){
//             text += element.priceDescription + " ";
//         }
//         text += element.price + ":-";

//         meals.innerHTML += "<option>" + text + "</option>";
//     });
// }