// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../application.ts";
import HomePage from "../components/HomePage.tsx";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function Home(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx );

    return (
        <HomePage
            data={
                {
                    languageCode,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
