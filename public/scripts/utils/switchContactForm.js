/* * * * * * * * * * * * * * * * * * * */
/*  Simple class to display            */
/*  contact form on Photograph page    */
/* * * * * * * * * * * * * * * * * * * */

class SwitchContactModal {
    constructor() {
        this._modalOpen = false;
        this.$modalForm = document.getElementById('contact_modal');
        this.$contactButton = document.querySelector('.photographer__profileCard__contactButton');
    }

    triggerModal = () => {
        this._modalOpen = !this._modalOpen;
        this.$modalForm.style.display = this._modalOpen ? 'block' : 'none';
    };

    addListeners() {
        this.$contactButton.addEventListener('click', this.triggerModal);
    }
}
