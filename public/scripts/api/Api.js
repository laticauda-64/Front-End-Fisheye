class Api {
    static async fetchData() {
        return fetch('http://127.0.0.1:5500/data/photographers.json')
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log('an error occurs', err));
    }
}
