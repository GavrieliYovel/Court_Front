const users = [{
    "_id": "63c6f00322c07481efcd1960",
    "name": "Itay Aharoni",
    "email": "ita@gmail.com",
    "password": "$2b$08$jhJ4UFPe9hON/Jyneve2X.02QLq06mHQU3z6oz8JdJLH/dyT5k8D2",
    "birthday": "1997-04-04T21:00:00.000Z",
    "phoneNumber": "050-5555555",
    "address": "Petah Tikva",
    "type": "admin",
    "supervisedCourt": [{
        "_id": "63c6ed1003485bae64e3c7ea",
        "name": "Sportech",
        "location": {"LON": 34.8064, "LAT": 32.082, "_id": "63c6ed1003485bae64e3c7eb"},
        "city": "Tel Aviv",
        "scope": ["Basketball"],
        "supervisor": ["63c6f00322c07481efcd1960"],
        "games": [],
        "status": "active"
    }]
}, {
    "_id": "63c6f1f022c07481efcd1964",
    "name": "Itay Jordan",
    "email": "ia@gmail.com",
    "password": "$2b$08$D70BEk1L/oWEi1.VHkcebe/gCjYEy0IEX0pOJL93LZrATQCpvFd4m",
    "birthday": "1997-04-04T21:00:00.000Z",
    "phoneNumber": "050-5555555",
    "address": "Petah Tikva",
    "type": "player",
    "supervisedCourt": [],
    "rank": 1
}, {
    "_id": "63c6f3353dbfc677bcb2e871",
    "name": "Peer Fikhman",
    "email": "peer@gmail.com",
    "password": "$2b$08$D/oo8zozATTQ70DFLFOd3uB1N1AzKisy/JtvkoPONSeUQ5GbkO3kq",
    "birthday": "1997-04-04T21:00:00.000Z",
    "phoneNumber": "050-5555555",
    "address": "Petah Tikva",
    "type": "player",
    "supervisedCourt": [],
    "rank": 1
}, {
    "_id": "63c6f3563dbfc677bcb2e873",
    "name": "Yovel Gavrieli",
    "email": "yovel@gmail.com",
    "password": "$2b$08$nzvBnzgBn9XahirG1eJZNubsZlPvwKoEJETmLZAPo6T9cC4Lp7mte",
    "birthday": "1997-04-04T21:00:00.000Z",
    "phoneNumber": "050-5555555",
    "address": "Ramat Gan",
    "type": "player",
    "supervisedCourt": [],
    "rank": 1
}]
export default users;
