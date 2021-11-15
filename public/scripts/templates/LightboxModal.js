/* * * * * * * * * * * * * * * * * * * */
/*  LightBox modal on Photograph page  */
/* * * * * * * * * * * * * * * * * * * */

class LightboxModal {
    constructor({ video, image }) {
        // Get the list of current photograph medias
        this._photographerWork = app._photographerWork;
        this._image = image;
        this._video = video;
        console.log({ video, image });
    }

    onClick(e) {
        console.log(this);
        this.remove();
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('lightBoxModal');

        const html = `
                <button class="lightBoxModal__nextButton" tabindex="0">Image suivante</button>
                <button class="lightBoxModal__prevButton" tabindex="0">Image précédente</button>
                <div class="lightBoxModal__mainContainer">
                    <div class="lightBoxModal__imgContainer">
                        <button class="lightBoxModal__closeButton" tabindex="0">Close dialog</button>
                        <img class="lightBoxModal__media" src="/public/assets/media/${this._image}">
                    </div>
                    <h2 class="lightBoxModal__mediaDesc">Lonesome</h2>
                </div>
        `;

        //         const html = `

        //         <div class="lightBoxModal__mainContainer">

        //         </div>
        // `;

        container.innerHTML = html;

        container.addEventListener('click', this.onClick);

        document.querySelector('body').appendChild(container);
    }
}
