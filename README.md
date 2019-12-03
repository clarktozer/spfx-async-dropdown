## spfx-async-dropdown

<img alt="GitHub Actions status" src="https://github.com/clarktozer/spfx-async-dropdown/workflows/Build/badge.svg">

Asynchronous dropdown component for the SPFx property pane

## Installation

```bash
npm install spfx-async-dropdown
```

## Examples

```bash
new PropertyPaneAsyncDropdown("list", {
    label: "List",
    onLoad: async () => {
        const lists = await sp.site.rootWeb.lists.select("Id", "Title").get();
        return lists.map(list => {
            return {
                key: list.Id,
                text: list.Title
            }
        })
    },
    onPropertyChange: (property: string, newValue: any) => {
        this.onPropertyPaneFieldChanged(property, this.properties.list, newValue);
    },
    selectedKey: this.properties.list,
    required: true,
    tooltip: {
        content: "Testing Tooltip",
        iconName: "List"
    }
})
```

## Props

| Prop                              |                   Type                    |
| :-------------------------------- | :---------------------------------------: |
| label<br/>_(required)_            |                  string                   |
| onLoad<br/>_(required)_           |     () => Promise<IDropdownOption[]>      |
| onPropertyChange<br/>_(required)_ | (property: string, newValue: any) => void |
| selectedKey<br/>_(required)_      |             string or number              |
| disabled                          |                  boolean                  |
| required                          |                  boolean                  |
| tooltip                           |                 IToolTip                  |
| placeholder                       |                  boolean                  |
