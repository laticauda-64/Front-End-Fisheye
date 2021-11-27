import Api from '../models/Api.js';
import PhotographerTopCardProfile from '../templates/PhotographerProfileLarge.js';
import FilterForm from '../templates/FilterForm.js';
import DisplayMediaSection from '../templates/DisplayMediaSection.js';
import SwitchContactModal from '../utils/switchContactForm.js';
import Likes from '../utils/Likes.js';

class App {
    constructor() {
        // Query string parameters to display the correct subject
        this._photographerId = Object.fromEntries(new URLSearchParams(window.location.search).entries()).id;

        // Nodes
        this.$main = document.getElementById('main');

        // Api
        this._api = new Api();

        // Properties
        this._photographerInfo = {};
        this._photographerWork = [];
        this._totalLikes;
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
        // By default, sort work by popularity (likes) & get a timestamp for dates
        this._photographerWork = data.media
            .filter((e) => e.photographerId === id)
            .sort((a, b) => b.likes - a.likes)
            .map((e) => {
                e.date = new Date(e.date).getTime();
                return e;
            });
        this._totalLikes = this._photographerWork.reduce((a, b) => a + b.likes, 0);
    }

    async main() {
        await this.fetchPhotographer();

        // Photographer profile top card & static mini bar
        const photographerProfil = new PhotographerTopCardProfile(this._photographerInfo, this._totalLikes);
        photographerProfil.render();

        // Filter Field
        const filterField = new FilterForm(this._photographerWork);
        filterField.render();

        // Photographers display media section
        const displayMediaSection = new DisplayMediaSection(this._photographerWork);
        displayMediaSection.render();

        // Handle contact Form Modal
        new SwitchContactModal().addListeners();

        // Likes system
        const handleLikes = new Likes(this._totalLikes);
        handleLikes.init();
    }
}

var app = new App();
app.main();
