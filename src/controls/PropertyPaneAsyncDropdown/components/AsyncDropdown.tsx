import { getId } from "@uifabric/utilities/lib/object";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import React, { useEffect, useRef, useState } from "react";
import { IToolTip } from "../models";
import styles from "./AsyncDropdown.module.scss";

export interface IAsyncDropdownProps {
    label: string;
    onLoad: () => Promise<IDropdownOption[]>;
    onChange: (option: IDropdownOption, index?: number) => void;
    selectedKey: React.ReactText;
    disabled: boolean;
    stateKey: string;
    required?: boolean;
    tooltip?: IToolTip;
    placeholder?: string;
    description?: string;
}

export const AsyncDropdown: React.FC<IAsyncDropdownProps> = ({
    label,
    onLoad,
    onChange,
    required,
    tooltip,
    selectedKey,
    disabled,
    stateKey,
    placeholder,
    description
}) => {
    const id = useRef(getId("id"));
    const [isLoading, setLoading] = useState(false);
    const [options, setOptions] = useState<IDropdownOption[]>([]);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(selectedKey || "");

    const loadOptions = async () => {
        setLoading(true);
        setError(null);
        setOptions([]);

        try {
            const loadedOptions = await onLoad();

            setOptions(loadedOptions);
            setKey(selectedKey);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const onOptionChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const selectedOptions: IDropdownOption[] = options.map(o => {
            o.selected = o.key === option.key;
            return o;
        });

        setOptions(selectedOptions);
        setKey(option.key);

        if (onChange) {
            onChange(option, index);
        }
    };

    const onRenderLoader = () => (
        <div className={styles.flexCenter}>
            <Spinner />
        </div>
    );

    useEffect(() => {
        if (!disabled) {
            loadOptions();
        }
    }, [disabled, stateKey]);

    return (
        <div className={styles.asyncDropdown}>
            {tooltip && (
                <div className={styles.flexCenter}>
                    <Label required={required}>{label}</Label>
                    <div className={styles.tooltip}>
                        <TooltipHost
                            content={tooltip.content}
                            calloutProps={{
                                target: `#${id.current}`
                            }}
                        >
                            <Icon id={id.current} iconName={tooltip.iconName || "Info"} />
                        </TooltipHost>
                    </div>
                </div>
            )}
            <Dropdown
                className={tooltip && required ? styles.tooltipRequiredOverride : null}
                label={tooltip ? null : label}
                disabled={disabled || isLoading || error}
                onChange={onOptionChanged}
                selectedKey={key}
                options={options}
                required={required}
                placeHolder={placeholder}
                {...(isLoading ? { onRenderCaretDown: onRenderLoader } : {})}
            />
            {description && <Text variant="xSmall">{description}</Text>}
            {error && <Label>Error while loading items: {error}</Label>}
        </div>
    );
};
