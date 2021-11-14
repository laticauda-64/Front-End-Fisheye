/* * * * * * * * * * * * * * * * * * */
/*  Media Card on photographer Page  */
/* * * * * * * * * * * * * * * * * * */

class PhotographerMedia {
    constructor(data) {
        this._data = data;
    }

    onClick(node) {
        node.addEventListener('click', function (e) {
            console.log(this);
        });
    }

    render() {
        const { id, photographerId, title, image, likes, date, price, video } = this._data;

        const thumbnail = image
            ? `<img src="public/assets/media/${image}" class="displayMediaSection__mediaCard__picture" alt=""></img>`
            : `<svg width="150" height="150" class="displayMediaSection__mediaCard__link__playLogo" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M109.99 69.5565L56.7641 37.1976C51.9859 34.5363 45.9677 37.9536 45.9677 43.5484V106.452C45.9677 112.016 51.9556 115.464 56.7641 112.802L109.99 82.2581C114.95 79.506 114.95 72.3387 109.99 69.5565ZM150 75C150 33.5685 116.431 0 75 0C33.5685 0 0 33.5685 0 75C0 116.431 33.5685 150 75 150C116.431 150 150 116.431 150 75ZM14.5161 75C14.5161 41.5827 41.5827 14.5161 75 14.5161C108.417 14.5161 135.484 41.5827 135.484 75C135.484 108.417 108.417 135.484 75 135.484C41.5827 135.484 14.5161 108.417 14.5161 75Z" fill="rgba(255, 255, 255, 0.45)"/>
              </svg>
            
                <video class="displayMediaSection__mediaCard__picture" title="">
                    <source src="public/assets/media/${video}" type="video/mp4">
                </video>`;

        const article = document.createElement('article');
        article.classList.add('displayMediaSection__mediaCard');
        article.dataset.id = id;

        const content = `
            <a href="#" class="displayMediaSection__mediaCard__link">
                ${thumbnail}
            </a>
            <div class="displayMediaSection__mediaCard__desc">
                <p class="displayMediaSection__mediaCard__desc__title">${title}</p>
                <p class="displayMediaSection__mediaCard__desc__likes">${likes}
                <svg role="img" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="likes">
					<path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"></path>
				</svg>
                </p>    
            </div>
        `;

        article.innerHTML = content;

        this.onClick(article);

        return article;
    }
}
