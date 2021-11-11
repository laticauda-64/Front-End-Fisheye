function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `public/assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const content = `
        <img src="${picture}"></img>
        <h2>${name}</h2>
        <p>${city}</p>
        <p>${tagline}</p>
        <p>${price}</p>
        `;

        article.innerHTML = content;

        return article;
    }
    return { getUserCardDOM };
}
