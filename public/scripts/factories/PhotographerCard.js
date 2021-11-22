/* * * * * * * * * * * * * * * * */
/*  Miniature Card on Home Page  */
/* * * * * * * * * * * * * * * * */

class PhotographerCard {
    constructor(data) {
        this._data = data;
    }

    render() {
        const { name, id, city, country, tagline, price, portrait } = this._data;
        const picture = `public/assets/photographers/${portrait}`;

        const article = document.createElement('article');
        article.classList.add('photographersSection__profile');
        article.dataset.id = id;

        const content = `
            <a class="photographersSection__profile__link" href="photographer.html?id=${id}">
                <img src="${picture}" class="photographersSection__profile__link__picture" alt=" "></img>
                <h2 class="photographersSection_profile_link_name">${name}</h2>
            </a>
            <p class="photographersSection__profile__location">${city}, ${country}</p>
            <p class="photographersSection__profile__description">${tagline}</p>
            <p class="photographersSection__profile__price">${price}€/jour</p>
        `;

        article.innerHTML = content;

        return article;
    }
}
