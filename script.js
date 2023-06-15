const search_box = document.querySelector(".input-area");
const suggestion_wrapper = document.querySelector(".suggestion_wrapper");
const city_wrapper = document.querySelector(".city_wrapper");

search_box.addEventListener("focus", () => {
  search_box.classList.add("is--focused");
});

search_box.addEventListener("focusout", () => {
  search_box.classList.remove("is--focused");
});

/////////////API CALL///////////////////////
/*
var api_call = function (id, childId) {
  const cardContainerSearch = document.getElementById(id);
  cardContainerSearch.innerHTML = "";

  let request = new XMLHttpRequest();
  let endPoint = new URL(
    `https://search.betterhalf.ai/search/city?charlist=${searchQuery.value}`
  );
  let url = endPoint.toString();

  request.open("GET", url, true);

  request.onload = function () {
    let suggestions = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      suggestions.result.forEach((suggestion) => {
        const style = document.getElementById(childId);
        const cardSearch = style.cloneNode(true);
        cardSearch.setAttribute("id", "");

        cardSearch.style.display = "grid";

        const search_suggestion =
          cardSearch.getElementsByClassName("suggestion_txt")[0];
        search_suggestion.textContent = suggestion.city;

        const state = cardSearch.getElementsByClassName("state")[0];
        state.textContent = suggestion.state;

        const country = cardSearch.getElementsByClassName("country")[0];
        country.textContent = suggestion.country;

        cardSearch.onclick = () => {
          const location = `${suggestion.city}`;
          birthState = `${suggestion.state}`;
          birthCountry = `${suggestion.country}`;
          lat = `${suggestion.latitude}`;
          long = `${suggestion.longitude}`;

          searchQuery.value = location;
          cardContainerSearch.innerHTML = "";
        };

        cardContainerSearch.appendChild(cardSearch);
      });
    }
  };
  request.send();
};
document
  .querySelector("#search_box")
  .addEventListener(
    "input",
    api_call.bind(event, "Cards-Container_search", "samplestyle_search"),
    false
  );
*/
//////////////////USING FETCH API/////////////////////////////////

const suggestion = async function () {
  const res = await fetch(
    `https://search.betterhalf.ai/search/city?charlist=${search_box.value}`
  );

  const data = await res.json();
  const loaction_array = data.result;

  suggestion_wrapper.classList.add("borders");

  loaction_array.forEach((location) => {
    console.log(location.city, location.country);

    suggestion_wrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="city_wrapper"><div class="suggestion_txt">${location.city}, ${location.country}</div></div>`
    );
  });
};

search_box.addEventListener("input", () => {
  suggestion();
});
