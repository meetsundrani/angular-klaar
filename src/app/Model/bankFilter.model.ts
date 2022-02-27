export interface BankFilter {
bankname: string;
options:string[];
defaultValue:string;
}

export interface filterOption{
    bankname:string;
    value:string;
    isdefault:boolean;
}