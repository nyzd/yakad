import { Children, ReactElement, forwardRef } from "react";
import { Tbody, TbodyProps, Td, Tr } from "@yakad/ui";
import { XTrProps, XTdProps } from "./Xtrhdf";

export interface XTbodyProps extends TbodyProps {
    children: ReactElement<XTrProps> | ReactElement<XTrProps>[];
}

export const XTbody = forwardRef<HTMLTableSectionElement, XTbodyProps>(
    ({ children, ...restProps }, ref) => {
        const arrayChildren = Children.toArray(children);

        return (
            <Tbody ref={ref} {...restProps}>
                {(arrayChildren as ReactElement<XTrProps>[]).map(
                    (ChildXTr, index) => (
                        <Tr key={`tr-${index}`} {...ChildXTr.props}>
                            {(
                                Children.toArray(
                                    ChildXTr.props.children
                                ) as Array<ReactElement<XTdProps>>
                            ).map((ChildXTd, cellIndex) => (
                                <Td
                                    key={`td-${index}-${cellIndex}`}
                                    {...ChildXTd.props}
                                >
                                    {ChildXTd.props.children}
                                </Td>
                            ))}
                        </Tr>
                    )
                )}
            </Tbody>
        );
    }
);
XTbody.displayName = "XTbody";
