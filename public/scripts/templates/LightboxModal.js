/* * * * * * * * * * * * * * * * * * * */
/*  LightBox modal on Photograph page  */
/* * * * * * * * * * * * * * * * * * * */

class LightboxModal {
    constructor({ id, video, image }) {
        // Get current medias info
        this._image = image;
        this._video = video;
        this._id = id;

        // Get the list of all photographers medias
        this._photographerWork = app._photographerWork;
        console.log(this._photographerWork);
        // Find current index in photographers medias list, for navigation
        this._currentIndex = this._photographerWork.findIndex((e) => e.id === this._id);
        // Initialize lightbox modal node container
        this.$container = document.createElement('div');
        this.$container.classList.add('lightBoxModal');

        console.log({ video, image });
    }

    buildMediaNode(mode) {
        const balise = this._photographerWork[this._currentIndex].image ? 'img' : 'video';
        const source =
            balise === 'img' ? this._photographerWork[this._currentIndex].image : this._photographerWork[this._currentIndex].video;

        if (mode === 'insert') {
            return `<${balise} class="lightBoxModal__media" src="public/assets/media/${source}" ${
                balise === 'video' ? 'controls="controls"' : ''
            }></${balise}>`;
        }
        const newNode = document.createElement(balise);
        newNode.classList.add('lightBoxModal__media');
        newNode.src = `/public/assets/media/${source}`;
        newNode.controls = true;
        return newNode;
    }

    changeMedia(direction) {
        this._currentIndex = direction === 'next' ? this._currentIndex + 1 : this._currentIndex - 1;
        const currentMediaNode = document.querySelector('.lightBoxModal__media');

        if (this._currentIndex < 0) {
            this._currentIndex = this._photographerWork.length - 1;
        } else if (this._currentIndex === this._photographerWork.length) {
            this._currentIndex = 0;
        }

        currentMediaNode.remove();
        document.querySelector('.lightBoxModal__closeButton').before(this.buildMediaNode());
    }

    manageKeyPress = (e) => {
        switch (e.keyCode) {
            case 27:
                this.deleteModal();
                break;
            case 39:
                this.changeMedia('next');
                console.log('next');
                break;
            case 37:
                this.changeMedia('prev');
                break;
            default:
                console.log(e.keyCode);
                break;
        }
    };

    deleteModal = () => {
        this.$container.remove();
        document.documentElement.removeEventListener('keydown', this.manageKeyPress);
    };

    render() {
        const html = `
                <button class="lightBoxModal__prevButton" tabindex="0">Image précédente</button>
                <div class="lightBoxModal__mainContainer">
                    <div class="lightBoxModal__imgContainer">
                        ${this.buildMediaNode('insert')}
                        <button class="lightBoxModal__closeButton" tabindex="0">Close dialog</button>
                    </div>
                    <h2 class="lightBoxModal__mediaDesc">Lonesome</h2>
                </div>
                <button class="lightBoxModal__nextButton" tabindex="0">Image suivante</button>
        `;
        // Inject above code into the node
        this.$container.innerHTML = html;

        // Event listeners
        this.$container.querySelector('.lightBoxModal__closeButton').addEventListener('click', this.deleteModal);
        document.documentElement.addEventListener('keydown', this.manageKeyPress);

        // Inject LightBox in DOM
        document.querySelector('body').appendChild(this.$container);
    }
}
