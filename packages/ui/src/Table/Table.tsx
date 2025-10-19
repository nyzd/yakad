import classNames from "classnames";
import boxingStyles from "../boxing.module.css";
import styles from "./Table.module.css";

export interface TableProps
    extends React.TableHTMLAttributes<HTMLTableElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableElement>;
}
export function Table({ className, children, ...restProps }: TableProps) {
    const joinedClassNames = classNames(
        { [boxingStyles.fullWidthOnParentDemand]: true },
        styles.table,
        className
    );

    return (
        <table {...restProps} className={joinedClassNames}>
            {children}
        </table>
    );
}

export interface TheadProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableSectionElement>;
}
export function Thead({ className, children, ...restProps }: TheadProps) {
    const joinedClassNames = classNames(styles.thead, className);

    return (
        <thead {...restProps} className={joinedClassNames}>
            {children}
        </thead>
    );
}

export interface TbodyProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableSectionElement>;
}
export function Tbody({ className, children, ...restProps }: TbodyProps) {
    const joinedClassNames = classNames(styles.tbody, className);

    return (
        <tbody {...restProps} className={joinedClassNames}>
            {children}
        </tbody>
    );
}

export interface TfootProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableSectionElement>;
}
export function Tfoot({ className, children, ...restProps }: TfootProps) {
    const joinedClassNames = classNames(styles.tfoot, className);

    return (
        <tfoot {...restProps} className={joinedClassNames}>
            {children}
        </tfoot>
    );
}

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableRowElement>;
}
export function Tr({ className, children, ...restProps }: TrProps) {
    const joinedClassNames = classNames(styles.tr, className);

    return (
        <tr {...restProps} className={joinedClassNames}>
            {children}
        </tr>
    );
}

export interface ThProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableCellElement>;
}
export function Th({ className, children, ...restProps }: ThProps) {
    const joinedClassNames = classNames(styles.th, className);

    return (
        <th {...restProps} className={joinedClassNames}>
            {children}
        </th>
    );
}

export interface TdProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    ref?: React.Ref<HTMLTableCellElement>;
}
export function Td({ className, children, ...restProps }: TdProps) {
    const joinedClassNames = classNames(styles.td, className);

    return (
        <td {...restProps} className={joinedClassNames}>
            {children}
        </td>
    );
}
