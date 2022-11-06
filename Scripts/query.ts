interface User {
    name: string;
    age: number;
    addresses: Address[];
}

interface Address {
    city: string;
}

function runQuery() {
    const result = __.chain<User>()
        .filter(doc => doc.age > 30)
        .sortBy(user => user.age)
        .map(user => user.addresses)
        .flatten<Address>()
        .value(null, callback)
    if (!result.isAccepted)
        throw new Error("The call was not accepted");

    function callback(err: Error, items: Address[]) {
        if (err) throw err;

        // or getContext().getResponse().setBody({    
        __.response.setBody({
            result: items
        })
    }
}
