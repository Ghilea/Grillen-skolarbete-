const starterLink = document.getElementById("starterLink");
const mainsLink = document.getElementById("mainsLink");
const bbqLink = document.getElementById("bbqLink");
const sidesLink = document.getElementById("sidesLink");
const dessertLink = document.getElementById("dessertLink");
const menuCarousel = document.getElementById("menuCarousel");

const starterMenu = document.getElementById("starterMenu");
const mainMenu = document.getElementById("mainMenu");
const bbqMenu = document.getElementById("bbqMenu");
const sidesMenu = document.getElementById("sidesMenu");
const dessertMenu = document.getElementById("dessertMenu");

// Denna funktion skriver ut vald menyArray på ett snyggt sätt med data från mealArray.js.
function PrintMenuPaper(array, menu, meal){

    if(meal == "Från Grillen"){
        menu.innerHTML += '<h2>' + meal + '</h2><p>Alla rätter FRÅN GRILLEN serveras med en liten sallad samt vitlöks- & persiljebakad tomat. Komplettera din måltid med urvalen i sektionen <a href="#top" data-bs-target="#menuCarousel" data-bs-slide-to="3"><strong>TILLBEHÖR</strong></a></p><hr>';
    }
    else{
        menu.innerHTML += "<h2>" + meal + "</h2><hr>";
    }

    array.forEach(function(element, index){

        if(element.type == "roll" && array[index - 1].type == "burger")
        {
            menu.innerHTML += "<br><br><strong>VILL DU ÄTA VEGETARISKT?</strong> Alla våra burgare går att byta ut mot quornfilé eller halloumi <br>"; 
        }

        if(index > 1 && (element.type != array[index - 1].type)){
            menu.innerHTML += "<hr>";
        }
    
        if(Object.keys(element).length == 2)
        {
            menu.innerHTML += element.name + " <strong>" + element.price + ":-</strong><br>";
        }
        else if(Object.keys(element).length == 3)
        {
            menu.innerHTML += "<strong>" + element.name + "</strong> "+ element.description + "<br>"

        }
        else{
            if(Object.keys(element).length == 4)
            {
                menu.innerHTML += "<h6>" + element.name + "</h6>";
                menu.innerHTML += element.description + " <strong>" + element.price + ":-</strong>";
            }
            else{
                if(index == 0 || (index > 0 && array[index - 1].name != element.name))
                {
                    menu.innerHTML += "<h6>" + element.name + "</h6>";
                    menu.innerHTML += element.description + "<br>" + element.priceDescription + " <strong>" + element.price + ":-</strong>";    
                }
                else{
                    menu.innerHTML += " | " + element.priceDescription + " <strong>" + element.price + ":-</strong>";
                }
            }
        }
    });
}

PrintMenuPaper(starterMeals, starterMenu, "Förrätter")
PrintMenuPaper(mainMeals, mainMenu, "Varmrätter")
PrintMenuPaper(bbqMeals, bbqMenu, "Från Grillen")
//PrintMenuPaper(sidesMeals, sidesMenu, "Tillbehör") 
PrintMenuPaper(dessertMeals, dessertMenu, "Desserter") 