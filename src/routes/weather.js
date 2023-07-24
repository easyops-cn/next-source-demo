export default {
  path: "${APP.homepage}/weather",
  context: [
    {
      name: "city",
      value: "Guangzhou",
    },
    {
      name: "weather",
      resolve: {
        useProvider: "basic.http-request",
        args: [
          "<% `//api.weatherapi.com/v1/forecast.json?q=${CTX.city}&key=9e08e5e99e0c4b4c89023605231804&days=2` %>",
        ],
      },
      track: true,
    },
  ],
  bricks: [
    {
      brick: "sl-card",
      children: [
        {
          brick: "tpl-select-city",
          slot: "header",
          properties: {
            defaultCity: "<% CTX.city %>",
          },
          events: {
            "city-change": {
              action: "context.replace",
              args: ["city", "<% EVENT.detail %>"],
            },
          },
        },
        {
          brick: ":if",
          dataSource: "<%= !!CTX.weather %>",
          children: [
            {
              brick: "div",
              properties: {
                className: "grid-layout",
              },
              children: [
                {
                  brick: "img",
                  properties: {
                    src: "<% CTX.weather.current.condition.icon %>",
                  },
                },
                {
                  brick: "span",
                  properties: {
                    textContent: "<% CTX.weather.current.condition.text %>",
                  },
                },
                {
                  brick: "img",
                  properties: {
                    src: "https://brick-next.js.org/img/thermometer-half.svg",
                  },
                },
                {
                  brick: "span",
                  properties: {
                    textContent:
                      "<% `${Math.round(CTX.weather.current.temp_c)}°C` %>",
                  },
                },
              ],
            },
            {
              brick: "tpl-hourly-forecast",
              properties: {
                weather: "<% CTX.weather %>",
              },
            },
          ],
        },
      ],
    },
    {
      brick: "style",
      properties: {
        textContent: `sl-card {
            display: block;
            max-width: 300px;
            margin: 2em auto;
          }

          sl-card::part(body) {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .grid-layout {
            display: grid;
            grid-template-columns: 50px 1fr;
            align-items: center;
            gap: 10px;
          }

          .column-grid {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: repeat(4, auto);
            column-gap: 10px;
            overflow-x: auto;
            justify-items: center;
            align-items: center;
          }

          .flex-layout {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          sl-select {
            width: 160px;
          }

          sl-card img {
            width: 24px;
            height: 24px;
            justify-self: center;
          }

          small {
            color: gray;
          }
          `,
      },
    },
  ],
};
