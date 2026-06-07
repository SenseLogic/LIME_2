// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";

// -- FUNCTIONS

export default function FooterMenu(
    {
        data
    }
    )
{
    let { languageCode, homePage, footerMenu } = data;

    return (
        <footer className="footer-menu">
            <div className="footer-menu-container">
                <div className="footer-menu-brand">
                    <p className="footer-menu-brand-title">
                        { getLocalizedText( homePage.title ) }
                    </p>
                    <p className="footer-menu-brand-tagline">
                        { getLocalizedText( footerMenu.tagline ) }
                    </p>
                </div>
                <nav className="footer-menu-nav">
                    <ul className="footer-menu-list">
                        { footerMenu.menuButtonArray.map(
                            ( menuButtonItem, buttonIndex ) =>
                            (
                                <li key={ buttonIndex } className="footer-menu-item">
                                    <a
                                        href={
                                            menuButtonItem.route === ""
                                                ? `/${ languageCode }`
                                                : `/${ languageCode }/${ menuButtonItem.route }`
                                            }
                                        className="footer-menu-button"
                                    >
                                        <span className="footer-menu-button-text">
                                            { getLocalizedText( menuButtonItem.text ) }
                                        </span>
                                    </a>
                                </li>
                            )
                            )}
                    </ul>
                </nav>
                <p className="footer-menu-copyright">
                    { getLocalizedText( footerMenu.copyrightText ) }
                </p>
            </div>
        </footer>
        );
}
