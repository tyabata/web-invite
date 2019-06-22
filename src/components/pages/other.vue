<template>
  <v-container bg_contents page-content>
    <h1>このページについて</h1>
    <h3 class="headline-3">以下のフリー素材を利用</h3>
    <ul class="page-title">
      <li>Paper-co | 紙のテクスチャー素材を無料でダウンロードできるサイト
        <br>
        <a href="http://free-paper-texture.com/">http://free-paper-texture.com/</a>
      </li>
    </ul>
    <h3 class="headline-3">以下のOSSを利用</h3>
    <ul>
      <li v-for="(oss, index) in ossList" :key="`item${index}`">{{oss}}</li>
    </ul>
    <h1>おまけ</h1>開発のいろいろはQiitaにまとめる予定です
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class OtherPage extends Vue {
  readonly ossList: string[] = [
    '@nuxtjs/axios@5.3.6',
    '@nuxtjs/pwa@2.6.0',
    'nuxt-ts@2.4.3',
    'vue-class-component@6.3.2',
    'vue-property-decorator@7.3.0',

    'vuetify@1.5.0',
    'vuetify-loader@1.2.0'
  ];
}
</script>
<style lang="postcss">
.headline-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}
.page-title {
  font-size: 0.9em;
}
</style>
