// search phone 
const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    
    // fetch API 
    const url1 = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url1)
        .then(response => response.json())
        .then(result => displayResults(result.data));

    const showMoreButton = document.getElementById('show-more-button');
    showMoreButton.style.display = 'block';
}


const displayResults = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(info => {
        // console.log(info);
        
        const id = `${info.slug}`;
        // console.log(id);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 w-75 p-3 mx-auto">
                    <!-- phone image  -->
                    <img src="${info.image}" class="img-fluid p-3 mx-auto" alt="..." width="250" height="300">
                    <!-- phone info  -->
                    <div class="card-body px-3">
                        <!-- phone name  -->
                      <h5 class="card-title">${info.phone_name}</h5>
                      <!-- phone brand  -->
                      <p class="card-text">${info.brand}</p>
                    </div>
                    <div class="card-footer py-0 bg-white border-0">
                        <button onclick="loadexplore('${info.slug}')" id="explore-button" class="btn btn-primary">Explore</button>
                    </div>
                  </div>
        `;
        searchResult.appendChild(div); 

        
    });

}


const loadexplore = id =>{
    
    console.log(id);
    // fetch API 
    const url2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url2)
        .then(response => response.json())
        .then(result => console.log(result.data));
}


