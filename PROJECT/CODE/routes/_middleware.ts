// -- IMPORTS

import { getPathLanguageCode, getPathWithoutLanguage, setRequestLanguageCode } from "../application.ts";
import { define } from "../utils.ts";

// -- STATEMENTS

export default define.middleware(
    function (
        ctx
        )
    {
        let url = new URL( ctx.req.url );
        let pathname = url.pathname;

        let languageCode = setRequestLanguageCode( ctx );
        let pathLanguageCode = getPathLanguageCode( pathname );

        if ( pathLanguageCode )
        {
            return ctx.next();
        }
        else
        {
            let pathWithoutLanguage = getPathWithoutLanguage( pathname );
            let redirectUrl = `/${ languageCode }${
                pathWithoutLanguage === "/" ? "" : pathWithoutLanguage
                }`;

            return new Response(
                null,
                {
                    status: 302,
                    headers:
                    {
                        Location: redirectUrl
                    }
                }
                );
        }
    }
    );
