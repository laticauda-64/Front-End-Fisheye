//Mettre le code JavaScript lié à la page photographer.html

class App {
    constructor() {
        this._urlQueryParams = new URLSearchParams(window.location.search);
        this._photographerId = Object.fromEntries(this._urlQueryParams.entries()).id;
    }

    async fetchPhotographer() {
        const id = this._photographerId;
        // Method which fetch information about selected photographer
        if (id && parseInt(id)) {
            const data = await Api.fetchData();
            const photographerInfos = data.photographers.find((e) => e.id === parseInt(id));
            const photographerWork = data.media.filter((e) => e.photographerId === parseInt(id));

            return { infos: photographerInfos, work: photographerWork };
        }
        console.log("Impossible de récupérer l'id du photographe...");
    }

    async createProfileCard() {
        const data = await this.fetchPhotographer();
    }

    async main() {
        // main render method
        console.log('main method');
        console.log(await this.fetchPhotographer());
        const test = new photographerProfileFactory(await this.fetchPhotographer());
        test.createCard();
    }
}

const app = new App();
app.main();
