import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IToolTip {
    content: string;
    iconName?: string;
}

export interface IPropertyPaneAsyncDropdownProps {
    label: string;
    onLoad: () => Promise<IDropdownOption[]>;
    onPropertyChange: (propertyPath: string, newValue: React.ReactText) => void;
    selectedKey: React.ReactText;
    disabled?: boolean;
    required?: boolean;
    tooltip?: IToolTip;
    placeholder?: string;
    description?: string;
}

export interface IPropertyPaneAsyncDropdownInternalProps extends IPropertyPaneAsyncDropdownProps, IPropertyPaneCustomFieldProps {}
