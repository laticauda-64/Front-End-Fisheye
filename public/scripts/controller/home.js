/* * * * * * * * * * * * * * * * * * * */
/*  Main JS entry point for Home page  */
/* * * * * * * * * * * * * * * * * * * */
import { GetPhotographers } from '../models/Api.js';
import DisplayPhotographersMiniatures from '../models/builders/DisplayPhotographersMiniatures.js';

class App {
    constructor() {
        // Dom nodes
        this.dom = {
            $photographersSection: document.querySelector('.photographersSection'),
        };

        // Properties
        this._api = new GetPhotographers();
        this._photographersList = [];
    }

    /**
     * Initialiaze the JS on index.html page
     * @async
     * @returns {void}
     */
    async main() {
        this._photographersList = await this._api.getList();

        new DisplayPhotographersMiniatures(this._photographersList, this.dom.$photographersSection).init();
    }
}

const app = new App();
app.main();
