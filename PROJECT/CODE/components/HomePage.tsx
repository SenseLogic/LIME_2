// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import FooterMenu from "./FooterMenu.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

// -- FUNCTIONS

export default function HomePage(
    {
        data
    }
    )
{
    let { languageCode, homePage } = data;

    return (
        <>
            <HeaderMenu data={ data } />
            <div className="home-page">
                <section className="home-page-hero">
                    <div className="home-page-hero-container">
                        <div className="home-page-hero-content">
                            <h1 className="home-page-hero-title">
                                { getLocalizedText( homePage.title ) }
                            </h1>
                            <p className="home-page-hero-subtitle">
                                { getLocalizedText( homePage.heroSubtitle ) }
                            </p>
                            <div className="home-page-hero-actions">
                                <a
                                    href={ `/${ languageCode }/products` }
                                    className="home-page-hero-button home-page-hero-button-primary"
                                >
                                    { getLocalizedText( homePage.shopNowButton ) }
                                </a>
                                <a
                                    href={ `/${ languageCode }/about` }
                                    className="home-page-hero-button home-page-hero-button-secondary"
                                >
                                    { getLocalizedText( homePage.learnMoreButton ) }
                                </a>
                            </div>
                        </div>
                        <div className="home-page-hero-image">
                            <img
                                src="/logo.svg"
                                alt="Lime Project Logo"
                                className="home-page-hero-logo"
                            />
                        </div>
                    </div>
                </section>

                <section className="home-page-features">
                    <div className="home-page-features-container">
                        <h2 className="home-page-features-title">
                            { getLocalizedText( homePage.featuresTitle ) }
                        </h2>
                        <div className="home-page-features-grid">
                            <div className="home-page-feature">
                                <div className="home-page-feature-icon">
                                    { homePage.feature1Icon }
                                </div>
                                <h3 className="home-page-feature-title">
                                    { getLocalizedText( homePage.feature1Title ) }
                                </h3>
                                <p className="home-page-feature-description">
                                    { getLocalizedText( homePage.feature1Description ) }
                                </p>
                            </div>
                            <div className="home-page-feature">
                                <div className="home-page-feature-icon">
                                    { homePage.feature2Icon }
                                </div>
                                <h3 className="home-page-feature-title">
                                    { getLocalizedText( homePage.feature2Title ) }
                                </h3>
                                <p className="home-page-feature-description">
                                    { getLocalizedText( homePage.feature2Description ) }
                                </p>
                            </div>
                            <div className="home-page-feature">
                                <div className="home-page-feature-icon">
                                    { homePage.feature3Icon }
                                </div>
                                <h3 className="home-page-feature-title">
                                    { getLocalizedText( homePage.feature3Title ) }
                                </h3>
                                <p className="home-page-feature-description">
                                    { getLocalizedText( homePage.feature3Description ) }
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterMenu data={ data } />
        </>
        );
}
