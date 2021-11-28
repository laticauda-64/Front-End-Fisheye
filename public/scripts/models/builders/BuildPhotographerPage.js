import PhotographerProfileLarge from '../../templates/PhotographerProfileLarge.js';
import FilterForm from '../../templates/FilterForm.js';
import DisplayMediaSection from '../../templates/DisplayMediaSection.js';

export default class BuildPhotographerPage {
    constructor({ photographerInfo, photographerWork, totalLikes }) {
        // Photographer profile top card & static mini bar
        new PhotographerProfileLarge({ ...photographerInfo, totalLikes }).render();

        // Filter Field
        new FilterForm(photographerWork).render();

        // Photographers display media section
        new DisplayMediaSection(photographerWork).render();
    }
}
