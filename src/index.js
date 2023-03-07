console.log('%c HI', 'color: firebrick')

// write JS to get/render "dog" images, and list of "dogs" from API
// add click events to the lists
// implement a filter
// this lab has no tests

// used in Challenge 2 and 4, so needs to be global.
let breeds = []

// CHALLENGE 1:
// On page load, fetch images at "https://dog.ceo/api/breeds/image/random/4"
// parse response into JSON
//adds image elements to the DOM for-each element in the array
// Hint: Make sure all HTML loads first before Javascript runs
function getBreeds() {
    const imgURL = "https://dog.ceo/api/breeds/image/random/4";
    return fetch(imgURL)
    .then(response => response.json())
    .then(response => {
        //console.log("response", response.message)
        const dogImageContainer = document.getElementById("dog-image-container")
        response.message.forEach(url=> {
            const img = document.createElement("img")
            img.src = url
            dogImageContainer.append(img)
        })
    })

}





// CHALLENGE 2:
// on page load, fetches list of all dog breeds at "https://dog.ceo/api/breeds/list/all"
// adds the breeds to the page in the <ul> provided in index.html
function getBreedNames() {
    const breedURL = "https://dog.ceo/api/breeds/list/all"
    fetch(breedURL)
    .then(response => response.json())
    .then(response => {
        breeds = Object.keys(response.message)
        // add list of all breeds to DOM
        addBreedNamesToDom(breeds)  
    //  console.log("keys",breeds)
    })
}




//This function is used by  challenge 2 and challenge 4
function addBreedNamesToDom(breeds) {
    //add it to <ul>
    const ul = document.querySelector("#dog-breeds")
        // use maps if you need an array bc "forEach" doesn't turn it into an array
    breeds.map(breed => {
        const li = document.createElement("li")
        li.textContent = breed
        //append each individual breed as an <li> to <ul>
        ul.append(li)
    })

}



// CHALLENGE 3:
// Once all the breeds are rendered in <ul>, 
// add JS to change the "font color" of <li> items when clicked 

    // add an event listener to <li>'s for Challenge 3
    document.addEventListener("click", event => {
        // can structure all your event listeners here by designating different target matches
        if(event.target.matches("li")) {
            event.target.style.color = "red"
        }
    })
            




// CHALLENGE 4:
// once all breeds are loaded on page, 
// add JS so user can filter breeds that start with a particular letter using a dropdown
 

//grab HTML dropdown element and add an event listener to that.
document.addEventListener("change", event => {
    if(event.target.matches("#breed-dropdown")){
        // to clear out the list of dog breeds everytime you want to show a filtered list
        const ul = document.querySelector("#dog-breeds")
        ul.innerHTML = ""

        // console log it so you can view the value in the window's dev tools
        //console.log(event)

        // FILTER VALUES BY FIRST LETTER
        // breed[0] gives us the first letter of the breed name.
        const filteredBreeds = breeds.filter(breed => breed[0] === event.target.value)

        // call to display filtered breeds
        addBreedNamesToDom(filteredBreeds)

    }
})

//-----------------------------------------
getBreeds()
getBreedNames()