export interface FlashCardDto {
    type: string;
    id: number;
    playlist: string;
    flashcard_front: string;
    flashcard_back: string;
    description: string;
    user: {
        name: string
        avatar: string
    }
}

export interface McqDto {
    type: string;
    id: number;
    playlist: string;
    description: string;
    image: string;
    question: string;
    flashcard_front: string;
    flashcard_back: string;
    options: McqOptionDto[]
    user: {
        name: string
        avatar: string
    }
}

export interface McqOptionDto {
    id: string;
    answer: string;
}

export interface McqAnswerDto {
    id: number;
    correct_options: McqOptionDto[] ;
}
