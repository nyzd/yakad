export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "space" | "center" | "end";
    blur?: boolean;
    fullWidth?: boolean;
    children?: React.ReactNode;
}
