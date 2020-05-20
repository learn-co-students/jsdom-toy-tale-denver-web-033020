let addToy = false;
const toyUrl = "http://localhost:3000/toys/"


document.addEventListener("DOMContentLoaded", () => {
  const divCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.container');
  const addBtn = document.querySelector("#new-toy-btn");
  

addBtn.addEventListener('click', () => {
    // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
    postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
    
    

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
  
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
        let new_toy = displayToys(obj_toy)
      divCollect.append(new_toy)
    })
}
  
    
  
  

fetch(toyUrl)
  .then(parseJSON)
  .then(toys => toys.forEach(displayToys))

function parseJSON(response){
  return response.json();
}

function displayToys(toy){
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const p1 = document.createElement('p')
  const img = document.createElement('img');
  const likeButton = document.createElement('button');

  console.log(toy)
  div.class = "card";
  h2.textContent = toy.name;
  img.src = toy.image;
  img.class = "toy-avatar";
  p1.innerHTML = toy.likes
  p.innerText = "Likes: " + p1.innerHTML;
  likeButton.class = "like-btn";
  likeButton.innerText = "Like <3"

  likeButton.addEventListener('click', (event) => {
    let more = parseInt(p1.innerText) + 1;
    p1.textContent = more
    p.textContent = "Likes: " + p1.textContent
    console.log(p1)
    
  })
 

  divCollection.append(div, h2, img, p, likeButton)
}

function addNewToy(event){
  event.preventDefault();
  console.log(event)
}

});
