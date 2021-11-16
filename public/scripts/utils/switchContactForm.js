/* * * * * * * * * * * * * * * * * * * */
/*  Simple class to display            */
/*  contact form on Photograph page    */
/* * * * * * * * * * * * * * * * * * * */

class SwitchContactModal {
    constructor() {
        this._modalOpen = false;
        this.$modalForm = document.querySelector('.contactModal');
        this.$contactButton = document.querySelector('.photographer__profileCard__contactButton');
        this.$closeButton = document.querySelector('.contactModal__content__header__closeIcon');
        this.$submitButton = document.querySelector('.contactModal__content__form__submit');
    }

    triggerModal = (event) => {
        switch (event.type) {
            case 'click':
                this._modalOpen = !this._modalOpen;
                if (this._modalOpen) {
                    this.$modalForm.style.display = 'flex';
                    document.documentElement.addEventListener('keydown', this.triggerModal);
                } else {
                    this.$modalForm.style.display = 'none';
                    document.documentElement.removeEventListener('keydown', this.triggerModal);
                }
                break;

            case 'keydown':
                if (event.keyCode === 27) {
                    this.triggerModal({ type: 'click' });
                }
                break;

            default:
                break;
        }
    };

    submitForm(event) {
        event.preventDefault();
        const formData = new FormData(document.querySelector('.contactModal__content__form'));
        // Affichage des champs du formulaire dans la console
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    }

    addListeners() {
        this.$contactButton.addEventListener('click', this.triggerModal);
        this.$closeButton.addEventListener('click', this.triggerModal);
        this.$submitButton.addEventListener('click', this.submitForm);
    }
}
