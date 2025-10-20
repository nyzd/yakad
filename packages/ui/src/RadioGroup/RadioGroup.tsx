"use client";

import { useState, Children } from "react";
import { RadioButton, RadioButtonProps } from "..";

type RadioButtonElement = React.ReactElement<RadioButtonProps>;
type ExcludedTypes = "defaultValue" | "children";
export interface RadioGroupProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, ExcludedTypes> {
    name: string;
    defaultValue?: string;
    children?: RadioButtonElement | RadioButtonElement[];
    ref?: React.Ref<HTMLDivElement>;
}

export function RadioGroup({
    name,
    defaultValue,
    className,
    children,
    ...restProps
}: RadioGroupProps) {
    const [selectedValue, setSelectedValue] = useState<string | number | null>(
        defaultValue || null
    );

    const arrayChildren = Children.toArray(children);

    const renderChildrens = () =>
        (arrayChildren as RadioButtonElement[]).map((child, index) => (
            <RadioButton
                key={index}
                {...child.props}
                dataFromRadioGroup={{
                    name: name,
                    onSelect: () => setSelectedValue(child.props.value),
                    checked: selectedValue === child.props.value,
                }}
            />
        ));

    return (
        <div {...restProps} className={className}>
            {renderChildrens()}
        </div>
    );
}
