import type { Dispatch, SetStateAction } from "react";

export type CollectStatusType = Record<string, "known" | "repeat">;

export interface CollectStatusProps {
    collectStatus: CollectStatusType;
    setCollectStatus: Dispatch<SetStateAction<CollectStatusType>>;
}