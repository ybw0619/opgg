<template>
  <div
    class="mt-[8px] w-full border-x-[1px] border-t-[1px] border-[#cdd2d2] bg-[#ededed]"
  >
    <div class="flex h-[44px] text-[12px]">
      <div
        @click="tab = 'champion'"
        class="flex flex-1 cursor-pointer items-center justify-center"
        :class="
          tab === 'champion'
            ? 'text-[#5e5e5e]'
            : 'border-b-[1px] border-r-[1px] border-[#cdd2d2] bg-[#f2f2f2] text-[#879292]'
        "
      >
        <div>챔피언 승률</div>
      </div>
      <div
        @click="tab = 'recent'"
        class="flex flex-1 cursor-pointer items-center justify-center"
        :class="
          tab === 'recent'
            ? 'text-[#5e5e5e]'
            : 'border-b-[1px] border-l-[1px] border-[#cdd2d2] bg-[#f2f2f2] text-[#879292]'
        "
      >
        <div>7일간 랭크 승률</div>
      </div>
    </div>
    <div v-if="tab === 'champion'">
      <div
        v-for="c in sortedChampions"
        class="flex border-b-[1px] border-[#cdd2d2] px-[15px] py-[4px]"
      >
        <img :src="c.imageUrl" class="h-[45px] w-[45px] rounded-full" />
        <div class="w-[95px] pl-[10px]">
          <div class="truncate text-[13px] font-bold text-[#5e5e5e]">
            {{ c.name }}
          </div>
          <div class="text-[11px] text-[#879292]">CS {{ c.cs }} (2.4)</div>
        </div>
        <div class="w-[90px] truncate">
          <div class="text-[13px] font-bold" :class="getKdaColor(c)">
            {{ getKda(c) }}
          </div>
          <div class="text-[11px] text-[#879292]">
            {{ getAvgKda(c) }}
          </div>
        </div>
        <div class="flex flex-1 flex-col items-center">
          <div class="text-[13px] font-bold" :class="getWinRateColor(c)">
            {{ getWinRate(c) }}%
          </div>
          <div class="text-[11px] text-[#879292]">{{ c.games }} 게임</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="c in sortedRecentWinRate"
        class="flex border-b-[1px] border-[#cdd2d2] px-[15px] py-[10px]"
      >
        <img :src="c.imageUrl" class="h-[32px] w-[32px] rounded-full" />
        <div class="flex w-[70px] items-center pl-[10px]">
          <div class="truncate text-[13px] font-bold text-[#5e5e5e]">
            {{ c.name }}
          </div>
        </div>
        <div class="flex items-center text-[13px] font-bold text-[#879292]">
          {{ getWinRate(c) }}%
        </div>
        <div class="ml-[16px] flex items-center">
          <div
            class="flex h-[24px] w-[125px] overflow-hidden rounded-[4px] text-[11px] text-white"
          >
            <div
              class="relative flex flex-1 items-center bg-[#1f8ecd]"
              :style="`width:${(getWinRate(c) * 125) / 100}px`"
            >
              <div class="absolute left-1">{{ c.wins }}승</div>
            </div>
            <div class="relative flex flex-1 items-center bg-[#ee5a52]">
              <div class="absolute right-1">{{ c.losses }}패</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'

const tab = ref('champion')

const props = defineProps(['champions', 'recentWinRate'])

const sortedChampions = computed(() =>
  props.champions?.sort((a, b) => {
    if (a.games > b.games) return -1
    if (a.games === b.games) return 0
    if (a.games < b.games) return 1
  })
)
const sortedRecentWinRate = computed(() =>
  props.recentWinRate?.sort((a, b) => {
    if (a.games > b.games) return -1
    if (a.games === b.games) return 0
    if (a.games < b.games) return 1
  })
)

const getKdaColor = (c) => {
  const { kills, assists, deaths } = c
  const kda = (kills + assists) / deaths

  if (kda > 5) return 'text-[#e19205]'
  else if (kda > 4) return 'text-[#1f83cd]'
  else if (kda > 3) return 'text-[#2daf7f]'
  else return 'text-[#5e5e5e]'
}
const getWinRateColor = (c) => {
  const { wins, losses } = c
  const winRate = (wins / (wins + losses)) * 100

  if (winRate > 60) return 'text-[#c6443e]'
  else return 'text-[#5e5e5e]'
}
const getWinRate = (c) => parseInt((c.wins / (c.wins + c.losses)) * 100)

const getKda = (c) => {
  const { kills, assists, deaths } = c
  const kda = (kills + assists) / deaths
  return `${kda.toFixed(2)} : 1 평점`
}

const getAvgKda = (c) => {
  let { kills, assists, deaths, games } = c
  kills /= games
  assists /= games
  deaths /= games
  return `${kills.toFixed(1)} / ${assists.toFixed(1)} / ${deaths.toFixed(1)}`
}
</script>
<style></style>
