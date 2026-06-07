// -- IMPORTS

import { getLocalizedText } from "senselogic-lingo";

// -- FUNCTIONS

export default function LanguageMenu(
    {
        data
    }
    )
{
    let { languageCode, languageByCodeMap, pageUrlByLanguageCodeMap } = data;

    return (
        <select
            className="header-menu-language-select"
            value={ languageCode }
            onChange={
                ( event ) =>
                    window.location.href
                        = pageUrlByLanguageCodeMap[
                            event.currentTarget.value
                            ]
                }
        >
            { Object.entries( languageByCodeMap ).map(
                ( [ optionLanguageCode, languageItem ] ) =>
                (
                    <option key={ optionLanguageCode } value={ optionLanguageCode }>
                        { getLocalizedText( ( languageItem as any ).name ) }
                    </option>
                )
                )}
        </select>
        );
}
