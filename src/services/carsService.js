const databaseUrl = 'https://my-project-car-eb5d0-default-rtdb.firebaseio.com/';

export async function getAllCars(id){
    const records = await fetch(`${databaseUrl}cars.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    const ownedCars = Object.entries(records).filter( rec => rec[1].ownerId === id);
    return (ownedCars);
}

export async function getAllParts(id){
    const records = await fetch(`${databaseUrl}cars/${id}/parts.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    const validParts = Object.entries(records).filter( rec => rec[1].name);
    return (validParts);
}

export async function getOneCar(id){
    const record = await fetch(`${databaseUrl}cars/${id}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())

    return (record);
}

export async function create(model, year, price, imageUrl, ownerId){
    let car = {
        model,
        year,
        price,
        imageUrl,
        ownerId,
        parts: [''],
    };

    return fetch(`${databaseUrl}cars.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    })
};

export async function addCarPart(id, name, price, shopUrl){
    let part = {
        name,
        price,
        shopUrl,
    };

    return fetch(`${databaseUrl}cars/${id}/parts.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(part)
    })
}

export async function editCar(model, year, price, imageUrl, carId){
    let car = {
        model,
        year,
        price,
        imageUrl
    };

    return fetch(`${databaseUrl}cars/${carId}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    })
};

export async function deleteCar(id){
    return await fetch(`${databaseUrl}cars/${id}.json`, {
        method: 'DELETE',
    })
}