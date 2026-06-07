// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import FooterMenu from "./FooterMenu.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

// -- FUNCTIONS

export default function TestimonialsPage(
    {
        data
    }
    )
{
    let { languageCode, testimonialsPage, testimonialArray } = data;

    return (
        <>
            <HeaderMenu data={ data } />
            <div className="testimonials-page">
                <section className="testimonials-page-hero">
                    <div className="testimonials-page-hero-container">
                        <h1 className="testimonials-page-hero-title">
                            { getLocalizedText( testimonialsPage.title ) }
                        </h1>
                        <p className="testimonials-page-hero-subtitle">
                            { getLocalizedText( testimonialsPage.text ) }
                        </p>
                    </div>
                </section>

                <section className="testimonials-page-grid">
                    <div className="testimonials-page-grid-container">
                        { testimonialArray.map(
                            ( testimonialItem, testimonialIndex ) =>
                            (
                                <div
                                    key={ testimonialIndex }
                                    className="testimonials-page-testimonial"
                                >
                                    <div className="testimonials-page-testimonial-header">
                                        <div className="testimonials-page-testimonial-image">
                                            <img
                                                src={ testimonialItem.imagePath || "/logo.svg" }
                                                alt={ testimonialItem.name }
                                                className="testimonials-page-testimonial-img"
                                            />
                                        </div>
                                        <div className="testimonials-page-testimonial-info">
                                            <h3 className="testimonials-page-testimonial-name">
                                                { testimonialItem.name }
                                            </h3>
                                            <p className="testimonials-page-testimonial-date">
                                                { testimonialItem.date }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="testimonials-page-testimonial-rating">
                                        { Array.from(
                                            { length: 5 },
                                            ( _, starIndex ) =>
                                            (
                                                <span
                                                    key={ starIndex }
                                                    className={ `testimonials-page-testimonial-star ${
                                                        starIndex < testimonialItem.rating
                                                            ? "testimonials-page-testimonial-star-filled"
                                                            : ""
                                                        }` }
                                                >
                                                    ⭐
                                                </span>
                                            )
                                            )}
                                    </div>

                                    <blockquote className="testimonials-page-testimonial-text">
                                        { getLocalizedText( testimonialItem.text ) }
                                    </blockquote>
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
