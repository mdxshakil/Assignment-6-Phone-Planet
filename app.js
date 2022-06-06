//scroll back to top
var rootElement = document.documentElement;
const scrollToTop = () => {
    rootElement.scrollTo({
        top: 80,
        behavior: "smooth"
      })
}
// toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//toggle result
const toggleResult = displayStyle => {
    document.getElementById('phone-container').style.display = displayStyle;
}
//fetch main data from api
const fetchDataFromApi = () => {
    toggleSpinner('block');
    toggleResult('none');
    document.getElementById('phone-details-container').textContent='';
    const searchText = document.getElementById('search-box').value;
    document.getElementById('search-box').value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}
// mouse click event to load data from api
document.getElementById('search-btn').addEventListener('click', function(){
    fetchDataFromApi();
})
// enter key event to load data from api
document.getElementById("search-box").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { 
        fetchDataFromApi();
}
}, false);
// display phone data
const displayData = phones => {
    const slicedPhonesResult = phones.slice(2,20);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
        if (slicedPhonesResult.length < 1) {
            document.getElementById('no-result').style.display = 'block';
        }
        else{
            document.getElementById('no-result').style.display = 'none';
            slicedPhonesResult.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100 p-3">
                        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body">
                          <h5 class="card-title text-success">${phone.phone_name}</h5>
                          <p class="card-text">${phone.brand}</p>
                          <button class="btn btn-success" onclick='loadPhoneDetails("${phone.slug}")'>See Details</button>
                        </div>
                      </div>
                `
                phoneContainer.appendChild(div);
            });
        }
        toggleSpinner('none');
        toggleResult('flex');
}
//fetch phone details by id
const loadPhoneDetails = phoneId => {
    toggleSpinner('block');
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

//display phone details
const displayPhoneDetails = phonesData => {
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.textContent='';
    const div1 = document.createElement('div1');
    div1.classList.add('col');
    div1.innerHTML = `
    <div class="card h-100 p-3">
                <img src="${phonesData.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-title text-success">${phonesData.name}</h5>
                  <h5 class="card-title">${phonesData.releaseDate ? phonesData.releaseDate : 'Release date not available'}</h5>
                  <li class="card-text">${phonesData.mainFeatures.storage}</li>
                  <li class="card-text">${phonesData.mainFeatures.displaySize}</li>
                  <li class="card-text">${phonesData.mainFeatures.chipSet}</li>
                  <li class="card-text">${phonesData.mainFeatures.memory}</li>
              </div>
    `
    const div2 = document.createElement('div2');
    div2.classList.add('col');
    div2.innerHTML = `
    <div class="card h-100 p-3">
                <div class="card-body">
                  <h5 class="card-title text-success">Sensors on this phone</h5>
                  <li class="card-text">${phonesData.mainFeatures.sensors[0] ? `✅ ${phonesData.mainFeatures.sensors[0]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[1] ? `✅ ${phonesData.mainFeatures.sensors[1]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[2] ? `✅ ${phonesData.mainFeatures.sensors[2]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[3] ? `✅ ${phonesData.mainFeatures.sensors[3]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[4] ? `✅ ${phonesData.mainFeatures.sensors[4]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[5] ? `✅ ${phonesData.mainFeatures.sensors[5]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[6] ? `✅ ${phonesData.mainFeatures.sensors[6]}` : '❌ Not Available'}</li>
                  <li class="card-text">${phonesData.mainFeatures.sensors[7] ? `✅ ${phonesData.mainFeatures.sensors[7]}` : '❌ Not Available'}</li>
                  <h5 class="card-title text-success mt-3">Other features on this phone</h5>
                  <li class="card-text">${phonesData.others.WLAN}</li>
                  <li class="card-text">${phonesData.others.Bluetooth}</li>
                  <li class="card-text">${phonesData.others.GPS}</li>
                  <li class="card-text">${phonesData.others.NFC}</li>
                  <li class="card-text">${phonesData.others.Radio}</li>
                </div>
              </div>
    `
    phoneDetailsContainer.appendChild(div1);
    phoneDetailsContainer.appendChild(div2);
    toggleSpinner('none');
    scrollToTop();
}