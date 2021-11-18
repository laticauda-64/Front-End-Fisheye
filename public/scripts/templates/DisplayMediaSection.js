/* * * * * * * * * * * * * * * * * * * * * * */
/*  DisplayMedia Section on Photograph page  */
/* * * * * * * * * * * * * * * * * * * * * * */

class DisplayMediaSection {
    constructor(data) {
        this._photographerWork = data;
    }

    render() {
        const displayWorkSection = document.createElement('div');
        displayWorkSection.classList.add('displayMediaSection');

        this._photographerWork.forEach((e) => {
            const workTemplate = new PhotographerMedia(e);
            displayWorkSection.appendChild(workTemplate.render());
        });

        app.$main.appendChild(displayWorkSection);
    }
}
