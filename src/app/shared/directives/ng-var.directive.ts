import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ngVar]',
})
export class VarDirective {
    @Input()
    set ngVar(context: any) {
        this.context.$implicit = this.context.ngVar = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: any;
        ngVar: any;
    } = {
        $implicit: null,
        ngVar: null,
    };

    private hasView: boolean = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private vcRef: ViewContainerRef
    ) {}
}