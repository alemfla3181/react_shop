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
        name: "$0~$200",
        array: [0, 200],
    },
    {
        _id: 2,
        name: "$201~$500",
        array: [201, 500],
    },
    {
        _id: 3,
        name: "$501~$1000",
        array: [501, 1000],
    },
    {
        _id: 4,
        name: "$1001~$1500",
        array: [1001, 1500],
    },
    {
        _id: 5,
        name: "$1501~$2000",
        array: [1501, 2000],
    },
    {
        _id: 6,
        name: "More than $2000",
        array: [2001, 150000],
    },
];

export {
    continents,
    price
}