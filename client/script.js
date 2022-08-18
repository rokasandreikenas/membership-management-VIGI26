const handleDelete = (id) => {
  const params = { method: "DELETE" };
  fetch(`http://localhost:3000/memberships/${id}`, params)
    .then((resp) => resp.json())
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error(error));
};

const renderCard = (membership) => {
  const card = document.createElement("div");
  const info = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const actions = document.createElement("div");
  const deleteButton = document.createElement("span");
  const icon = document.createElement("i");

  card.className = "card";
  info.className = "info";
  actions.className = "actions";
  deleteButton.className = "delete-button";
  icon.className = "fa-solid fa-trash";

  deleteButton.addEventListener("click", () => handleDelete(membership["_id"]));

  title.textContent = `$${membership.price} ${membership.name}`;
  description.textContent = membership.description;

  info.append(title, description);

  deleteButton.append(icon);
  actions.append(deleteButton);

  card.append(info, actions);

  document.querySelector(".cards").append(card);
};

const fetchMemberships = () => {
  fetch("http://localhost:3000/memberships")
    .then((resp) => resp.json())
    .then((response) => {
      response.forEach((membership) => renderCard(membership));
    })
    .catch((error) => console.error(error));
};

fetchMemberships();
