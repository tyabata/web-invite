<template>
  <v-container>
    <v-window v-model="activePage" :touchless="true">
      <v-window-item :value="'home'">
        <home/>
      </v-window-item>
      <v-window-item :value="'register'">
        <register/>
      </v-window-item>
      <v-window-item :value="'other'">
        <other/>
      </v-window-item>
    </v-window>

    <v-snackbar
      :bottom="true"
      :right="true"
      v-model="isShowSnackBar"
      :timeout="snackbar ? snackbar.timeout : 3000"
    >
      {{snackbar ? snackbar.text : ''}}
      <v-btn color="pink" flat @click="closeSnackBar">Close</v-btn>
    </v-snackbar>
    <v-bottom-nav class="footer-bar" app :active.sync="activePage" :value="true" fixed>
      <v-btn
        v-for="page in pages"
        :key="page.name"
        color="secondary"
        flat
        :value="page.path"
        @click="changePage(page.path)"
      >
        <span>{{page.name}}</span>
        <v-icon>{{page.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import home from '../components/pages/home.vue';
import other from '../components/pages/other.vue';
import register from '../components/pages/register.vue';
import { ISnackBar } from '../types';
import Component from 'vue-class-component';

@Component({
  components: {
    home,
    other,
    register
  }
})
export default class IndexPage extends Vue {
  isMounted: boolean = false;
  isShowSnackBar: boolean = false;
  readonly pages: any[] = [
    {
      name: 'ホーム',
      path: 'home',
      icon: 'home'
    },
    {
      name: '登録',
      path: 'register',
      icon: 'edit'
    },
    {
      name: 'その他',
      path: 'other',
      icon: 'notes'
    }
  ];

  get activePage(): string {
    return this.$store.state.page;
  }
  set activePage(value: string) {
    // do nothing
  }

  get snackbar(): ISnackBar | undefined {
    this.isShowSnackBar = !!this.$store.state.snackbar;
    return this.$store.state.snackbar;
  }

  /**
   * ページ切り替え
   */
  changePage(page: string) {
    this.$store.commit('changePage', page);
    // ページ切り替えで必ず最上部に遷移させる
    window.scrollTo(0, 0);
  }

  /**
   * snackbarを閉じる
   */
  closeSnackBar() {
    this.$store.commit('closeSnackBar');
  }

  mounted(): void {
    // 初期化
    this.$store.dispatch('initialize');
  }
}
</script>



