<template>
  <div class="w-full">
    <Header @search="search" :summonerName="summonerName" />
    <Info v-bind="summoner" />
    <div class="flex min-w-[1000px] justify-center">
      <div class="flex justify-between">
        <div class="flex w-[300px] flex-col pt-[10px]">
          <RankedSolo v-bind="summoner" />
          <RankedFlex v-bind="summoner" />
          <MostInfo v-bind="mostInfo" />
        </div>
        <div class="w-[700px] pt-[10px] pl-[10px]">
          <MatchList
            :matchType="matchType"
            @changeMatchType="changeMatchType"
            v-bind="matchList"
          />
          <Games
            :summonerName="summonerName"
            v-bind="matchList"
            :matchType="matchType"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { getSummoner, getMostInfo, getMatchList } from '@/api/v1'

import Info from './components/Info.vue'
import RankedFlex from './components/RankedFlex.vue'
import RankedSolo from './components/RankedSolo.vue'
import MostInfo from './components/MostInfo.vue'
import MatchList from './components/MatchList.vue'
import Games from './components/Games.vue'

const summonerName = ref('')

const matchList = ref(null)
const summoner = ref(null)
const mostInfo = ref(null)
const matchType = ref('ALL')

const changeMatchType = (type) => {
  matchType.value = type
}

const search = async (name) => {
  summonerName.value = name

  getSummoner(name).then((data) => {
    summoner.value = data
    let localItems = JSON.parse(localStorage.getItem('summoner') || '[]')
    if (
      localItems.filter((s) => s.summoner.name === summonerName.value).length
    ) {
      localItems = [
        data,
        ...localItems.filter((s) => s.summoner.name !== summonerName.value),
      ]
    } else {
      localItems = [data, ...localItems]
    }
    localStorage.setItem('summoner', JSON.stringify(localItems))
  })
  getMostInfo(name).then((data) => {
    mostInfo.value = data
  })
  getMatchList(name).then((data) => {
    matchList.value = data
  })
}
search('hide on bush')
</script>

<style scoped></style>
