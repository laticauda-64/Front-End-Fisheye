class Api {
    async fetchData() {
        return fetch('data/photographers.json')
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log('an error occurs', err));
    }
}
