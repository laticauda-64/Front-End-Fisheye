/* * * * * * * * * * * * * * * * * * */
/*  Filter field on Photograph page  */
/* * * * * * * * * * * * * * * * * * */

class FilterForm {
    constructor(work) {
        this._work = work;
        this.$wrapper = document.createElement('section');
        this.$main = document.getElementById('main');
    }

    customizedDropDownMenu = () => {
        this.$selectNative = document.querySelector('.filter__selectNative');
        this.$selectCustom = document.querySelector('.filter__selectCustom');
        this.$selectCustomTrigger = document.querySelector('.filter__selectCustom__trigger');
        this.$selectCustomOpts = document.querySelector('.filter__selectCustom__options');
        this.customOptsList = Array.from(this.$selectCustomOpts.children);
        this.optionsCount = this.customOptsList.length - 1;

        this.optionChecked = this.$selectCustomOpts.children[0].getAttribute('data-value');
        this.lastOptionChecked = this.optionChecked;
        this.$selectCustomOpts.children[0].classList.add('isActive');
        this.optionHoveredIndex = -1;

        const openSelectCustom = () => {
            this.$selectCustom.classList.add('isActive');
            // Remove aria-hidden in case this was opened by a user
            // who uses AT (e.g. Screen Reader) and a mouse at the same time.
            this.$selectCustom.setAttribute('aria-hidden', false);

            if (this.optionChecked) {
                const optionCheckedIndex = this.customOptsList.findIndex((el) => el.getAttribute('data-value') === this.optionChecked);
                updateCustomSelectHovered(optionCheckedIndex);
            }

            // Add related event listeners
            document.addEventListener('click', watchClickOutside);
            document.addEventListener('keydown', supportKeyboardNavigation);
        };

        const closeSelectCustom = () => {
            this.$selectCustom.classList.remove('isActive');

            this.$selectCustom.setAttribute('aria-hidden', true);

            updateCustomSelectHovered(-1);

            // Remove related event listeners
            document.removeEventListener('click', watchClickOutside);
            document.removeEventListener('keydown', supportKeyboardNavigation);
        };

        const updateCustomSelectHovered = (newIndex) => {
            const prevOption = this.$selectCustomOpts.children[this.optionHoveredIndex];
            const option = this.$selectCustomOpts.children[newIndex];

            if (prevOption) {
                prevOption.classList.remove('isHover');
            }
            if (option) {
                option.classList.add('isHover');
            }

            this.optionHoveredIndex = newIndex;
        };

        const updateCustomSelectChecked = (value, text) => {
            this.lastOptionChecked = this.optionChecked;

            const elPrevOption = this.$selectCustomOpts.querySelector(`[data-value="${this.lastOptionChecked}"`);
            const elOption = this.$selectCustomOpts.querySelector(`[data-value="${value}"`);

            if (elPrevOption) {
                elPrevOption.classList.remove('isActive');
            }

            if (elOption) {
                elOption.classList.add('isActive');
            }

            this.$selectCustomTrigger.textContent = text;
            this.optionChecked = value;
        };

        const watchClickOutside = (e) => {
            const didClickedOutside = !this.$selectCustom.contains(e.target);
            if (didClickedOutside) {
                closeSelectCustom();
            }
        };

        const supportKeyboardNavigation = (e) => {
            // prevent page scrolling
            if ([40, 38, 13, 32, 33, 34].includes(e.keyCode)) {
                e.preventDefault();
            }
            // press down -> go next
            if (e.keyCode === 40) {
                updateCustomSelectHovered(this.optionHoveredIndex === this.optionsCount ? 0 : this.optionHoveredIndex + 1);
            }

            // press up -> go previous
            if (e.keyCode === 38) {
                updateCustomSelectHovered(this.optionHoveredIndex === 0 ? this.optionsCount : this.optionHoveredIndex - 1);
            }

            // press pageDown -> go last
            if (e.keyCode === 33) {
                updateCustomSelectHovered(0);
            }

            // press pageUp -> go first
            if (e.keyCode === 34) {
                updateCustomSelectHovered(this.optionsCount);
            }

            // press Enter or space -> select the option
            if (e.keyCode === 13 || e.keyCode === 32) {
                const option = this.$selectCustomOpts.children[this.optionHoveredIndex];
                const value = option && option.getAttribute('data-value');

                if (value) {
                    this.$selectNative.value = value;
                    updateCustomSelectChecked(value, option.textContent);
                }
                closeSelectCustom();
            }

            // press ESC -> close selectCustom
            if (e.keyCode === 27) {
                closeSelectCustom();
            }
        };

        // Events listenners
        // Update selectCustom value when selectNative is changed.
        this.$selectNative.addEventListener('change', (e) => {
            const value = e.target.value;
            const elRespectiveCustomOption = this.$selectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0];
            updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
        });

