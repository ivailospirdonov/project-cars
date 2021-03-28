const databaseUrl = 'https://my-project-car-eb5d0-default-rtdb.firebaseio.com/';

export async function getAll(id){
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