/* * * * * * * * * * * * * * * * * * * */
/*  LightBox modal on Photograph page  */
/* * * * * * * * * * * * * * * * * * * */

export default class LightboxModal {
    constructor(mediaId, data) {
        this.currentMedia = data.find((e) => e.id == mediaId);

        // Get the list of all photographers medias
        this._photographerWork = data;
        // Find current index in photographers medias list, for navigation
        this._currentIndex = this._photographerWork.findIndex((e) => e.id === this.currentMedia.id);
        // Initialize lightbox modal node container
        this.$container = document.createElement('div');
        this.$container.classList.add('lightBoxModal');
        this.$container.setAttribute('aria-label', `${this.currentMedia.title}, closeup view`);

        // Bind this context for eventListenners
        this.manageKeyPress = this.manageKeyPress.bind(this);
        this.deleteModal = this.deleteModal.bind(this);

        console.log(this.currentMedia);
    }

    buildMediaNode(mode) {
        const balise = this._photographerWork[this._currentIndex].image ? 'img' : 'video';
        const source =
            balise === 'img' ? this._photographerWork[this._currentIndex].image : this._photographerWork[this._currentIndex].video;
        const desc = this._photographerWork[this._currentIndex].desc;

        if (mode === 'insert') {
            return `<${balise} class="lightBoxModal__media" src="public/assets/media/${source}" alt="${desc}" ${
                balise === 'video' ? 'controls="controls"' : ''
            }></${balise}>`;
        }
        const newNode = document.createElement(balise);
        newNode.classList.add('lightBoxModal__media');
        newNode.src = `public/assets/media/${source}`;
        newNode.controls = true;
        newNode.alt = desc;
        return newNode;
    }

    changeMedia(direction) {
        this._currentIndex = direction === 'next' ? this._currentIndex + 1 : this._currentIndex - 1;
        const currentMediaNode = document.querySelector('.lightBoxModal__media');
        const currentMediaTitle = document.querySelector('.lightBoxModal__mediaDesc');

        if (this._currentIndex < 0) {
            this._currentIndex = this._photographerWork.length - 1;
        } else if (this._currentIndex === this._photographerWork.length) {
            this._currentIndex = 0;
        }

        currentMediaTitle.remove();
        currentMediaNode.remove();
        const imgTitle = document.createElement('h2');
        imgTitle.classList.add('lightBoxModal__mediaDesc');
        imgTitle.textContent = this._photographerWork[this._currentIndex].title;
        document.querySelector('.lightBoxModal__mainContainer').appendChild(imgTitle);
        document.querySelector('.lightBoxModal__closeButton').before(this.buildMediaNode());
    }

    manageKeyPress(e) {
        switch (e.keyCode) {
            case 27:
                this.deleteModal();
                break;
            case 39:
                this.changeMedia('next');
                break;
            case 37:
                this.changeMedia('prev');
                break;
            default:
                break;
        }
    }

    deleteModal() {
        console.log(this);
        this.$container.remove();
        document.documentElement.removeEventListener('keydown', this.manageKeyPress);
    }

    render() {
        const html = `
                <button class="lightBoxModal__prevButton" aria-label="Précédent" tabindex="1">Image précédente</button>
                <div class="lightBoxModal__mainContainer">
                    <div class="lightBoxModal__imgContainer">
                        ${this.buildMediaNode('insert')}
                        <button class="lightBoxModal__closeButton" aria-label="Fermer" tabindex="0">Close dialog</button>
                    </div>
                    <h2 class="lightBoxModal__mediaDesc">${this.currentMedia.title}</h2>
                </div>
                <button class="lightBoxModal__nextButton" aria-label="Suivant" tabindex="2">Image suivante</button>
        `;
        // Inject above code into the node
        this.$container.innerHTML = html;

        // Event listeners
        this.$container.querySelector('.lightBoxModal__closeButton').addEventListener('click', this.deleteModal);
        this.$container.querySelector('.lightBoxModal__nextButton').addEventListener('click', () => {
            this.changeMedia('next');
        });
        this.$container.querySelector('.lightBoxModal__prevButton').addEventListener('click', () => {
            this.changeMedia('prev');
        });
        document.documentElement.addEventListener('keydown', this.manageKeyPress);

        // Inject LightBox in DOM
        document.querySelector('body').appendChild(this.$container);

        // Focus on close Button first for tab navigation
        document.querySelector('.lightBoxModal__closeButton').focus();
    }
}
