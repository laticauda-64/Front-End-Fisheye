class App {
    constructor() {
        // Nodes
        this.$photographersSection = document.querySelector('.photographersSection');

        // Api data
        this._api = new Api();

        // Properties
        this._photographersList = [];
    }

    async getPhotographersList() {
        const data = await this._api.fetchData();
        this._photographersList = data.photographers;
    }

    async main() {
        await this.getPhotographersList();

        this._photographersList.forEach((e) => {
            const cardTemplate = new PhotographerCard(e);
            this.$photographersSection.appendChild(cardTemplate.render());
        });
    }
}

const app = new App();
app.main();
