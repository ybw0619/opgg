<template>
  <div v-if="teams" v-for="t in teams">
    <div class="ml-[8px] flex w-[80px] flex-col items-start justify-center">
      <div class="my-[1px] flex" v-for="g in t.players">
        <img :src="g.champion.imageUrl" class="h-[16px] w-[16px]" />
        <div class="ml-[3px] w-[54px] truncate text-[11px] text-[#555]">
          {{ g.summonerName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { getMatchDetail } from '@/api/v1'

const props = defineProps(['summonerName', 'gameId'])

const { teams } = reactive(
  await getMatchDetail(props.summonerName, props.gameId)
)
</script>
<style></style>
