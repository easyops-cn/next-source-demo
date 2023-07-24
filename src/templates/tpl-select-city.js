export default {
  name: "tpl-select-city",
  state: [
    {
      name: "cities",
      value: [
        "Shenzhen",
        "Guangzhou",
        "Tokyo",
        "Los Angeles",
        "New York",
        "London",
      ],
    },
    {
      name: "defaultCity",
      expose: true,
    },
  ],
  bricks: [
    {
      brick: "div",
      properties: {
        className: "flex-layout",
      },
      children: [
        {
          brick: "strong",
          properties: {
            textContent: "Weather",
          },
        },
        {
          brick: "sl-select",
          properties: {
            placeholder: "Select a city",
            value: "<% STATE.defaultCity %>",
            size: "small",
          },
          events: {
            "sl-change": {
              action: "tpl.dispatchEvent",
              args: [
                "city-change",
                {
                  detail: "<% EVENT.target.value %>",
                },
              ],
            },
          },
          children: [
            {
              brick: ":forEach",
              dataSource: "<% STATE.cities %>",
              children: [
                {
                  brick: "sl-option",
                  properties: {
                    value: '<% ITEM.replace(/ /g, "_") %>',
                    textContent: "<% ITEM %>",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
