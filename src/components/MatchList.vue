<template>
  <div
    class="flex h-[194px] flex-col rounded-[2px] border-[1px] border-[#cdd2d2] bg-[#ededed]"
  >
    <div
      class="h-[36px] border-b-[1px] border-[#cdd2d2] bg-[#f2f2f2] px-[16px]"
    >
      <div class="flex h-full text-[12px]">
        <div
          :class="props.matchType === 'ALL' ? 'border-b-[2px]' : ''"
          class="mr-[24px] flex h-full cursor-pointer items-center border-[#1f8ecd]"
          @click="emit('changeMatchType', 'ALL')"
        >
          전체
        </div>
        <div
          :class="props.matchType === 'SOLO' ? 'border-b-[2px]' : ''"
          class="mr-[24px] flex h-full cursor-pointer items-center border-[#1f8ecd]"
          @click="emit('changeMatchType', 'SOLO')"
        >
          솔로게임
        </div>
        <div
          :class="props.matchType === 'FLEX' ? 'border-b-[2px]' : ''"
          class="mr-[24px] flex h-full cursor-pointer items-center border-[#1f8ecd]"
          @click="emit('changeMatchType', 'FLEX')"
        >
          자유랭크
        </div>
      </div>
    </div>
    <div class="flex flex-1">
      <div
        class="flex h-full w-[276px] border-r-[1px] border-[#cdd2d2] px-[24px] pt-[16px]"
      >
        <div>
          <div class="mb-[14px] w-[90px] text-center text-[11px] text-[#666]">
            20전 {{ props.summary?.wins }}승 {{ props.summary?.losses }}패
          </div>
          <div class="relative h-[90px] w-[90px]">
            <div
              class="absolute z-10 flex h-[90px] w-[90px] items-center justify-center"
            >
              {{ props.summary?.wins * 5 || 0 }}%
            </div>
            <DoughnutChart
              :key="props.summary"
              :width="90"
              :height="90"
              :chartData="testData"
              :options="options"
            />
          </div>
        </div>
        <div class="flex flex-1 flex-col items-center pl-[23px]">
          <div class="mt-[46px] text-[11px] font-bold">
            <span class="text-[#333333]">{{ props.summary?.kills / 20 }}</span>
            <span class="text-[#999999]"> / </span>
            <span class="text-[#c6443e]">{{ props.summary?.deaths / 20 }}</span>
            <span class="text-[#999999]"> / </span>
            <span class="text-[#333333]">{{
              props.summary?.assists / 20
            }}</span>
          </div>
          <div class="mt-[6px] text-[16px]">
            <!-- TODO 색상 동적으로 입히기 -->
            <span class="font-bold" :class="getKdaColor(props.summary || {})"
              >{{ getKda(props.summary || {}) }}
            </span>
            <span> (58%)</span>
          </div>
        </div>
      </div>
      <div class="w-[228px] px-[14px] pt-[10px]">
        <div v-for="c in props.champions" class="my-[6px] flex">
          <img
            class="h-[34px] w-[34px] rounded-full"
            :src="c.imageUrl"
            alt=""
          />
          <div class="ml-[8px] flex flex-col justify-between">
            <div class="text-[14px]">{{ c.name }}</div>
            <div class="text-[11px]">
              <span :class="getWinRateColor(c)"> {{ getWinRate(c) }}% </span>
              <span> ({{ c.wins }}승 {{ c.losses }}패)</span>
              <span> | </span>
              <span :class="getKdaColor(c || {})"
                >{{ getKda(c || {}) }} 평점</span
              >
            </div>
          </div>
        </div>
        <div v-for="i in 3 - champions?.length || 0" class="my-[6px] flex">
          <img class="h-[34px] w-[34px] rounded-full" :src="NOCHAMP" alt="" />
          <div
            class="ml-[8px] flex items-center justify-center text-[11px] text-[#999]"
          >
            챔피언 정보가 없습니다.
          </div>
        </div>
      </div>
      <div
        class="h-full w-[184px] border-l-[1px] border-[#cdd2d2] p-[16px] pb-0"
      >
        <div class="text-[12px] text-[#666666]">선호 포지션 (랭크)</div>
        <div class="mt-[22px]">
          <div v-for="p in props.positions" class="mb-[20px] flex h-[30px]">
            <img
              :src="position[p.position]"
              class="h-[30px] w-[30px] p-[2px]"
            />
            <div class="ml-[8px] flex flex-col justify-between">
              <div class="text-[14px] leading-[14px]">
                {{ getKrPosition(p.position) }}
              </div>
              <div class="text-[11px] leading-[11px]">
                <span>30%</span>
                <span> | </span>
                <span>승률 33%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, defineEmits } from 'vue'
import TOP from '@/assets/TOP.png'
import MID from '@/assets/MID.png'
import JNG from '@/assets/JNG.png'
import ADC from '@/assets/ADC.png'
import SUP from '@/assets/SUP.png'
import NOCHAMP from '@/assets/noChamp.png'

import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// const matchType = ref('ALL')
const emit = defineEmits()

const position = {
  TOP,
  MID,
  JNG,
  ADC,
  SUP,
}

const props = defineProps(['summary', 'champions', 'positions', 'matchType'])

const getKdaColor = (c) => {
  const { kills = 0, assists = 0, deaths = 0 } = c
  const kda = (kills + assists) / deaths

  if (kda > 5) return 'text-[#e19205]'
  else if (kda > 4) return 'text-[#1f83cd]'
  else if (kda > 3) return 'text-[#2daf7f]'
  else return 'text-[#5e5e5e]'
}
const getWinRateColor = (c) => {
  const winRate = getWinRate(c)

  if (winRate > 60) return 'text-[#c6443e]'
  else return 'text-[#5e5e5e]'
}
const getWinRate = (c) => parseInt((c.wins / (c.wins + c.losses)) * 100)

const getKda = (c) => {
  const { kills, assists, deaths } = c
  const kda = (kills + assists) / deaths
  return `${kda.toFixed(2)} : 1`
}
const getKrPosition = (str) => {
  switch (str) {
    case 'TOP':
      return '탑'
    case 'JNG':
      return '정글'
    case 'MID':
      return '미드'
    case 'ADC':
      return '원딜'
    case 'SUP':
      return '서폿'
  }
}

const testData = computed(() => {
  return props.summary
    ? {
        datasets: [
          {
            data: [props.summary.losses, props.summary.wins],
            backgroundColor: ['#ee5a52', '#1f8ecd'],
            rotation: 0,
          },
        ],
      }
    : {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: ['#ee5a52', '#1f8ecd'],
            rotation: 0,
          },
        ],
      }
})

const options = reactive({
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      top: -10,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  cutout: 31,
  plugins: {
    tooltip: {
      enabled: false,
    },
    mixins: { reactiveProp: true },
  },
  hover: { mode: null },
})
</script>
<style></style>
