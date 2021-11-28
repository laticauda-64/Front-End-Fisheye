/* * * * * * * * * * * * * * * * * * * * * * */
/*  DisplayMedia Section on Photograph page  */
/* * * * * * * * * * * * * * * * * * * * * * */
import PhotographerMedia from '../models/factories/PhotographerMedia.js';
export default class DisplayMediaSection {
    constructor(data) {
        this._photographerWork = data;
        this.$main = document.getElementById('main');
    }

    // Display all media cards for current photographer
    render() {
        const displayWorkSection = document.createElement('div');
        displayWorkSection.classList.add('displayMediaSection');

        this._photographerWork.forEach((e) => {
            const workTemplate = new PhotographerMedia(e, this._photographerWork);
            displayWorkSection.appendChild(workTemplate.render());
        });

        this.$main.appendChild(displayWorkSection);
    }
}
