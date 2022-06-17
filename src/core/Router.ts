import AuthPage from "../pages/auth";
import RegPage from "../pages/reg";
import ProfilePage from "../pages/profile";
import NotFoundPage from "../pages/404";
import ServerErrorPage from "../pages/500";
import Messenger from "../pages/messenger";
import renderDOM from "./renderDOM";

class Router {
    static routes: {[key: string]: any} = {
        '/': Messenger,
        '/auth': AuthPage,
        '/reg': RegPage,
        '/profile': ProfilePage,
        '/404': NotFoundPage,
        '/500': ServerErrorPage
    }

    public push(to: string) {
        renderDOM('#app', new Router.routes[to]());
    }
}

export default Router;