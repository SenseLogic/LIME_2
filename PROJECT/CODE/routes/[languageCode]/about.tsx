// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../../application.ts";
import AboutPage from "../../components/AboutPage.tsx";
import { define } from "../../utils.ts";

// -- FUNCTIONS

export default define.page(
    function About(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx, ctx.params.languageCode );

    return (
        <AboutPage
            data={
                {
                    languageCode,
                    aboutPage: applicationData.aboutPage,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
