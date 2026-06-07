// -- IMPORTS

import { getRequestLanguageCode } from "../application.ts";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function App(
        props
        )
    {
        let { Component } = props;
        let languageCode = getRequestLanguageCode( props );

    return (
        <html lang={ languageCode }>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Lime Project - Premium Footwear</title>
                <link rel="stylesheet" href="/styles/main.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
        );
    }
    );
