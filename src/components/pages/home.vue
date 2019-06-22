<template>
  <v-container bg_contents page-content>
    <h1 class="headline">
      <img class="logo_invi" :src="image.invitation">
    </h1>
    <v-img class="image-main" :src="familyImage" :lazy-src="familyLazyImage">
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </v-img>

    <p>こんにちは。皆さま、いかがお過ごしでしょうか。
      <br>この度、私たちのウェディングパーティを執り行うこととなりました。
      <br>お忙しいかと思いますが、ぜひご出席いただけますと嬉しいです。
      <br>おいしい食事を用意してお待ちしております。
    </p>
    <p class="family-name">{{husband}}・{{wife}}</p>

    <div class="info_word">
      <h1 class="headline">
        <img class="logo_date" :src="image.date">
      </h1>
      <p class="accent-text">{{date}}</p>11:30~ 受付開始
      <br>12:00~ パーティ開始
      <br>
    </div>

    <div class="info_word">
      <h1 class="headline">
        <img class="logo_place" :src="image.place">
      </h1>
      <p class="accent-text">
        <a href="http://www.hayamaan.com/tokyo/">{{placeName}}</a>
      </p>
      <p>{{address}}</p>
      <iframe
        class="map-iframe"
        :src="mapUrl"
        width="100%"
        height="300"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <div class="info_word">
      <h1 class="headline">
        <img class="logo_fee" :src="image.fee">
      </h1>
      <p class="accent-text">会費制: {{eventFee}}</p>
    </div>

    <div class="info_word">
      <h1 class="headline">
        <img class="logo_dress" :src="image.dress">
      </h1>
      <p>{{dressCode}}</p>
    </div>
    <br>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import word from '../../sentence/word';

@Component
export default class Home extends Vue {
  readonly introduction: string = word.INTRODUCTION.join('<br />');
  readonly husband: string = word.NAME.HUSBAND;
  readonly wife: string = word.NAME.WIFE;
  readonly date: string = word.SCHEDULE.DATE;
  readonly placeName: string = word.PLACE.NAME;
  readonly address: string = word.PLACE.ADDRESS;
  readonly mapUrl: string = word.PLACE.MAP;
  readonly eventFee: string = word.FEE;
  readonly dressCode: string = word.DRESS_CODE;

  readonly image = {
    invitation: require('../../assets/image/logo/invi.png'),
    date: require('../../assets/image/logo/date.png'),
    place: require('../../assets/image/logo/place.png'),
    fee: require('../../assets/image/logo/fee.png'),
    dress: require('../../assets/image/logo/dress.png')
  };

  readonly familyImage = require('../../assets/image/private/img_family.jpg');
  readonly familyLazyImage = require('../../assets/image/private/img_family_lazy.jpg');

  /*
  readonly image = {
    date: require(`${PATH_LOGO}/date.png`),
    place: require(`${PATH_LOGO}/place.png`),
    dress: require(`${PATH_LOGO}/dress.png`),
    fee: require(`${PATH_LOGO}/fee.png`)
  };
  */

  mounted(): void {}
}
</script>
<style lang="postcss" scoped>
@import '@/assets/postcss/invite.css';
</style>
