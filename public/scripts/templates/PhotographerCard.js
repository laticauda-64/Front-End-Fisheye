// function photographerFactory(data) {
//     const { name, id, city, country, tagline, price, portrait } = data;

//     const picture = `public/assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement('article');
//         article.classList.add('photographersSection_profile');
//         article.dataset.id = id;

//         const content = `
//         <a class="photographersSection_profile_link" href="photographer.html?id=${id}">
//             <img src="${picture}" class="photographersSection_profile_link_picture" alt=""></img>
//             <h2 class="photographersSection_profile_link_name">${name}</h2>
//         </a>
//             <p class="photographersSection_profile_location">${city}, ${country}</p>
//             <p class="photographersSection_profile_description">${tagline}</p>
//             <p class="photographersSection_profile_price">${price}€/jour</p>
//         `;

//         article.innerHTML = content;

//         return article;
//     }
//     return { getUserCardDOM };
// }

class PhotographerCard {
    constructor(data) {
        this._data = data;
    }

    render() {
        const { name, id, city, country, tagline, price, portrait } = this._data;
        const picture = `public/assets/photographers/${portrait}`;

        const article = document.createElement('article');
        article.classList.add('photographersSection_profile');
        article.dataset.id = id;

        const content = `
        <a class="photographersSection_profile_link" href="photographer.html?id=${id}">
            <img src="${picture}" class="photographersSection_profile_link_picture" alt=""></img>
            <h2 class="photographersSection_profile_link_name">${name}</h2>
        </a>
            <p class="photographersSection_profile_location">${city}, ${country}</p>
            <p class="photographersSection_profile_description">${tagline}</p>
            <p class="photographersSection_profile_price">${price}€/jour</p>
        `;

        article.innerHTML = content;

        return article;
    }
}
