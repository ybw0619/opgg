export const API_BASE_URL = 'https://codingtest.op.gg/api'

export const SUMMONER_NAME = '{summonerName}'
export const GAME_ID = '{gameId}'

export const SUMMONER = `${API_BASE_URL}/summoner/${SUMMONER_NAME}`
export const MOST_INFO = `${API_BASE_URL}/summoner/${SUMMONER_NAME}/mostInfo`
export const MATCH_LIST = `${API_BASE_URL}/summoner/${SUMMONER_NAME}/matches`
export const MATCH_DETAIL = `${API_BASE_URL}/summoner/${SUMMONER_NAME}/matchDetail/${GAME_ID}`
