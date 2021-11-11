async function getPhotographers(data) {
    return {
        photographers: [...data],
    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const api = await Api.fetchData();
    const { photographers } = await getPhotographers(api.photographers);
    displayData(photographers);
    console.log(api.photographers);
}

init();
