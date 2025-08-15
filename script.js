const userContainer = document.getElementById("user-container");
const errorMessage = document.getElementById("error");
const reloadBtn = document.getElementById("reload-btn");

async function fetchUserData() {
  userContainer.innerHTML = "<p style='text-align:center;'>⏳ Loading profiles...</p>";
  errorMessage.textContent = "";

  try {
    const response = await fetch("https://randomuser.me/api/?results=8");

    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }

    const data = await response.json();
    const users = data.results;
    userContainer.innerHTML = "";

    users.forEach((user, index) => {
      const card = document.createElement("div");
      card.classList.add("user-card");
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
        <div class="user-name">${user.name.first} ${user.name.last}</div>
        <div class="user-email">📧 ${user.email}</div>
        <div class="user-location">📍 ${user.location.city}, ${user.location.country}</div>
      `;

      userContainer.appendChild(card);
    });
  } catch (error) {
    errorMessage.textContent = "⚠️ Error: " + error.message;
    userContainer.innerHTML = "";
  }
}

reloadBtn.addEventListener("click", fetchUserData);
fetchUserData();
