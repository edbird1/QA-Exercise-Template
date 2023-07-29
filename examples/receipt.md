
# Receipt

Template:
```json
{
  "name": "Receipt",
  "description": "A receipt for a purchase.",
  "template": "<ul>{{#each items}}<li>{{name}}: {{price}}</li>{{/each}}</ul><p>Total: {{total}}</p>",
  "headers": [
    {
      "name": "Content-Type",
      "value": "text/html"
    }
  ],
  "dataSchema": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "name",
            "price"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "logic": {
    "total": {
      "reduce": [
        {
          "var": "items"
        },
        {
          "+": [
            {
              "var": "accumulator"
            },
            {
              "var": "current.price"
            }
          ]
        },
        0
      ]
    }
  }
}
```

Data:
```json
{
  "items": [
    {
      "name": "Burger",
      "price": 5.99
    },
    {
      "name": "Fries",
      "price": 2.99
    },
    {
      "name": "Drink",
      "price": 1.99
    }
  ]
}
```