// search phone 
const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    let exploreResult = document.getElementById('explore-result');
    exploreResult.style.display = 'none';
    let notFound = document.getElementById('not-found');
    notFound.style.display = 'none';
    let searchMsg = document.getElementById('search-msg');
    searchMsg.style.display = 'none';
    
    // fetch API 
    const url1 = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url1)
        .then(response => response.json())
        .then(result => displayResults(result.data));

}

// display result 
const displayResults = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    
    if(data.length === 0)
    {
        let notFound = document.getElementById('not-found');
        notFound.style.display = 'block';
    }
    
    const first20Data = data.slice(0,20);
    data.forEach(first20Data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 w-75 p-3 mx-auto">
                    <!-- phone image  -->
                    <img src="${first20Data.image}" class="img-fluid p-3 mx-auto" alt="..." width="250" height="300">
                    <!-- phone info  -->
                    <div class="card-body px-3">
                        <!-- phone name  -->
                      <h5 class="card-title">${first20Data.phone_name}</h5>
                      <!-- phone brand  -->
                      <p class="card-text">${first20Data.brand}</p>
                    </div>
                    <div class="card-footer py-0 bg-white border-0">
                        <button onclick="loadExplore('${first20Data.slug}')" id="explore-button" class="btn btn-primary">Explore</button>
                    </div>
                  </div>
        `;
        searchResult.appendChild(div); 
    });
}


// load explore 
const loadExplore = id => {
    // fetch API 
    const url2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url2)
    .then(response => response.json())
    .then(info => displayExplore(info.data));
}

// display explore 
const displayExplore = idDetail => {
    const exploreResult = document.getElementById('explore-result'); 
    exploreResult.textContent = '' ;
    exploreResult.style.display = 'block';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('mb-3');
    div.innerHTML = `
        <div class="row g-0">
                <div class="col-md-4">
                    <img src="${idDetail.image}" class="img-fluid rounded-start p-4" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body mt-2">
                        <h5 class="card-title">${idDetail.name}</h5>
                        <p class="card-text"><small class="text-muted">${idDetail.brand}</small></p>
                        <p class="card-text"><small class="text-muted"> Release Date: ${idDetail.releaseDate ? idDetail.releaseDate : "Not Found"}</small></p>
                        <p class="card-text"><small class="text-muted">Main Features: <br> 
                        storage: ${idDetail.mainFeatures.storage} <br>
                        memory: ${idDetail.mainFeatures.memory} <br>
                        chipSet: ${idDetail.mainFeatures.chipSet} <br>
                        displaySize: ${idDetail.mainFeatures.displaySize} 
                        </small></p>
                        <p class="card-text"><small class="text-muted">Sensors: 
                        ${idDetail.mainFeatures.sensors}</small></p>
                        ${idDetail.others ?  
                            `<p class="card-text"><small class="text-muted">Others Information: <br>
                            Bluetooth: ${idDetail?.others?.Bluetooth} <br>
                            GPS: ${idDetail?.others?.GPS} <br>
                            NFC: ${idDetail?.others?.NFC} <br>
                            Radio: ${idDetail?.others?.Radio} <br>
                            USB: ${idDetail?.others?.USB} <br>
                            WLAN: ${idDetail?.others?.WLAN} </small></p>` : ""
                        } 

                    </div>
                </div>
            </div>
    `
    exploreResult.appendChild(div);
}