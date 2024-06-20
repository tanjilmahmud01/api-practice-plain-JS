async function loadPhone(searchText, isShowAll) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await res.json();
  console.log(data);
  setTimeout(() => {
    displayProducts(data.data, isShowAll);
  }, 1000);
}

const displayProducts = (data, isShowAll) => {
  const cardContainer = document.getElementById("card-container-section");
  // clear the card container before appending child
  cardContainer.textContent = "";

  const showAllContainer = document.getElementById("showAllBtn");

  if (data.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    data = data.slice(0, 9);
  }

  //loop through the data and append each div in the container
  data.forEach((element) => {
    // console.log(element);

    const productCard = document.createElement("div");
    //adding card styles
    productCard.classList.add("card");
    productCard.innerHTML = `<div class="card-image">
            <img src=${element.image} alt="card-image" />
          </div>

          <h3 class="card-title">${element.phone_name}</h3>

          <p class="card-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, earum.
          </p>

          <div class="card-price">
            <span>$</span>
            <span id="item-price">$999</span>
          </div>

          <div class="card-button">
            <button onClick="handleShowDetails('${element.slug}')" class="btn">Show Details</button>
          </div>`;
    cardContainer.appendChild(productCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const cardContainer = document.getElementById("card-container-section");
  // clear the card container before appending child
  cardContainer.textContent = "";
  const searchField = document.getElementById("search-input-field");
  const searchText = searchField.value;

  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinnerElement = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinnerElement.classList.remove("hidden");
  } else {
    loadingSpinnerElement.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetails = async (productId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${productId}`
  );
  const data = await res.json();
  const product = data.data;

  showProductDetails(product);
};

// show product details in a modal
const showProductDetails = (phone) => {
  console.log(phone);
  //   const phoneName = document.getElementById("show-detail-phone-name");
  //   phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");

  showDetailContainer.innerHTML = `
      <div id="modal-image-container">
        <img src="${phone?.image}" alt="" />
      </div>
      <p id='modal-item-name'>${phone?.name}</p>
      <p class="modal-item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque molestias recusandae vitae itaque quas vero?</p>
      <p class="modal-item-description"><span>Storage: </span>${
        phone?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>GPS: </span>${
        phone?.others?.GPS || "No GPS available"
      }</p>
      <p class="modal-item-description"><span>GPS: </span>${
        phone?.others?.GPS
          ? phone.others.GPS
          : "No GPS available in this device"
      }</p>
      <p class="modal-item-description"><span>Sensors: </span>${phone?.mainFeatures?.sensors?.join(
        ", "
      )}</p>
      <p class="modal-item-description"><span>Storage: </span>${
        phone?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        phone?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        phone?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        phone?.mainFeatures?.storage
      }</p>
  `;

  // show the modal

  const modal = document.getElementById("myModal");

  modal.style.display = "block";

  //close the modal
  document.getElementById("closeBtn").addEventListener("click", function () {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// loadPhone();
