import {
    Test,
    Test2,
    Test3,
} from '../slices/type';

interface InitState {
    data: any[]; 
    dataSingle: any[]; 
    loading: boolean;
}

const initState: InitState = {
    data: [],
    dataSingle: [],
    loading: false,
};

interface Action {
    type: string;
    payload?: any; 
    loading?: boolean;
}

const Test_Red = (state = initState, action: Action): InitState => {
    switch (action.type) {
        case Test:
            return {
                ...state,
                loading: action.loading ?? false, 
            };
        case Test2:
            return {
                ...state,
                data: action.payload ?? [],
                loading: action.loading ?? false,
            };
        case Test3:
            return {
                ...state,
                dataSingle: action.payload ?? [],
                loading: action.loading ?? false,
            };
        default:
            return state;
    }
};

export default Test_Red;
