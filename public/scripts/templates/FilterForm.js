/* * * * * * * * * * * * * * * * * * */
/*  Filter field on Photograph page  */
/* * * * * * * * * * * * * * * * * * */

class FilterForm {
    constructor(work) {
        this._work = work;
        this.$wrapper = document.createElement('section');
        this.$main = document.getElementById('main');
    }

    onChangeFilter() {
        // Ici event listenners pour gérer la sélection d'un critère de filtre
    }

    clearMoviesWrapper() {
        // Ici fonction pour effacer la liste des travaux
        // this.$moviesWrapper.innerHTML = ""
    }

    render() {
        this.$wrapper.classList.add('filter');

        const filterForm = `
                    <label for="Order-By" class="filter__label">Trier par</label>
                    <select name="Order-By" id="Order-By" class="filter__input">
                        <option value="popular">Popularité</option>
                        <option value="date">Date</option>
                        <option value="title">Titre</option>
                    </select>
        `;

        this.$wrapper.innerHTML = filterForm;
        // this.onChangeFilter();

        this.$main.appendChild(this.$wrapper);
    }
}
