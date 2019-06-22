import Vue, { VNode } from 'vue';
import { Store, Dispatch, Commit } from 'vuex';

declare module '*.vue' {
  export default Vue;
}
declare module 'vue/types/vue' {
  interface Vue {
    $myProperty: string;
  }
}

interface ActionContext<S> {
  dispatch: Dispatch;
  commit: Commit;
  store: S;
}

declare module '*.json' {
  const value: any;
  export default value;
}
