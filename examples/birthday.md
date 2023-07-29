
# Birthday Card

Template:
```json
{
  "name": "Birthday Card",
  "description": "A card that says happy birthday.",
  "template": "<b>Hello {{name}}!</b><br/> Happy {{age}}th birthday!<br/> {{turning}} is coming up soon!",
  "headers": [
    {
      "name": "Content-Type",
      "value": "text/html"
    }
  ],
  "dataSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "number"
      }
    },
    "required": [
      "name",
      "age"
    ]
  },
  "logic": {
    "turning": {
      "+": [
        {
          "var": "age"
        },
        1
      ]
    }
  }
}
```

Data:
```json
{
  "name": "John",
  "age": 30
}
```