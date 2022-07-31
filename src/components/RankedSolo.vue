<template>
  <div
    class="flex h-[124px] rounded-[2px] border-[1px] border-[#cdd2d2] bg-[#f2f2f2] py-[10px] px-[8px]"
  >
    <div class="h-[104px] w-[104px]">
      <img :src="summoner?.leagues[0].tierRank.imageUrl" alt="" />
    </div>
    <div class="ml-[6px]">
      <div class="h-[13px] font-apple text-[11px] text-[#879292]">
        솔로 랭크
      </div>
      <div class="mt-[4px] h-[15px] font-apple text-[12px] text-[#353a3a]">
        <span class="font-bold">탑</span>
        <span class="font-helvetica">
          (총
          {{ summoner?.leagues[0].wins + summoner?.leagues[0].losses }}
          게임)
        </span>
      </div>
      <div
        class="mt-[4px] h-[18px] font-helvetica text-[15px] font-bold text-[#1f8ecd]"
      >
        {{ `${summoner?.leagues[0].tierRank.tier} 1` }}
      </div>
      <div class="mt-[3px] h-[14px] font-helvetica text-[12px] text-[#879292]">
        <span class="font-bold text-[#555e5e]">{{
          `${summoner?.leagues[0].tierRank.lp} LP`
        }}</span>
        <span>{{ `/ ${summoner?.leagues[0].wins}승 ` }}</span>
        <span>{{ `${summoner?.leagues[0].losses}패` }}</span>
      </div>
      <div>
        <span
          class="mt-[3px] h-[14px] font-helvetica text-[12px] text-[#879292]"
          >{{
            `승률 ${parseInt(
              (summoner?.leagues[0].wins /
                (summoner?.leagues[0].wins + summoner?.leagues[0].losses)) *
                100
            )}%`
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const { summoner } = defineProps(['summoner'])
</script>
<style></style>
