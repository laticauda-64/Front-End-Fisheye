/* * * * * * * * * * * * * * * * * * */
/*  Handle likes on Photograph page  */
/* * * * * * * * * * * * * * * * * * */

// Initialiser un nouvel objet dans app.observers;
// Utiliser l'objet pour gérer le clic sur un coeur -> dec/incrémenter media concerné et maj total + minicardbottom

class Likes {
    constructor(likes) {
        this._totalLikes = likes;
        this.$totalLikes = document.querySelector('.photographer__stickyMiniBar__likes');
        this.$likesContainer = document.querySelectorAll('.displayMediaSection__mediaCard__desc__likesCont');
    }
    updateLikes(action, node) {
        let nodeLikes = parseInt(node.firstElementChild.textContent);
        node.firstElementChild.textContent = nodeLikes + (action === 'INC' ? 1 : -1);
        this._totalLikes = this._totalLikes + (action === 'INC' ? 1 : -1);
        this.render();
    }

    handleClick = (e) => {
        const update = (node) => {
            const isClicked = node.dataset.liked === 'true';
            this.updateLikes(isClicked ? 'DEC' : 'INC', node);
            node.dataset.liked = !isClicked;
        };

        switch (e.target.nodeName.toLowerCase()) {
            case 'div':
                update(e.target);
                break;
            case 'p':
                update(e.target.parentNode);
                break;
            case 'svg':
                update(e.target.parentNode);
                break;
            case 'path':
                update(e.target.parentNode.parentNode);
                break;

            default:
                break;
        }
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
