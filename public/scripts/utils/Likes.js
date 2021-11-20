/* * * * * * * * * * * * * * * * * * */
/*  Handle likes on Photograph page  */
/* * * * * * * * * * * * * * * * * * */

class Likes {
    constructor(likes) {
        this._totalLikes = likes;
        this.$totalLikes = document.querySelector('.photographer__stickyMiniBar__likes');
        this.$likesContainer = document.querySelectorAll('.displayMediaSection__mediaCard__desc__likes');
    }
    updateLikes(action, node) {
        let nodeLikes = parseInt(node.textContent);
        node.textContent = nodeLikes + (action === 'INC' ? 1 : -1);
        this._totalLikes = this._totalLikes + (action === 'INC' ? 1 : -1);
        this.render();
    }

    handleClick = (e) => {
        const isClicked = e.target.dataset.liked === 'true';
        this.updateLikes(isClicked ? 'DEC' : 'INC', e.target);
        e.target.dataset.liked = !isClicked;
    };

    init() {
        this.$likesContainer.forEach((e) => e.addEventListener('click', this.handleClick));
    }

    render() {
        this.$totalLikes.textContent = this._totalLikes;
        // Update count in the main app state
        app._totalLikes = this._totalLikes;
    }
}
