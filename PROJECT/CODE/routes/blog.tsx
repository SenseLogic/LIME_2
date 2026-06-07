// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../application.ts";
import BlogPage from "../components/BlogPage.tsx";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function Blog(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx );

    return (
        <BlogPage
            data={
                {
                    languageCode,
                    blogPage: applicationData.blogPage,
                    blogPostArray: applicationData.blogPostArray,
                    blogCategoryArray: applicationData.blogCategoryArray,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
