import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import * as React from "react";
import * as ReactDom from "react-dom";
import { AsyncDropdown, IAsyncDropdownProps } from "./components/AsyncDropdown";
import { IPropertyPaneAsyncDropdownInternalProps, IPropertyPaneAsyncDropdownProps } from "./models";

export class PropertyPaneAsyncDropdown implements IPropertyPaneField<IPropertyPaneAsyncDropdownProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneAsyncDropdownInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneAsyncDropdownProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onLoad: properties.onLoad,
            onPropertyChange: properties.onPropertyChange,
            selectedKey: properties.selectedKey,
            disabled: properties.disabled,
            required: properties.required,
            tooltip: properties.tooltip,
            placeholder: properties.placeholder,
            description: properties.description,
            onRender: this.onRender
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onRender = (elem: HTMLElement) => {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IAsyncDropdownProps> = React.createElement(AsyncDropdown, {
            label: this.properties.label,
            onLoad: this.properties.onLoad,
            onChange: this.onChange,
            selectedKey: this.properties.selectedKey,
            disabled: this.properties.disabled,
            stateKey: new Date().toString(),
            required: this.properties.required,
            tooltip: this.properties.tooltip,
            placeholder: this.properties.placeholder,
            description: this.properties.description
        });

        ReactDom.render(element, elem);
    };

    private onChange = (option: IDropdownOption) => {
        this.properties.onPropertyChange(this.targetProperty, option.key);
    };
}
