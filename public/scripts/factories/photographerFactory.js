function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `public/assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographersList_profile');
        article.dataset.id = id;

        const content = `
        <a class="photographersList_profile_link" href="#">
            <img src="${picture}" class="photographersList_profile_link_picture" alt=""></img>
            <h2 class="photographersList_profile_link_name">${name}</h2>
        </a>
            <p class="photographersList_profile_location">${city}, ${country}</p>
            <p class="photographersList_profile_description">${tagline}</p>
            <p class="photographersList_profile_price">${price}€/jour</p>
        `;

        article.innerHTML = content;

        return article;
    }
    return { getUserCardDOM };
}
