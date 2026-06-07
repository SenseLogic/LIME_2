// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../../application.ts";
import TestimonialsPage from "../../components/TestimonialsPage.tsx";
import { define } from "../../utils.ts";

// -- FUNCTIONS

export default define.page(
    function Testimonials(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx, ctx.params.languageCode );

    return (
        <TestimonialsPage
            data={
                {
                    languageCode,
                    testimonialsPage: applicationData.testimonialsPage,
                    testimonialArray: applicationData.testimonialArray,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
