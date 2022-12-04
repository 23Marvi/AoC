export type ITYPE = "SUCCESS" | "ERROR" | "INFO" | "WARNING";

export interface IToastMessage {
    type: ITYPE;
    text: string;
    value?: string;
    value2?: string;
}
