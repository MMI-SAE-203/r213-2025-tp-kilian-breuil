import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getOffre() {
    try {
        let data = await pb.collection('maison').getFullList({
        });
        data = data.map((d) => {
            d.field = pb.files.getURL(d, d.field);
            return d;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
        } catch (error) {
            console.log('Une erreur est survenue en lisant la maison', error);
            return null;
        }
    }

export async function getSurface() {
    try {
        let data = await pb.collection('Maison').getFullList({
            filter: `surface > ${surface}`,
            sort: '-created',
        });
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons avec une surface supérieure à demandé', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await pb.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'+ error
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('maison').getFullList({
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.field = pb.files.getURL(maison, maison.field);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function getAgents() {
    try {
        let agent = await pb.collection('agent').getFullList({
        });
        return agent;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        let data = await pb.collection('agent').getOne(id);
        // data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function setFavori(house) {
    await pb.collection('maison').update(house.id, {favori: !house.favori});
}