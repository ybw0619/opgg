import axios from 'axios'
import {
  SUMMONER,
  MOST_INFO,
  MATCH_LIST,
  MATCH_DETAIL,
  SUMMONER_NAME,
  GAME_ID,
} from '@/constans'

export const getSummoner = async (summoner) => 
  (await axios.get(SUMMONER.replace(SUMMONER_NAME, summoner))).data
export const getMostInfo = async (summoner) =>
  (await axios.get(MOST_INFO.replace(SUMMONER_NAME, summoner))).data
export const getMatchList = async (summoner) =>
  (await axios.get(MATCH_LIST.replace(SUMMONER_NAME, summoner))).data
export const getMatchDetail = async (summoner, gameId) =>
  (await axios.get(MATCH_DETAIL.replace(SUMMONER_NAME, summoner).replace(GAME_ID, gameId))).data
