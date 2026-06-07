// -- IMPORTS

import { getApplicationData, getFooterMenuData, getHeaderMenuData, setRequestLanguageCode } from "../application.ts";
import ProductsPage from "../components/ProductsPage.tsx";
import { define } from "../utils.ts";

// -- FUNCTIONS

export default define.page(
    function Products(
        ctx
        )
    {
        let applicationData = getApplicationData();
        let languageCode = setRequestLanguageCode( ctx );

    return (
        <ProductsPage
            data={
                {
                    languageCode,
                    productsPage: applicationData.productsPage,
                    genderBySlugMap: applicationData.genderBySlugMap,
                    categoryBySlugMap: applicationData.categoryBySlugMap,
                    brandBySlugMap: applicationData.brandBySlugMap,
                    sizeBySlugMap: applicationData.sizeBySlugMap,
                    productArray: applicationData.productArray,
                    ...getHeaderMenuData( applicationData, ctx ),
                    ...getFooterMenuData( applicationData )
                }
                }
        />
        );
    }
    );
