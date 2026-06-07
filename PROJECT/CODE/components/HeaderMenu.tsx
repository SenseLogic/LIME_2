// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";
import LanguageMenu from "../islands/LanguageMenu.tsx";

// -- FUNCTIONS

export default function HeaderMenu(
    {
        data
    }
    )
{
    let { languageCode, homePage, headerMenu, languageByCodeMap, pageUrlByLanguageCodeMap } = data;
    let languageMenuData = { languageCode, languageByCodeMap, pageUrlByLanguageCodeMap };

    return (
        <header className="header-menu">
            <div className="header-menu-container">
                <div className="header-menu-logo">
                    <h1 className="header-menu-logo-text">
                        { getLocalizedText( homePage.title ) }
                    </h1>
                </div>
                <nav className="header-menu-nav">
                    <ul className="header-menu-list">
                        { headerMenu.menuButtonArray.map(
                            ( menuButtonItem, buttonIndex ) =>
                            (
                                <li key={ buttonIndex } className="header-menu-item">
                                    <a
                                        href={
                                            menuButtonItem.route === ""
                                                ? `/${ languageCode }`
                                                : `/${ languageCode }/${ menuButtonItem.route }`
                                            }
                                        className="header-menu-button"
                                    >
                                        <span className="header-menu-button-text">
                                            { getLocalizedText( menuButtonItem.text ) }
                                        </span>
                                    </a>
                                </li>
                            )
                            )}
                    </ul>
                </nav>
                <div className="header-menu-language">
                    <LanguageMenu data={ languageMenuData } />
                </div>
            </div>
        </header>
        );
}
