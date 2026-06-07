// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import FooterMenu from "./FooterMenu.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

// -- FUNCTIONS

export default function ContactPage(
    {
        data
    }
    )
{
    let { languageCode, contactPage } = data;
    let handleSubmit = async ( formSubmitEvent ) =>
    {
        formSubmitEvent.preventDefault();

        let contactFormElement = formSubmitEvent.target;
        let contactFormData = new FormData( contactFormElement );

        let submitButtonElement = contactFormElement.querySelector(
            ".contact-page-form-button"
            );
        let originalButtonText = submitButtonElement.textContent;
        submitButtonElement.textContent = "Sending...";
        submitButtonElement.disabled = true;

        try
        {
            let responseData = await fetch(
                "/api/contact",
                {
                    method: "POST",
                    body: contactFormData
                }
                );

            let responseResult = await responseData.json();

            if ( responseResult.success )
            {
                let successMessageElement = document.createElement( "div" );
                successMessageElement.className = "contact-page-form-success";
                successMessageElement.textContent
                    = "Thank you! Your message has been sent successfully.";
                contactFormElement.appendChild( successMessageElement );

                contactFormElement.reset();

                setTimeout(
                    () =>
                    {
                        successMessageElement.remove();
                    },
                    5000
                    );
            }
            else
            {
                let errorMessageElement = document.createElement( "div" );
                errorMessageElement.className = "contact-page-form-error";
                errorMessageElement.textContent
                    = responseResult.error
                      || "An error occurred. Please try again.";
                contactFormElement.appendChild( errorMessageElement );

                setTimeout(
                    () =>
                    {
                        errorMessageElement.remove();
                    },
                    5000
                    );
            }
        }
        catch ( formError )
        {
            console.error( "Error submitting form:", formError );

            let errorMessageElement = document.createElement( "div" );
            errorMessageElement.className = "contact-page-form-error";
            errorMessageElement.textContent
                = "Network error. Please check your connection and try again.";
            contactFormElement.appendChild( errorMessageElement );

            setTimeout(
                () =>
                {
                    errorMessageElement.remove();
                },
                5000
                );
        }
        finally
        {
            submitButtonElement.textContent = originalButtonText;
            submitButtonElement.disabled = false;
        }
    };

    return (
        <>
            <HeaderMenu data={ data } />
            <div className="contact-page">
                <section className="contact-page-hero">
                    <div className="contact-page-hero-container">
                        <h1 className="contact-page-hero-title">
                            { getLocalizedText( contactPage.title ) }
                        </h1>
                        <p className="contact-page-hero-subtitle">
                            { getLocalizedText( contactPage.text ) }
                        </p>
                    </div>
                </section>

                <section className="contact-page-content">
                    <div className="contact-page-content-container">
                        <div className="contact-page-form-section">
                            <h2 className="contact-page-form-title">Send us a Message</h2>
                            <form className="contact-page-form" onSubmit={ handleSubmit }>
                                <div className="contact-page-form-group">
                                    <label htmlFor="name" className="contact-page-form-label">
                                        { getLocalizedText( contactPage.namePlaceholder ) }
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="contact-page-form-input"
                                        placeholder={ getLocalizedText( contactPage.namePlaceholder ) }
                                        required
                                    />
                                </div>

                                <div className="contact-page-form-group">
                                    <label htmlFor="email" className="contact-page-form-label">
                                        { getLocalizedText( contactPage.emailPlaceholder ) }
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="contact-page-form-input"
                                        placeholder={ getLocalizedText( contactPage.emailPlaceholder ) }
                                        required
                                    />
                                </div>

                                <div className="contact-page-form-group">
                                    <label htmlFor="message" className="contact-page-form-label">
                                        { getLocalizedText( contactPage.messagePlaceholder ) }
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={ 5 }
                                        className="contact-page-form-textarea"
                                        placeholder={ getLocalizedText( contactPage.messagePlaceholder ) }
                                        required
                                    >
                                    </textarea>
                                </div>

                                <button type="submit" className="contact-page-form-button">
                                    { getLocalizedText( contactPage.sendButton ) }
                                </button>
                            </form>
                        </div>

                        <div className="contact-page-info-section">
                            <h2 className="contact-page-info-title">Get in Touch</h2>
                            <div className="contact-page-info-item">
                                <h3 className="contact-page-info-item-title">Email</h3>
                                <p className="contact-page-info-item-text">
                                    { contactPage.email }
                                </p>
                            </div>
                            <div className="contact-page-info-item">
                                <h3 className="contact-page-info-item-title">Phone</h3>
                                <p className="contact-page-info-item-text">
                                    { contactPage.phone }
                                </p>
                            </div>
                            <div className="contact-page-info-item">
                                <h3 className="contact-page-info-item-title">Address</h3>
                                <p className="contact-page-info-item-text">
                                    { getLocalizedText( contactPage.address ) }
                                    <br />
                                    { getLocalizedText( contactPage.city ) }
                                    <br />
                                    { getLocalizedText( contactPage.state ) }
                                </p>
                            </div>
                            <div className="contact-page-info-item">
                                <h3 className="contact-page-info-item-title">Business Hours</h3>
                                <p className="contact-page-info-item-text">
                                    { getLocalizedText( contactPage.businessHours1 ) }
                                    <br />
                                    { getLocalizedText( contactPage.businessHours2 ) }
                                    <br />
                                    { getLocalizedText( contactPage.businessHours3 ) }
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
