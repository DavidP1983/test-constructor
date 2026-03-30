
export const soundSpeechText = (text: string, lang: 'ru' | 'en' | 'fr') => {
    const utterance = new SpeechSynthesisUtterance(text);

    const language = {
        'ru': 'ru-RU',
        'en': 'en-EN',
        'fr': 'fr-FR'
    } as const

    utterance.lang = language[lang];
    speechSynthesis.speak(utterance);
}