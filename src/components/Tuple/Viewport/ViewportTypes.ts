// TODO: Each component should have its own types file.
// Can also have a types file at root, but that is currently getting too bloated;

import { ID, DirectionT, ViewT } from "../../../types";

// Actions

export enum ViewActionKind {
    ADD_TAB = "ADD_TAB",
    REMOVE_TAB = "REMOVE_TAB",
    REPLACE_WITH_VIEW = "REPLACE_WITH_VIEW",
    ADD_VIEW = "ADD_VIEW",
    REMOVE_VIEW = "REMOVE_VIEW",
    CHANGE_ACTIVE_VIEW = "CHANGE_ACTIVE_VIEW",
}


export enum SideT {
    HEAD = "head",
    TAIL = "tail",
}


export interface AddTabPayloadT { pid: ID, index: number };
export interface AddTabActionT { type: ViewActionKind.ADD_TAB, payload: AddTabPayloadT };

export interface RemoveTabPayloadT { index: number };
export interface RemoveTabActionT { type: ViewActionKind.REMOVE_TAB, payload: RemoveTabPayloadT };

export type ReplaceWithViewPayloadT = ViewT;
export interface ReplaceWithViewT { type: ViewActionKind.REPALCE_WITH_VIEW, payload: ReplaceWithViewPayloadT };

// TODO : Do I need this?
export interface AddViewPayloadT { pid: ID, side: SideT, direction: DirectionT };
export interface AddViewActionT { type: ViewActionKind.ADD_VIEW, payload: AddViewPayloadT };

// TODO : Do I need this?
export interface RemoveViewPayloadT { side: SideT };
export interface RemoveViewActionT { type: ViewActionKind.REMOVE_VIEW, payload: RemoveViewPayloadT };

export interface ChangeActiveViewPayloadT { pid: ID };
export interface ChangeActiveViewActionT { type: ViewActionKind.CHANGE_ACTIVE_VIEW, payload: ChangeActiveViewPayloadT };


export type ViewportActionT = AddTabActionT
                            | RemoveTabActionT
                            | AddViewActionT
                            | ReplaceWithViewT
                            | RemoveViewActionT
                            | ChangeActiveViewActionT;
