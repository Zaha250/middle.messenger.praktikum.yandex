import { Route } from './Route';
import Block from './Block';

class Router {
    constructor(rootQuery: string) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    private static __instance: any;

    private readonly _rootQuery: string;

    private _currentRoute: null | Route;

    private history: History;

    private routes: any[];

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget?.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export default Router;
