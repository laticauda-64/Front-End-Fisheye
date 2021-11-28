/* * * * * * * * * * * * * * * * * * * * * * * */
/*  Miniature Video Card on Photographer Page  */
/* * * * * * * * * * * * * * * * * * * * * * * */

export default class MediaVideo {
    constructor({ id, title, video, likes, date }) {
        const content = `
        <article data-date=${date} class="displayMediaSection__mediaCard" data-id=${id}>
            <a href="#" class="displayMediaSection__mediaCard__link" aria-label="${title}, closeup view">
                <svg width="150" height="150" class="displayMediaSection__mediaCard__link__playLogo" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M109.99 69.5565L56.7641 37.1976C51.9859 34.5363 45.9677 37.9536 45.9677 43.5484V106.452C45.9677 112.016 51.9556 115.464 56.7641 112.802L109.99 82.2581C114.95 79.506 114.95 72.3387 109.99 69.5565ZM150 75C150 33.5685 116.431 0 75 0C33.5685 0 0 33.5685 0 75C0 116.431 33.5685 150 75 150C116.431 150 150 116.431 150 75ZM14.5161 75C14.5161 41.5827 41.5827 14.5161 75 14.5161C108.417 14.5161 135.484 41.5827 135.484 75C135.484 108.417 108.417 135.484 75 135.484C41.5827 135.484 14.5161 108.417 14.5161 75Z" fill="rgba(255, 255, 255, 0.45)"/>
                </svg>
                <video class="displayMediaSection__mediaCard__picture" title=${title}>
                    <source src="public/assets/media/${video}" type="video/mp4">
                </video>
            </a>
            <div class="displayMediaSection__mediaCard__desc">
                <p class="displayMediaSection__mediaCard__desc__title">${title}</p>
                <p class="displayMediaSection__mediaCard__desc__likes" aria-label="likes" data-liked=false>${likes}</p>
            </div>
        </article>
        `;

        return document.createRange().createContextualFragment(content);
    }
}
