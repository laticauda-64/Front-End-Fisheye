/* * * * * * * * * * * * * * * * * * */
/*  Handle clicks on pictures to     */
/*       display LightBox Modal      */
/* * * * * * * * * * * * * * * * * * */

import LightboxModal from '../templates/LightboxModal.js';

export default class OpenLightBoxModal {
    constructor() {
        this.$mediaCards = document.querySelectorAll('.displayMediaSection__mediaCard');
    }

    addListeners(data) {
        this.$mediaCards.forEach((e) =>
            e.addEventListener('click', function (e) {
                e.preventDefault();
                const lightBox = new LightboxModal(this.dataset.id, data);
                lightBox.render();
            })
        );
    }
}
