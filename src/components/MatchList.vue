<template>
  <div v-if="props.games" class="mt-[16px]">
    <div
      v-for="g in filteredGames"
      class="mb-[8px] h-[96px] border-[1px]"
      :class="
        g.isWin ? 'border-[#a1b8cd] bg-blue-300' : 'border-[#c0aba8] bg-red-300'
      "
    >
      <div class="flex justify-between">
        <div class="flex">
          <div
            class="flex w-[70px] flex-col items-center justify-center text-[11px] text-[#555555]"
          >
            <div class="font-bold">{{ g.gameType }}</div>
            <div>
              {{ getAgoString(g.createDate) }}
            </div>
            <div
              class="m-1 h-[1px] w-[27px]"
              :class="g.isWin ? 'bg-[#94b9d6]' : 'bg-[#d0a6a5]'"
            ></div>
            <div
              class="font-bold"
              :class="g.isWin ? 'text-[#2c709b]' : 'text-[#d0021b]'"
            >
              {{ g.isWin ? '승리' : '패배' }}
            </div>
            <div>
              {{ `${parseInt(g.gameLength / 60)}분 ${g.gameLength % 60}초` }}
            </div>
          </div>
          <div class="mt-[15px] flex flex-col">
            <div class="flex">
              <img
                :src="g.champion.imageUrl"
                class="h-[46px] w-[46px] rounded-full"
              />
              <div class="ml-[6px] flex h-[48px] w-[48px] justify-between">
                <div class="flex flex-col justify-between">
                  <img :src="g.spells[0].imageUrl" class="h-[22px] w-[22px]" />
                  <img :src="g.spells[1].imageUrl" class="h-[22px] w-[22px]" />
                </div>
                <div class="flex flex-col justify-between">
                  <img
                    :src="g.peak[0]"
                    class="h-[22px] w-[22px] rounded-full"
                  />
                  <img
                    :src="g.peak[1]"
                    class="h-[22px] w-[22px] rounded-full"
                  />
                </div>
              </div>
            </div>
            <div class="mt-[6px] flex justify-center text-[11px] text-[#555]">
              {{ getNameFromImageUrl(g.champion.imageUrl) }}
            </div>
          </div>

          <div
            class="ml-[10px] flex w-[96px] flex-col items-center justify-center font-helvetica"
          >
            <div class="text-[15px] font-bold tracking-[-0.58px]">
              <span class="text-[#555e5e]">{{ g.stats.general.kill }}</span>
              <span class="text-[#948e8d]"> / </span>
              <span class="text-[#d0021b]">{{ g.stats.general.death }}</span>
              <span class="text-[#948e8d]"> / </span>
              <span class="text-[#555e5e]">{{ g.stats.general.assist }}</span>
            </div>
            <div class="mt-[4px] text-[11px]">
              <span class="text-[#555e5e]">
                {{ g.stats.general.kdaString }}
              </span>
              <span class="font-bold text-[#333]"> 평점</span>
            </div>
            <div
              class="mt-[6px] flex font-apple text-[10px] leading-[10px] text-white"
            >
              <div
                class="rounded-[9px] bg-[#ec4f48] px-[5px] py-[3px]"
                v-if="g.stats.general.largestMultiKillString"
              >
                {{ g.stats.general.largestMultiKillString }}
              </div>
              <div
                class="ml-[4px] rounded-[9px] bg-[#8c51c5] px-[5px] py-[3px]"
                v-if="g.stats.general.opScoreBadge"
              >
                {{ g.stats.general.opScoreBadge }}
              </div>
            </div>
          </div>

          <div
            class="ml-[20px] flex flex-col items-center justify-center text-[11px] text-[#555e5e]"
          >
            <div>레벨{{ g.champion.level }}</div>
            <div>
              {{ `${g.stats.general.cs} (${g.stats.general.csPerMin}) CS` }}
            </div>
            <div class="text-[#d0021b]">
              킬관여 {{ g.stats.general.contributionForKillRate }}
            </div>
          </div>

          <div class="ml-[20px] flex flex-col items-center justify-center">
            <div class="flex w-[100px] flex-wrap">
              <div v-for="i in g.items">
                <img :src="i.imageUrl" class="mr-[2px] h-[22px] w-[22px]" />
              </div>
              <div
                v-for="i in 7 - g.items.length"
                class="mt-[2px] mr-[2px] h-[22px] w-[22px] rounded-[2px]"
                :class="g.isWin ? 'bg-[#7aa5c3]' : 'bg-[#cb9e9a]'"
              />
              <img
                :src="g.isWin ? iconBuildBlue : iconBuildRed"
                class="mr-[2px] mt-[2px] h-[22px] w-[22px]"
              />
            </div>
            <div
              class="mt-[5px] flex items-center text-[11px] tracking-[-0.42px] text-[#000]"
            >
              <img
                :src="g.isWin ? iconWardBlue : iconWardRed"
                class="h-[16px] w-[16px]"
              />
              <div class="ml-[4px] leading-[11px]">제어 와드</div>
            </div>
          </div>

          <MatchDetail :summonerName="props.summonerName" :gameId="g.gameId" />
        </div>
        <div
          class="flex h-[94px] w-[30px] items-end justify-center border-l-[1px] pb-[12px]"
          :class="
            g.isWin
              ? 'border-[#549dc7] bg-[#7fb0e1]'
              : 'border-[#c8817c] bg-[#e89c95]'
          "
        >
          <img :src="g.isWin ? iconViewDetailBlue : iconViewDetailRed" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { CHAMPIONS_KR } from '@/constans'
import { fromUnixTime, intervalToDuration } from 'date-fns'

import MatchDetail from '@/components/MatchDetail.vue'

import iconWardBlue from '@/assets/icon-ward-blue.png'
import iconWardRed from '@/assets/icon-ward-red.png'
import iconBuildBlue from '@/assets/icon-buildblue-p.png'
import iconBuildRed from '@/assets/icon-buildred-p.png'
import iconViewDetailBlue from '@/assets/icon-viewdetail-blue.png'
import iconViewDetailRed from '@/assets/icon-viewdetail-red.png'

const props = defineProps(['games', 'summonerName', 'matchType'])

const KR_TYPE = {
  SOLO: '솔랭',
  FLEX: '자유 5:5 랭크',
}

const filteredGames = computed(() =>
  (props.games || []).filter((g) =>
    props.matchType === 'ALL' ? true : g.gameType === KR_TYPE[props.matchType]
  )
)

const getNameFromImageUrl = (url) => {
  const engName = url
    .split('https://opgg-static.akamaized.net/images/lol/champion/')[1]
    .split('.')[0]
  return CHAMPIONS_KR[engName]
}

const getAgoString = (time) => {
  const t = intervalToDuration({
    start: fromUnixTime(time),
    end: new Date(),
  })
  if (t.years) {
    return `${t.years}년 전`
  } else if (t.months) {
    return `${t.months}달 전`
  } else if (t.days) {
    return t.days === 1 ? '하루 전' : `${t.days}일 전`
  } else if (t.hours) {
    return `${t.hours}시간 전`
  } else if (t.minutes) {
    return `${t.minutes}분 전`
  }
}
</script>
<style></style>
