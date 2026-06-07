// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import FooterMenu from "./FooterMenu.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

// -- FUNCTIONS

export default function ProductsPage(
    {
        data
    }
    )
{
    let {
        languageCode,
        productsPage,
        genderBySlugMap,
        categoryBySlugMap,
        brandBySlugMap,
        sizeBySlugMap,
        productArray
    } = data;

    return (
        <>
            <HeaderMenu data={ data } />
            <div className="products-page">
                <section className="products-page-hero">
                    <div className="products-page-hero-container">
                        <h1 className="products-page-hero-title">
                            { getLocalizedText( productsPage.title ) }
                        </h1>
                        <p className="products-page-hero-subtitle">
                            { getLocalizedText( productsPage.text ) }
                        </p>
                    </div>
                </section>

                <section className="products-page-filters">
                    <div className="products-page-filters-container">
                        <div className="products-page-filter">
                            <label className="products-page-filter-label">
                                { getLocalizedText( productsPage.genderButton ) }
                            </label>
                            <select className="products-page-filter-select">
                                <option value="">All Genders</option>
                                { Object.entries( genderBySlugMap ).map(
                                    ( [ genderSlug, genderName ] ) =>
                                    (
                                        <option key={ genderSlug } value={ genderSlug }>
                                            { getLocalizedText( genderName as any ) }
                                        </option>
                                    )
                                    )}
                            </select>
                        </div>

                        <div className="products-page-filter">
                            <label className="products-page-filter-label">
                                { getLocalizedText( productsPage.categoryButton ) }
                            </label>
                            <select className="products-page-filter-select">
                                <option value="">All Categories</option>
                                { Object.entries( categoryBySlugMap ).map(
                                    ( [ categorySlug, categoryName ] ) =>
                                    (
                                        <option key={ categorySlug } value={ categorySlug }>
                                            { getLocalizedText( categoryName as any ) }
                                        </option>
                                    )
                                    )}
                            </select>
                        </div>

                        <div className="products-page-filter">
                            <label className="products-page-filter-label">
                                { getLocalizedText( productsPage.brandButton ) }
                            </label>
                            <select className="products-page-filter-select">
                                <option value="">All Brands</option>
                                { Object.entries( brandBySlugMap ).map(
                                    ( [ brandSlug, brandName ] ) =>
                                    (
                                        <option key={ brandSlug } value={ brandSlug }>
                                            { getLocalizedText( brandName as any ) }
                                        </option>
                                    )
                                    )}
                            </select>
                        </div>
                    </div>
                </section>

                <section className="products-page-grid">
                    <div className="products-page-grid-container">
                        { productArray.map(
                            ( productItem, productIndex ) =>
                            (
                                <div key={ productIndex } className="products-page-product">
                                    <div className="products-page-product-image">
                                        <img
                                            src={ productItem.imagePath || "/logo.svg" }
                                            alt={ getLocalizedText( productItem.model ) }
                                            className="products-page-product-img"
                                        />
                                    </div>
                                    <div className="products-page-product-info">
                                        <h3 className="products-page-product-brand">
                                            { getLocalizedText(
                                                brandBySlugMap[ productItem.brandSlug ]
                                                ) }
                                        </h3>
                                        <h4 className="products-page-product-model">
                                            { getLocalizedText( productItem.model ) }
                                        </h4>
                                        <p className="products-page-product-category">
                                            { getLocalizedText(
                                                categoryBySlugMap[ productItem.categorySlug ]
                                                ) }
                                        </p>
                                        <p className="products-page-product-gender">
                                            { getLocalizedText(
                                                genderBySlugMap[ productItem.genderSlug ]
                                                ) }
                                        </p>
                                        <div className="products-page-product-sizes">
                                            <span className="products-page-product-sizes-label">
                                                Available Sizes:
                                            </span>
                                            <div className="products-page-product-sizes-list">
                                                { productItem.sizeSlugArray.map(
                                                    ( sizeSlugItem, sizeIndex ) =>
                                                    (
                                                        <span
                                                            key={ sizeIndex }
                                                            className="products-page-product-size"
                                                        >
                                                            { getLocalizedText(
                                                                sizeBySlugMap[ sizeSlugItem ]
                                                                ) }
                                                        </span>
                                                    )
                                                    )}
                                            </div>
                                        </div>
                                        <div className="products-page-product-price">
                                            ${ productItem.price }
                                        </div>
                                        <button
                                            type="button"
                                            className="products-page-product-button"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            )
                            )}
                    </div>
                </section>
            </div>
            <FooterMenu data={ data } />
        </>
        );
}
