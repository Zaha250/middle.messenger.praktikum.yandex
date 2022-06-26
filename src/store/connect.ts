import { Block } from '../core';
import store, { StoreEvents } from './store';

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(props: object) {
            super({
                ...props,
                ...mapStateToProps(store.getState()),
            });

            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({
                    ...mapStateToProps(store.getState()),
                });
            });
        }
    };
}
