const databaseUrl = 'https://my-project-car-eb5d0-default-rtdb.firebaseio.com/';

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