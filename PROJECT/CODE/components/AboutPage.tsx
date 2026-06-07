// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import FooterMenu from "./FooterMenu.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

// -- FUNCTIONS

export default function AboutPage(
    {
        data
    }
    )
{
    let { languageCode, aboutPage } = data;

    return (
        <>
            <HeaderMenu data={ data } />
            <div className="about-page">
                <section className="about-page-hero">
                    <div className="about-page-hero-container">
                        <h1 className="about-page-hero-title">
                            { getLocalizedText( aboutPage.title ) }
                        </h1>
                        <p className="about-page-hero-subtitle">
                            { getLocalizedText( aboutPage.text ) }
                        </p>
                    </div>
                </section>

                <section className="about-page-content">
                    <div className="about-page-content-container">
                        <div className="about-page-story">
                            <h2 className="about-page-story-title">
                                { getLocalizedText( aboutPage.storyTitle ) }
                            </h2>
                            <p className="about-page-story-text">
                                { getLocalizedText( aboutPage.storyText1 ) }
                            </p>
                            <p className="about-page-story-text">
                                { getLocalizedText( aboutPage.storyText2 ) }
                            </p>
                        </div>

                        <div className="about-page-values">
                            <h2 className="about-page-values-title">
                                { getLocalizedText( aboutPage.valuesTitle ) }
                            </h2>
                            <div className="about-page-values-grid">
                                <div className="about-page-value">
                                    <h3 className="about-page-value-title">
                                        { getLocalizedText( aboutPage.value1Title ) }
                                    </h3>
                                    <p className="about-page-value-description">
                                        { getLocalizedText( aboutPage.value1Description ) }
                                    </p>
                                </div>
                                <div className="about-page-value">
                                    <h3 className="about-page-value-title">
                                        { getLocalizedText( aboutPage.value2Title ) }
                                    </h3>
                                    <p className="about-page-value-description">
                                        { getLocalizedText( aboutPage.value2Description ) }
                                    </p>
                                </div>
                                <div className="about-page-value">
                                    <h3 className="about-page-value-title">
                                        { getLocalizedText( aboutPage.value3Title ) }
                                    </h3>
                                    <p className="about-page-value-description">
                                        { getLocalizedText( aboutPage.value3Description ) }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterMenu data={ data } />
        </>
        );
}
