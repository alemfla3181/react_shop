const continents = [
    {
        _id: 1,
        name: "Asia",
    },{
        _id: 2,
        name: "Europe",
    },
    {
        _id: 3,
        name: "Africa",
    },
    {
        _id: 4,
        name: "North America",
    },
    {
        _id: 5,
        name: "South America",
    },
    {
        _id: 6,
        name: "Oceania",
    },
    {
        _id: 7,
        name: "Antarctica",
    },
];

const price = [
    {
        _id: 0,
        name: "Any",
        array: [],
    },
    {
        _id: 1,
        name: "$0~$10",
        array: [0, 10],
    },
    {
        _id: 2,
        name: "$11~$20",
        array: [11, 20],
    },
    {
        _id: 3,
        name: "$21~$40",
        array: [21, 40],
    },
    {
        _id: 4,
        name: "$41~$100",
        array: [41, 100],
    },
    {
        _id: 5,
        name: "$101~$200",
        array: [101, 200],
    },
    {
        _id: 6,
        name: "$200~$1000",
        array: [200, 1000],
    },
];

export {
    continents,
    price
}