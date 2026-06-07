// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../application.ts";
import ContactPage from "../components/ContactPage.tsx";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function Contact(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx );

    return (
        <ContactPage
            data={
                {
                    languageCode,
                    contactPage: applicationData.contactPage,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
