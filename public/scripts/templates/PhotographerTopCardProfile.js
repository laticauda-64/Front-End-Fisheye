/* * * * * * * * * * * * * * * * * * * * * */
/*  Big Card Profile on Photographer Page  */
/* * * * * * * * * * * * * * * * * * * * * */

class PhotographerTopCardProfile {
    constructor(infos) {
        this._infos = infos;
        this.$main = document.getElementById('main');
    }

    render() {
        const { name, id, city, country, tagline, price, portrait } = this._infos;
        const card = `
            <article class="photographer__profileCard">
                <div class="photographer__profileCard__infos">
                        <h1 class="photographer__profileCard__infos__name">${name}</h1>
                        <p class="photographer__profileCard__infos__location">${city}, ${country}</p>
                        <p class="photographer__profileCard__infos__description">${tagline}</p>
                </div>
                <button class="photographer__profileCard__contactButton">Contactez-moi</button>
                <img class="photographer__profileCard__picture" src="public/assets/photographers/${portrait}" alt="Mimi Keel">
            </article>
        `;

        this.$main.innerHTML = card;
    }
}
