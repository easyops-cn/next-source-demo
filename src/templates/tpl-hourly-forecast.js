export default {
  name: "tpl-hourly-forecast",
  state: [
    {
      name: "weather",
      expose: true,
    },
  ],
  bricks: [
    {
      brick: "small",
      properties: {
        textContent: "Hourly forecast",
      },
    },
    {
      brick: "div",
      properties: {
        className: "column-grid",
      },
      children: [
        {
          brick: "span",
          properties: {
            textContent: "Now",
          },
        },
        {
          brick: "img",
          properties: {
            src: "<% STATE.weather.current.condition.icon %>",
            style: {
              gridRow: "span 2",
            },
          },
        },
        {
          brick: "span",
          properties: {
            textContent:
              "<% `${Math.round(STATE.weather.current.temp_c)}°C` %>",
          },
        },
        {
          brick: ":forEach",
          dataSource: `<%
              STATE.weather.forecast.forecastday
                .flatMap(d => d.hour)
                  .filter(
                    h => h.time_epoch * 1e3 > +(new Date())
                  )
                  .slice(0, 12)
            %>`,
          children: [
            {
              brick: "span",
              properties: {
                textContent: `<%
                    new Date(ITEM.time_epoch * 1e3)
                    .toLocaleString(undefined, {
                      timeZone: STATE.weather.location.tz_id,
                      hour: 'numeric',
                      hour12: true,
                    })
                    .match(/\\d\\d?/)?.[0]
                  %>`,
              },
            },
            {
              brick: "img",
              properties: {
                src: "<% ITEM.condition.icon %>",
                style: {
                  gridRow: "<% `span ${ITEM.chance_of_rain > 0 ? 1 : 2}` %>",
                },
              },
            },
            {
              brick: "small",
              if: "<% ITEM.chance_of_rain > 0 %>",
              properties: {
                textContent: "<% `${Math.round(ITEM.chance_of_rain)}%` %>",
                style: {
                  color: "#2a87e5",
                },
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "<% `${Math.round(ITEM.temp_c)}°C` %>",
              },
            },
          ],
        },
      ],
    },
  ],
};
