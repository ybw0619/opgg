<template>
  <div
    class="mt-[15px] flex min-w-[1000px] justify-center border-b-[1px] border-[#d8d8d8]"
  >
    <div class="flex h-[175px] min-w-[1000px] flex-col">
      <div class="mb-[9px] flex px-[32px]">
        <div
          v-for="t in sortedPrevTiers"
          class="mr-[7px] h-[20px] rounded-[2px] border-[1px] border-[#d0d3d4] bg-[#e0e3e3] px-[5px]"
        >
          <div class="h-full text-[11px] text-[#657070]">
            <span class="font-bold leading-5">{{ `S${t.season}` }}</span>
            {{ `${t.tier}` }}
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="relative ml-[21px] h-[120px] w-[120px]">
          <img
            :src="summoner?.profileBorderImageUrl"
            class="absolute h-full w-full"
          />
          <div class="absolute h-full w-full p-[10px]">
            <img :src="summoner?.profileImageUrl" class="h-full w-full" />
          </div>
          <span
            class="absolute top-[98px] left-[38px] h-[24px] w-[44px] text-center text-[#eabd56]"
            :style="{ background: `url(${levelbox})` }"
          >
            {{ summoner?.level }}
          </span>
        </div>
        <div class="ml-[6px] p-[11px] font-apple">
          <div
            class="text-[20px] font-bold leading-[normal] tracking-[-0.77px] text-[#242929]"
          >
            {{ summoner?.name }}
          </div>
          <div class="mt-[4px] text-[11px] tracking-[-0.42px] text-[#657070]">
            레더 랭킹
            <span class="font-helvetica font-bold"
              >{{ summoner?.ladderRank.rank.toLocaleString('ko-KR') }}
            </span>
            위 (상위 {{ summoner?.ladderRank.rankPercentOfTop }}%)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import levelbox from '@/assets/bg-levelbox.png'
import { computed } from 'vue'
const { summoner } = defineProps(['summoner'])
const sortedPrevTiers = computed(() =>
  summoner?.previousTiers.slice().reverse()
)
</script>
<style lang=""></style>