        // Toggle custom select visibility when clicking the box
        this.$selectCustomTrigger.addEventListener('click', (e) => {
            const isClosed = !this.$selectCustom.classList.contains('isActive');

            if (isClosed) {
                openSelectCustom();
            } else {
                closeSelectCustom();
            }
        });

        // Imperative code
        // Update selectCustom value when an option is clicked or hovered
        this.customOptsList.forEach((elOption, index) => {
            elOption.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');

                // Sync native select to have the same value
                this.$selectNative.value = value;
                this.$selectNative.dispatchEvent(new Event('change'));
                updateCustomSelectChecked(value, e.target.textContent);
                closeSelectCustom();
            });

            elOption.addEventListener('mouseenter', (e) => {
                updateCustomSelectHovered(index);
            });

            // TODO: Toggle these event listeners based on selectCustom visibility
        });
    };

    onChangeFilterData = () => {
        // Reorder displayMedia section when select filter change

        this.$selectNative.addEventListener('change', (e) => {
            // If same option checked again, dont trigger nothing

            if (e.target.value === this.lastOptionChecked) {
                return;
            }
            const $mediaCardsNodes = Array.from(document.querySelectorAll('.displayMediaSection__mediaCard'));

            console.log($mediaCardsNodes);

            // Change state & nodes order for each case
            switch (e.target.value) {
                case 'popular':
                    this._work.sort((a, b) => b.likes - a.likes);
                    $mediaCardsNodes.sort(
                        (a, b) =>
                            parseInt(b.querySelector('.displayMediaSection__mediaCard__desc__likes').textContent) -
                            parseInt(a.querySelector('.displayMediaSection__mediaCard__desc__likes').textContent)
                    );
                    $mediaCardsNodes.forEach((e, i) => {
                        e.style.order = i;
                    });
                    app._photographerWork = this._work;
                    break;
                case 'date':
                    this._work.sort((a, b) => b.date - a.date);

                    $mediaCardsNodes.sort((a, b) => {
                        const first = parseInt(a.dataset.date);
                        const second = parseInt(b.dataset.date);
                        return second - first;
                    });

                    $mediaCardsNodes.forEach((e, i) => {
                        e.style.order = i;
                    });

                    app._photographerWork = this._work;
                    break;
                case 'title':
                    this._work.sort((a, b) => a.title.localeCompare(b.title));
                    $mediaCardsNodes.sort((a, b) => {
                        return a
                            .querySelector('.displayMediaSection__mediaCard__desc__title')
                            .textContent.localeCompare(b.querySelector('.displayMediaSection__mediaCard__desc__title').textContent);
                    });
                    $mediaCardsNodes.forEach((e, i) => {
                        e.style.order = i;
                    });
                    app._photographerWork = this._work;
                default:
                    break;
                // Change the main state in app for LigthBox modal correct order display
            }
        });
    };

    render() {
        this.$wrapper.classList.add('filter');

        const filterForm = `
                    <span class="filter__label" id="sortBy">Trier par</span>
                    <div class="filter__wrapper">
                        <!-- The native select for assistive tech -->
                        <select class="filter__selectNative" aria-labelledby="sortBy">
                            <option value="popular">Popularité</option>
                            <option value="date">Date</option>
                            <option value="title">Titre</option>
                        </select>
                        <!-- The beautiful custom select -->
                        <div class="filter__selectCustom" aria-hidden="true">
                            <div class="filter__selectCustom__trigger" role="button" aria-haspopup="listbox" aria-expended>Popularité</div>
                            <div class="filter__selectCustom__options"> 
                                <div class="filter__selectCustom__option" data-value="popular" role="listbox" aria-activedescendent>Popularité</div>
                                <div class="filter__selectCustom__option" data-value="date" role="listbox" aria-activedescendent>Date</div>
                                <div class="filter__selectCustom__option" data-value="title" role="listbox" aria-activedescendent>Titre</div>
                            </div>
                        </div>
                    </div>

        `;

        this.$wrapper.innerHTML = filterForm;
        this.$main.appendChild(this.$wrapper);

        this.customizedDropDownMenu();
        this.onChangeFilterData();
    }
}
