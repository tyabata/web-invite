import axios from 'axios';
import { ActionContext } from 'vuex';
import storage from '../tools/storage';
import { ISnackBar, IUserResponse, IFormData, IRegisterData } from 'src/types';

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  // 特に理由はないけど5s
  timeout: 5000
});

const KEY = {
  USER_ID: 'KEY_USER_ID',
  COMPLETE_REGISTER: 'KEY_COMPLETE_REGISTER'
};

enum Page {
  HOME = 'home',
  REGISTER = 'register',
  OTHER = 'other'
}

/**
 * store/indexのstate型
 */
interface IState {
  isRegisterd: boolean;
  isWaiting: boolean;
  user?: {
    id: string;
  };
  snackbar?: ISnackBar;
  page: Page;
}

/**
 * ページ定義
 */
export const state = (): IState => ({
  isRegisterd: false,
  isWaiting: false,
  page: Page.HOME,
  snackbar: undefined
});

export const mutations = {
  // 登録中状態を変える
  changeFetchStatus(currentState: IState, isWaiting: boolean) {
    currentState.isWaiting = isWaiting;
  },
  // 登録結果を反映する
  updateRegisterState(currentState: IState, isSuccess: boolean) {
    currentState.isRegisterd = isSuccess;
    currentState.isWaiting = false;
  },
  // 表示しているページを更新(変更)
  changePage(currentState: IState, page: string) {
    switch (page) {
      case Page.HOME:
        currentState.page = Page.HOME;
        break;
      case Page.REGISTER:
        currentState.page = Page.REGISTER;
        break;
      case Page.OTHER:
        currentState.page = Page.OTHER;
        break;
    }
  },
  // userid取得成功
  completeInitialize(currentState: IState, userId: string) {
    currentState.user = {
      id: userId
    };
  },
  // userid取得失敗
  failedInitialize(currentState: IState) {
    currentState.user = undefined;
  },
  // snackbar表示
  showSnackBar(currentState: IState, snackbarState: ISnackBar) {
    currentState.snackbar = {
      ...snackbarState
    };
  },
  // snackbar非表示
  closeSnackBar(currentState: IState) {
    currentState.snackbar = undefined;
  }
};

export const actions = {
  /**
   * ページ初期化
   * @param context
   * @param payload
   */
  async initialize(context: ActionContext<IState, any>, payload: any) {
    // 登録済み状態を反映する
    const isRegisterd: boolean = storage.local.get(KEY.COMPLETE_REGISTER) || false;
    context.commit('updateRegisterState', isRegisterd);

    // 取得ずみのUIDがあれば反映して終了する
    const userId: string | undefined = storage.local.get(KEY.USER_ID);
    if (userId) {
      context.commit('completeInitialize', userId);
      return;
    }

    // userid取得
    axiosClient
      .get<IUserResponse>('/invitees/user')
      .then(result => {
        const updateUserId = result.data.body.user_id;
        storage.local.set(KEY.USER_ID, updateUserId);
        context.commit('completeInitialize', updateUserId);
      })
      .catch(error => {
        context.commit('failedInitialize');
      });
  },

  /**
   * データ登録処理
   * @param context
   * @param payload
   */
  async registerData(context: ActionContext<IState, any>, payload: IFormData) {
    if (!context.state.user) {
      // 初期化が完了してないので終了
      return;
    }
    context.commit('changeFetchStatus', true);

    const registerData: IRegisterData = {
      ...payload,
      userId: context.state.user.id
    };

    axiosClient
      .put('/invitees/', registerData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(result => {
        storage.local.set(KEY.COMPLETE_REGISTER, true);

        context.commit('updateRegisterState', true);
        context.commit('showSnackBar', {
          text: '登録が完了しました！',
          timeout: 3000
        } as ISnackBar);
      })
      .catch(error => {
        console.error(error);
        context.commit('updateRegisterState', false);
        context.commit('showSnackBar', {
          text: '登録に失敗しました。',
          timeout: 3000
        } as ISnackBar);
      });
  }
};
