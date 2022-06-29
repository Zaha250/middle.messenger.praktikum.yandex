import { Block } from '../core';
import store from './store';
import isEqual from '../helpers/isEqual';

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            static componentName = Component.componentName;

            constructor(props: Indexed) {
                let state = mapStateToProps(store.getState());
                super({
                    ...props,
                    ...state,
                });

                store.on('changed', () => {
                    const newState = mapStateToProps(store.getState());
                    // вызываем обновление компонента, передав данные из хранилища
                    console.log('no changed');
                    if (!isEqual(state, newState)) {
                        console.log('changed');
                        this.setProps({
                            ...this.props,
                            ...newState,
                        });
                    }
                    state = newState;
                });
            }
        };
    };
}
