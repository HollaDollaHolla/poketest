import { Dispatch } from "react";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";

export const statusHandlerReducer = {
  initialize: (state: any, action: PayloadAction) => {
    state.status.state = "LOADING";
  },
  error: (state: any, action: PayloadAction) => {
    state.status.state = "ERROR";
  },
  success: (state: any, action: PayloadAction) => {
    state.status.state = "SUCCESS";
  },
};

type StatusHandler = {
  initialize: ActionCreatorWithPayload<any, string>;
  success: ActionCreatorWithPayload<any, string>;
  error: ActionCreatorWithPayload<any, string>;
};

export type WrapReduxAsyncHandlerType = (
  args?: any
) => (dispatch: React.Dispatch<any>) => Promise<void>;

export const wrapReduxAsyncHandler = (
  statusHandler: StatusHandler,
  callback: (dispatch: Dispatch<any>, args: any) => Promise<any>
) => (args?: any) => async (dispatch: Dispatch<any>) => {
  dispatch(statusHandler.initialize({}));

  callback(dispatch, args)
    .then(() => {
      dispatch(statusHandler.success({}));
    })
    .catch((err) => {
      console.error(err);
    });
};
