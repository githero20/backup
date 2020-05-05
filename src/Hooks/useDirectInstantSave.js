import {useCallback, useState} from 'react';
import {postDirectInstantSave} from "../actions/UserAction";

UseDirectInstantSave.propTypes = {};

function UseDirectInstantSave(props) {

    const {toastManager, match: {params: {type}}} = props;
    const [state, setState] = useState({isset: false, loading: false, error: false});
    const {loading, isset, error} = state;
    const onInstantSteadySave = () => {
        const {userid, type} = props.match.params;
        setState({...state, loading: true});
        postDirectInstantSave({user_id: userid, type}, (status, data) => {
            setState({...state, loading: false});
            if (!status) {
                toastManager.add('Unable to create instant save at the moment!', {
                    appearance: 'error',
                    autoDismiss: 3000,
                });
                setState({...state, error: true});
                return;
            }
            setState({...state, isset: !state.isset});
        })
    };

    const amountSaved = useCallback((type) => {
        switch (type) {
            case 'five':
                return 5000;
            case 'ten':
                return 10000;
            case 'twenty':
                return 20000;
            default:
                return;
        }
    }, [type]);

    return {amountSaved, loading, isset,type, error, onInstantSteadySave}
}

export default UseDirectInstantSave;
