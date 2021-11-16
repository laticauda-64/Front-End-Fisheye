/* * * * * * * * * * * * * * * * * * * */
/*  LightBox modal on Photograph page  */
/* * * * * * * * * * * * * * * * * * * */
class App {
    constructor() {
        // Query string parameters to display the correct subject
        this._urlQueryParams = new URLSearchParams(window.location.search);
        this._photographerId = Object.fromEntries(this._urlQueryParams.entries()).id;

        // Nodes
        this.$main = document.getElementById('main');

        // Api
        this._api = new Api();

        // Properties
        this._photographerInfo = {};
        this._photographerWork = [];
    }

    getIdFromUrl() {
        const id = this._photographerId;
        if (id && parseInt(id)) {
            return parseInt(id);
        }
        throw new Error("Format d'Id incorrect dans l'url...");
    }

    async fetchPhotographer() {
        const data = await this._api.fetchData();
        const id = this.getIdFromUrl();
        this._photographerInfo = data.photographers.find((e) => e.id === id);
        this._photographerWork = data.media.filter((e) => e.photographerId === id);
    }

    async main() {
        await this.fetchPhotographer();

        // Photographer profile top card
        const photographerProfil = new PhotographerTopCardProfile(this._photographerInfo);
        photographerProfil.render();

        // Filter Field
        const filterField = new FilterForm(this._photographerWork);
        filterField.render();

        // Photographers display media section
        const displayWorkSection = document.createElement('div');
        displayWorkSection.classList.add('displayMediaSection');

        this._photographerWork.forEach((e) => {
            const workTemplate = new PhotographerMedia(e);
            displayWorkSection.appendChild(workTemplate.render());
        });

        this.$main.appendChild(displayWorkSection);

        // Handle contact Form Modal
        new SwitchContactModal().addListeners();

        // Exemple de flow
        // const Form = new FormModal(this.UserContext)
        // Form.render()

        // const Filter = new FilterForm(this.FullMovies)
        // Filter.render()
    }
}

const app = new App();
app.main();
