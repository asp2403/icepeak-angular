export interface BpmData{
    nextAction: string;
    prevAction: string;
}

export const ASSIGN = "ASSIGN";
export const COMPLETE_PROCESSING = "COMPLETE_PROCESSING";
export const COMPLETE_DELIVERY = "COMPLETE_DELIVERY";
export const RETURN_TO_PROCESSING = "RETURN_TO_PROCESSING";