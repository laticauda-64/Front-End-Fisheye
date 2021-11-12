class photographerProfileFactory {
    constructor({ infos, work }) {
        this._infos = infos;
        this._work = work;

        this.$main = document.getElementById('main');
    }

    createCard() {
        const { name, id, city, country, tagline, price, portrait } = this._infos;
        const card = `
            <article class="photographer__profil">
                <div class="photographer__profil__infos">
                        <h1 class="photographer__profil__infos__name">${name}</h1>
                        <p class="photographer__profil__infos__location">${city}, ${country}</p>
                        <p class="photographer__profil__infos__description">${tagline}</p>
                </div>
                <button class="photographer__profil__contactButton">Contactez-moi</button>
                <img class="photographer__profil__picture" src="public/assets/photographers/${portrait}" alt="Mimi Keel">
            </article>
        `;

        this.$main.innerHTML = card;
    }
}
