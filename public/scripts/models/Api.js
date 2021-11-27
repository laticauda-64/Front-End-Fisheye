/**
 * Photographer type definition
 *
 * @typedef {Object} Photographer
 * @property {string} name
 * @property {number} id
 * @property {string} city
 * @property {string} tagline
 * @property {number} price
 * @property {string} portrait
 */

/**
 * Media type definition
 *
 * @typedef {Object} Media
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {string} desc
 * @property {string} [image]
 * @property {string} [video]
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 *
 */

/**
 * Fetch all data from Json file
 *
 */
class Api {
    async fetchData() {
        return fetch('data/photographers.json')
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log('an error occurs', err));
    }
}

/**
 * Extract photographers from Json file
 */
class GetPhotographers extends Api {
    constructor(id) {
        super();
        this.id = id;
    }

    /**
     * Get All Photographers
     * @returns {Photographer[]}
     */
    async getList() {
        const data = await this.fetchData();
        return data.photographers;
    }
    /**
     * Get one Photographer by id
     * @param {number} id
     * @returns {Photographer}
     */
    async getPhotographerById(id) {
        const data = await this.getList();
        return data.find((e) => e.id === id);
    }
}

class GetMedias extends Api {
    constructor(id) {
        super();
        this.id = id;
    }

    /**
     * Get all Medias for current Photographer
     * @param {number} id
     * @returns {Media[]} Array of Photographers
     */
    async getMedias(id) {
        const data = await this.fetchData();
        return data.media.filter((e) => e.photographerId === id);
    }
}

export { GetPhotographers, GetMedias };
