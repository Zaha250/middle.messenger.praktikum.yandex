import {Block, router} from "../core";
import Router from "core/Router";

type WithRouterProps = { router: typeof Router }

export default function withRouter<P extends WithRouterProps>(WrappedBlock: typeof Block<P>) {
    return class extends WrappedBlock {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, router });
        }
    };
}