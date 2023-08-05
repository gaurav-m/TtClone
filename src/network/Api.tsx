import axios from 'axios'
import * as DTO from './DTOs'


const BASE_URL = 'https://cross-platform.rp.devfactory.com/';

const axiosInstance = axios.create({ baseURL: BASE_URL });

export function fetchFlashcard() {
    return axiosInstance.get<DTO.FlashCardDto>('following')
}

export function fetchMcq() {
    return axiosInstance.get<DTO.McqDto>('for_you')
}

export function fetchMcqAnswer(qid: number) {
    return axiosInstance.get<DTO.McqAnswerDto>('reveal?id=' + qid)
}
