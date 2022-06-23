import renderDOM from './renderDOM';
import Block from './Block';

interface IRouteProps {
    rootQuery: string;
}

export class Route {
    constructor(pathname: string, view: typeof Block, props: IRouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    private _pathname: string;

    private readonly _blockClass: typeof Block;

    private _block: Block | null;

    private readonly _props: IRouteProps;

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return this._pathname === pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            if (this._block) {
                renderDOM(this._props.rootQuery, this._block);
            }
            return;
        }

        this._block.show();
    }
}
