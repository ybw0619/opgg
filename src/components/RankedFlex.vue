<template>
  <div
    class="mt-[8px] flex h-[98px] rounded-[2px] border-[1px] border-[#cdd2d2] bg-[#f2f2f2] py-[17px] px-[28px]"
  >
    <div class="h-[64px] w-[64px]">
      <img :src="summoner?.leagues[1].tierRank.imageUrl" alt="" />
    </div>
    <div class="ml-[28px]">
      <div class="h-[14px] font-apple text-[11px] text-[#879292]">
        자유 랭크
      </div>
      <div class="h-[16px] font-helvetica text-[13px] font-bold text-[#1f8ecd]">
        {{ `${summoner?.leagues[1].tierRank.tier} 1` }}
      </div>
      <div class="h-[14px] font-helvetica text-[11px] text-[#879292]">
        <span class="font-bold text-[#555e5e]">{{
          `${summoner?.leagues[1].tierRank.lp} LP`
        }}</span>
        <span>{{ `/ ${summoner?.leagues[1].wins}승 ` }}</span>
        <span>{{ `${summoner?.leagues[1].losses}패` }}</span>
      </div>
      <div class="h-[14px] font-helvetica text-[11px] text-[#879292]">
        <span>
          {{
            `승률 ${parseInt(
              (summoner?.leagues[1].wins /
                (summoner?.leagues[1].wins + summoner?.leagues[1].losses)) *
                100
            )}%`
          }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const { summoner } = defineProps(['summoner'])
</script>
<style></style>
