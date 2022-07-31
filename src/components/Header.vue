<template>
  <div class="flex justify-center bg-[#1ea1f7] pb-[12px]">
    <div class="flex h-[97px] min-w-[1000px] items-end justify-end">
      <div class="relative h-[32px] w-[260px]">
        <div @click.stop="focusOn">
          <input
            v-model="name"
            type="text"
            class="font-apple absolute h-full w-full rounded-[2px] pl-[14px] pt-[9px] pr-[10px] pb-[8px] text-[12px] text-[#727272] outline-none"
            placeholder="소환사명,챔피언…"
            @keydown.enter="search(name)"
          />
          <div
            v-if="
              (focused && filteredSummoners.length) || (focused && !name.length)
            "
            class="absolute top-[36px] w-[260px] bg-white shadow-md"
          >
            <div v-if="name.length">
              <div class="flex flex-col py-2">
                <div
                  v-for="s in filteredSummoners"
                  class="flex justify-between px-4 py-2 hover:bg-slate-100"
                >
                  <div
                    class="flex flex-1 cursor-pointer"
                    @click.stop="search(s.summoner.name)"
                  >
                    <div>
                      <img
                        :src="s.summoner.profileImageUrl"
                        class="h-[36px] w-[36px] rounded-full"
                      />
                    </div>
                    <div class="ml-[8px] flex flex-col text-[12px]">
                      <div v-html="s.summoner.name" />
                      <div class="text-[11px] text-gray-500">
                        {{ s.summoner.leagues[0].tierRank.string }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex flex-col text-[12px]">
                <div class="flex">
                  <div
                    class="flex h-[30px] flex-1 items-center justify-center text-[13px]"
                  >
                    최근검색
                  </div>
                  <div
                    tabindex="-1"
                    class="flex h-[30px] flex-1 items-center justify-center bg-gray-200 text-[13px]"
                  >
                    즐겨찾기
                  </div>
                </div>
                <div class="flex flex-col py-2">
                  <div
                    v-for="s in summoners"
                    class="flex justify-between px-4 py-2 hover:bg-slate-100"
                  >
                    <div
                      class="flex-1 cursor-pointer"
                      @click.stop="search(s.summoner.name)"
                    >
                      {{ s.summoner.name }}
                    </div>
                    <div class="flex w-16 justify-between">
                      <div>
                        <img
                          class="cursor-pointer"
                          src="@/assets/icon-bookmark.svg"
                        />
                      </div>
                      <div>
                        <img
                          class="cursor-pointer"
                          src="@/assets/icon-close-small.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="absolute right-0 z-10 h-[32px] w-[50px] p-2"
          @click="search(name)"
        >
          <img src="@/assets/icon-gg.svg" alt="검색" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watch, computed, compile } from 'vue'

const emit = defineEmits()

const name = ref('')
const focused = ref(false)
const summoners = ref([])
const filteredSummoners = computed(() => {
  return summoners.value
    .filter((s) => s.summoner.name.includes(name.value))
    .map((s) => ({
      summoner: {
        ...s.summoner,
        name: s.summoner.name.replace(
          name.value,
          `<span class='text-red-400'>${name.value}</span>`
        ),
      },
    }))
})

const handler = (event) => {
  focused.value = false
}
const focusOn = (e) => {
  focused.value = true
  document.addEventListener('click', handler)
  summoners.value = JSON.parse(localStorage.getItem('summoner') || '[]')
}

const search = async (summonerName) => {
  if (summonerName) {
    emit('search', summonerName)
    name.value = ''
    focused.value = false
  }
}

watch(focused, (v) => {
  if (!v) {
    document.removeEventListener('click', handler)
  }
})
</script>

<style scoped></style>
