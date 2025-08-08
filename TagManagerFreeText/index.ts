import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { TagManagerComponent } from "./TagManagerComponent";

export class TagManagerFreeText implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private value = "";
    private root: ReactDOM.Root;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.value = context.parameters.Tags.raw || "";

        this.root = ReactDOM.createRoot(this.container);
        this.renderComponent();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.value = context.parameters.Tags.raw || "";
        this.renderComponent();
    }

    private renderComponent(): void {
        const tags = this.value ? this.value.split(",").map(t => t.trim()).filter(Boolean) : [];

        const onAddTag = (tag: string) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
                this.value = tags.join(",");
                this.notifyOutputChanged();
                this.renderComponent();
            }
        };

        const onRemoveTag = (tag: string) => {
            const updated = tags.filter(t => t !== tag);
            this.value = updated.join(",");
            this.notifyOutputChanged();
            this.renderComponent();
        };

        this.root.render(
            React.createElement(TagManagerComponent, {
                tags: tags,
                onAddTag: onAddTag,
                onRemoveTag: onRemoveTag
            })
        );
    }

    public getOutputs(): IOutputs {
        return { Tags: this.value };
    }

    public destroy(): void {
        this.root.unmount();
    }
}
