export const GroupHistoryObj = JSON.parse(JSON.stringify({
    "expenses": [
        {
            "id": 1,
            "time": "2023-04-10T13:26:56",
            "description": "Groceries",
            "amount": 5210.0,
            "category_group": {
                "category": {
                    "id": 1,
                    "title": "Food",
                    "groups": {
                        "color_code": "#0f4f5f",
                        "icon_url": "link.com"
                    }
                }
            },
            "user": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "John",
                "last_name": "Doe",
                "picture": "ref.com"
            }
        },
        {
            "id": 2,
            "time": "2023-01-10T13:22:56",
            "description": "Buy some stuff",
            "amount": 640.0,
            "category_group": {
                "category": {
                    "id": 2,
                    "title": "Entertainment",
                    "groups": {
                        "color_code": "#0f4f5f",
                        "icon_url": "link.com"
                    }
                }
            },
            "user": {
                "id": 2,
                "login": "joqehndoetw@gmail.com",
                "first_name": "Johnson",
                "last_name": "Dobriy",
                "picture": "ref.com"
            }
        },
        {
            "id": 3,
            "time": "2021-05-10T13:26:56",
            "description": "Watch this",
            "amount": 640.0,
            "category_group": {
                "category": {
                    "id": 3,
                    "title": "Cinema",
                    "groups": {
                        "color_code": "#0f4f5f",
                        "icon_url": "link.com"
                    }
                }
            },
            "user": {
                "id": 3,
                "login": "noemail@gmail.com",
                "first_name": "Dmitriy",
                "last_name": "Mediano",
                "picture": "ref.com"
            }
        }
    ],
    "replenishments": [
        {
            "id": 1,
            "amount": 11200,
            "time": "2023-07-11T11:26:56",
            "description": "Salary from job",
            "user": {
                "id": 2,
                "login": "joqehndoetw@gmail.com",
                "first_name": "Johnson",
                "last_name": "Dobriy",
                "picture": "ref.com"
            }
        },
        {
            "id": 2,
            "amount": 1200,
            "time": "2022-10-01T11:26:56",
            "description": "scholarship",
            "user": {
                "id": 2,
                "login": "joqehndoetw@gmail.com",
                "first_name": "Johnson",
                "last_name": "Dobriy",
                "picture": "ref.com"
            }
        },
    ]
}))