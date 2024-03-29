import { DirectionT } from "../../SplitPane/SplitPaneTypes";
import { ID } from "../TupleTypes";


//----------------------------------------------------------------------------------------------------------------------
// Data Types
//----------------------------------------------------------------------------------------------------------------------
export interface ViewT {
    pageIds: ID[],
    activePageId: ID
}

export interface SplitViewT {
    head: ViewT | SplitViewT,
    tail: ViewT | SplitViewT | null,
    direction: DirectionT,
}

export type ViewportT = SplitViewT | ViewT;

export const isViewT = (v: any) => (v as ViewT).pageIds !== undefined;
export const isSplitViewT = (v: any) => (v as SplitViewT).head !== undefined;

export interface PortT {
    parentId: ID | null,  // null if root
    isSplitView: boolean,
    pageIds: ID[] | null,
    activePageId: ID | null,
    direction: DirectionT | null,
    headId: ID | null,
    tailId: ID | null,
    isHead: boolean | null,  // null if root
};

// One element of type ID, which is root - used to identify root id
export type PortsT = { [key: ID]: PortT };

export interface ViewportStateT {
    root: ID,
    ports: PortsT,
    skipTabRemoval: boolean,  // Not graceful, but necessart because dataTransfer object not available onDragEnd
};

export interface IdPortPairT {
    id: ID,
    port: PortT,
};
