
const loadPhone = async (value = "13", isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

function handleSearch(isShowAll) {
    loaderSpinner(true);
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;
    loadPhone(searchValue, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const getPhoneCard = document.getElementById('phone-card');
    getPhoneCard.textContent = '';

    const getShowAllBtn = document.getElementById('show-all-btn');

    if(phones.length > 9 && !isShowAll){
        getShowAllBtn.classList.remove('hidden')
        
    }
    else{
        getShowAllBtn.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 9); 
    }

    phones.forEach(phone => {
        // create div and set class
        const div = document.createElement('div');
        div.classList = `card-body`;
        // loadDetails(phone.slug);
        // set innerHTML
        div.innerHTML = 
                `<div class="card-img">
                    <img src=${phone.image} alt="">
                </div>
                <h5>${phone.phone_name}</h5>
                <p>${phone.slug}</p>
                <h5>$<span>999</span></h5>
                <button onclick="handleShowDetails('${phone.slug}')">Show Details</button>`;

        getPhoneCard.appendChild(div);

    });
    loaderSpinner(false);
}

const loaderSpinner = (isLoading) => {
    const getLoader = document.getElementById("spinner");
    if(isLoading){
        getLoader.classList.remove('hidden')
    }
    else{
        getLoader.classList.add('hidden');
    }
}

const handleShowAll = () => {
    const isShowAll = true;
    handleSearch(isShowAll);
}

const handleShowDetails = async (id) =>{
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        const phoneData = data.data;
        phoneDetails(phoneData)
        // console.log(data.data.name);   
}
const phoneDetails = (phoneData) =>{
    const getModal = document.getElementById('modal-details'); 
    getModal.innerHTML =    `<div class="modal-img">
                                <img src=${phoneData.image} alt="">
                            </div>
                            <h2>${phoneData.name}</h2>
                            <P>Storage:<span>${phoneData.
                                mainFeatures.storage}</span> </P>
                            <P>Display Size: <span>${phoneData.
                                mainFeatures.displaySize}</span></P>
                            <P>ChipSet :<span>${phoneData.
                                mainFeatures.chipSet}</span></P>
                            <P>Release Date :<span>${phoneData.
                                mainFeatures.releaseDate}</span></P>` ;   

    window.dialog.showModal()
}

loadPhone();
// Modal

// const getModal = document.getElementById('modal');
// const button = document.createElement('button');
// button.setAttribute('onclick', '')
// // =";"
// getModal.appendChild(button);