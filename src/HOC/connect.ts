import { Block } from '../core';
import store from '../store/store';
import isEqual from '../helpers/isEqual';

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            static componentName = Component.componentName;

            constructor(props: Indexed) {
                let state = mapStateToProps(store.getState());
                super({
                    ...props,
                    ...state,
                });
            }

            __onChangeStoreCallback = () => {
                const newState = mapStateToProps(store.getState());
                // вызываем обновление компонента, передав данные из хранилища
                if (!isEqual(this.state, newState)) {
                    this.setProps({
                        ...this.props,
                        ...newState,
                    });
                }
                this.setState({...newState})
                // this.state = newState;
            }

            componentDidMount(props: any) {
                super.componentDidMount(props);
                store.on('changed', this.__onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                store.off('changed', this.__onChangeStoreCallback);
            }
        };
    };
}
