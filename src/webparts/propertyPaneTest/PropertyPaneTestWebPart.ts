import { Version } from "@microsoft/sp-core-library";
import { get, isEmpty, update } from "@microsoft/sp-lodash-subset";
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import * as React from "react";
import * as ReactDom from "react-dom";
import { PropertyPaneAsyncDropdown } from "../../controls/PropertyPaneAsyncDropdown";
import PropertyPaneTest from "./components/PropertyPaneTest";

export interface IPropertyPaneTestWebPartProps {
    list1: string;
    list2: string;
    list3: string;
    list4: string;
}

export default class PropertyPaneTestWebPart extends BaseClientSideWebPart<IPropertyPaneTestWebPartProps> {
    private listPicker: PropertyPaneAsyncDropdown;

    public render(): void {
        const element: React.ReactElement<IPropertyPaneTestWebPartProps> = React.createElement(PropertyPaneTest, this.properties);

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }

    public onCustomPropertyChange = (property: string, newValue: any) => {
        const oldValue = get(this.properties, property);
        update(this.properties, property, () => newValue);
        this.onPropertyPaneFieldChanged(property, oldValue, newValue);
        if (property === "list1") {
            this.resetListTitlePropertyPane();
        }
        this.render();
    };

    private resetListTitlePropertyPane = () => {
        this.properties.list2 = null;
        update(this.properties, "list2", () => this.properties.list2);
        this.listPicker.properties.selectedKey = "";
        this.listPicker.properties.disabled = isEmpty(this.properties.list1);
        this.listPicker.render();
    };

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        const disabled = isEmpty(this.properties.list1);

        this.listPicker = new PropertyPaneAsyncDropdown("list2", {
            label: "List 2",
            onLoad: () =>
                Promise.resolve<IDropdownOption[]>([
                    {
                        key: "Test1",
                        text: "Test1"
                    },
                    {
                        key: "Test2",
                        text: "Test2"
                    },
                    {
                        key: "Test3",
                        text: "Test3"
                    }
                ]),
            onPropertyChange: this.onCustomPropertyChange,
            selectedKey: this.properties.list2,
            required: true,
            disabled,
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
        });

        return {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                new PropertyPaneAsyncDropdown("list1", {
                                    label: "List 1",
                                    onLoad: () => {
                                        return new Promise(resolve => {
                                            setTimeout(() => {
                                                resolve([
                                                    {
                                                        key: "",
                                                        text: "Select an item"
                                                    },
                                                    {
                                                        key: "Test1",
                                                        text: "Test1"
                                                    },
                                                    {
                                                        key: "Test2",
                                                        text: "Test2"
                                                    },
                                                    {
                                                        key: "Test3",
                                                        text: "Test3"
                                                    }
                                                ]);
                                            }, 1000);
                                        });
                                    },
                                    onPropertyChange: this.onCustomPropertyChange,
                                    selectedKey: this.properties.list1 || "",
                                    required: true,
                                    tooltip: {
                                        content: "Testing Tooltip"
                                    }
                                }),
                                this.listPicker,
                                new PropertyPaneAsyncDropdown("list3", {
                                    label: "List 3",
                                    onLoad: () =>
                                        Promise.resolve<IDropdownOption[]>([
                                            {
                                                key: "Test1",
                                                text: "Test1"
                                            },
                                            {
                                                key: "Test2",
                                                text: "Test2"
                                            },
                                            {
                                                key: "Test3",
                                                text: "Test3"
                                            }
                                        ]),
                                    onPropertyChange: this.onCustomPropertyChange,
                                    selectedKey: this.properties.list3,
                                    tooltip: {
                                        content: "Testing Tooltip",
                                        iconName: "List"
                                    },
                                    placeholder: "Select an option..."
                                }),
                                new PropertyPaneAsyncDropdown("list4", {
                                    label: "List 4",
                                    onLoad: () =>
                                        new Promise((resolve, reject) => {
                                            reject("Something wrong happened!");
                                        }),
                                    onPropertyChange: this.onCustomPropertyChange,
                                    selectedKey: this.properties.list4,
                                    placeholder: "Select an option..."
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
