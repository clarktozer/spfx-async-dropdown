import * as React from "react";
import { IPropertyPaneTestWebPartProps } from "../PropertyPaneTestWebPart";
import styles from "./PropertyPaneTest.module.scss";

export default class PropertyPaneTest extends React.Component<IPropertyPaneTestWebPartProps, {}> {
    public render(): React.ReactElement<IPropertyPaneTestWebPartProps> {
        return (
            <div className={styles.propertyPaneTest}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Selected Key: {this.props.list1}</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Selected Key: {this.props.list2}</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Selected Key: {this.props.list3}</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Selected Key: {this.props.list4}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
