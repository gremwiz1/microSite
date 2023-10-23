import { SAVE_VIDEO_TIME } from "../actions/actions";

const initialState = {
  videoTime: 0,
};

type Action = {
  type: string;
  payload?: any;
};

const videoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SAVE_VIDEO_TIME:
      return {
        ...state,
        videoTime: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
