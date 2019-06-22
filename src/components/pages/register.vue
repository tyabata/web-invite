<template>
  <v-container bg_contents page-content>
    <v-alert class="alert-register" outline v-model="isRegisterd" type="success">すでに登録が完了しております</v-alert>
    <v-alert
      class="alert-register"
      outline
      :value="!isRegisterd"
      type="info"
    >ご参加について以下のフォームに入力のうえ、送信してください。</v-alert>
    <p class="notice-text" v-if="!isRegisterd">※4月15日までにご回答ください。</p>
    <br>
    <v-flex xs12>
      <v-text-field v-model="name" :rules="emptyCheckRules" label="名前" required></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-text-field v-model="email" :rules="emailRules" label="メールアドレス" required></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-select v-model="relation" :rules="emptyCheckRules" :items="relations" label="関係" chips></v-select>
    </v-flex>

    <v-checkbox color="secondary" v-model="useImage" :label="usePermitText"></v-checkbox>
    <p class="form-description">パーティで撮影した写真等をクラウド上で共有させていただきます。もし望まれない場合、上記チェックを外していただけますようお願いします。
      <br>※後日、登録いただいたメールアドレス宛に、共有用のURLをお送りします。
    </p>

    <v-flex xs12>
      <v-textarea
        class="request-area"
        name="input-7-1"
        label="食べられないもの・ご要望など"
        hint="食物アレルギーをお持ちの方等<br>特記事項があればご記入お願いいたします。"
        v-model="requestText"
      ></v-textarea>
    </v-flex>

    <v-btn
      :loading="isWaiting"
      :disabled="!allowRegisterd"
      color="secondary"
      block
      large
      @click="registerData"
    >登録</v-btn>
    <br>
    <br>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { IFormData } from '../../types';

/**
 * emailチェック用の正規表現
 */
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 名前
 * e-mail
 * 新郎/新婦
 * 画像
 * その他要望
 */
@Component
export default class InvitePage extends Vue {
  relations: string[] = ['新郎友人・同僚', '新婦友人・同僚'];
  name: string = '';
  email: string = '';
  relation: string = '';
  useImage: boolean = true;
  emptyCheckRules = [(value: any) => !!value || '入力をお願いします'];
  emailRules = [
    (value: any) => !!value || '入力をお願いします',
    (value: any) => emailRegex.test(value) || 'e-mailの形式が正しくありません。'
  ];
  requestText: string = '';
  readonly noticeText: string = '';

  /**
   * 登録中
   */
  get isWaiting(): boolean {
    return this.$store.state.isWaiting;
  }

  /**
   * 投稿許可
   */
  get allowRegisterd(): boolean {
    return !!this.name && !!this.email && emailRegex.test(this.email) && !!this.relation;
  }

  /**
   * 登録済みであるか
   */
  get isRegisterd(): boolean {
    return !!this.$store.state.isRegisterd;
  }

  /**
   * 画像利用のチェックボックスラベルの表示文言
   */
  get usePermitText(): string {
    return this.useImage ? '写真のクラウド共有を許可する' : 'クラウド共有を許可しない';
  }

  /**
   * 投稿
   */
  registerData() {
    const formData: IFormData = {
      name: this.name,
      email: this.email,
      relation: this.relation,
      useImage: this.useImage,
      request: this.requestText
    };

    this.$store.dispatch('registerData', formData);
  }

  mounted(): void {}
}
</script>
 <style lang="postcss" scoped>
@import '@/assets/postcss/register.css';
</style>