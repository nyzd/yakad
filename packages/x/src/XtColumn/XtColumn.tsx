import { Card } from "@yakad/ui";

export interface XtColumnProps {
    dataKey: string;
    headTitle?: string;
    footTitle?: string;
    footFunc?: "sum" | "average";
    alignText?: "start" | "center" | "end";
    sortable?: boolean;
    searchable?: boolean;
    defaultHidden?: boolean;
}

export function XtColumn(props: XtColumnProps) {
    return <Card {...props}>Just use XtColumn inside Xtable!</Card>;
}
