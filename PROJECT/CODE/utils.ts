// -- IMPORTS

import { createDefine } from "fresh";

// -- TYPES

export type State = Record<string, never>;

// -- VARIABLES

export const define = createDefine<State>();
