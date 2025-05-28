const TEXT_SCENES = [
    'Jacobin sympathisers viewed the Directory as a betrayal of the Revolution, while Bonapartists later justified.',
    'With Royalists apparently on the verge of power, Republicans attempted a pre-emptive coup on 4 September.'
];
const videoURI = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";  

/**
 * Создает полезную нагрузку для токена аутентификации.
 * @param {string} clientId - Идентификатор клиента.
 * @param {string} clientSecret - Секрет клиента.
 * @returns {object} - Полезная нагрузка токена.
 * @throws {Error} - Если clientId или clientSecret не переданы.
 */
function createAuthTokenPayload(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
        throw new Error("clientId и clientSecret должны быть указаны.");
    }
    return {
        client_id: clientId,
        client_secret: clientSecret
    };
}

/**
 * Создает сегменты видео фона.
 * @param {number} start - Начальное время.
 * @param {number} end - Конечное время.
 * @returns {Array} - Массив сегментов видео.
 * @throws {Error} - Если start или end не являются числами.
 */
function createBackgroundVideoSegments(start, end) {
    if (typeof start !== 'number' || typeof end !== 'number') {
        throw new Error("start и end должны быть числами.");
    }
    return [{ start, end }];
}

/**
 * Создает объект сцены.
 * @param {string} text - Текст сцены.
 * @param {number} counter - Индекс сцены.
 * @param {string} videoUri - URI видео.
 * @param {string} fontFamily - Шрифт текста.
 * @param {string} textColor - Цвет текста.
 * @param {number} fontSize - Размер шрифта.
 * @param {string} textBackgroundColor - Цвет фона текста.
 * @param {boolean} voiceOver - Использовать ли голосовое сопровождение.
 * @param {boolean} splitTextOnPeriod - Разделять ли текст по точкам.
 * @param {string} backgroundType - Тип фона.
 * @returns {object} - Объект сцены.
 * @throws {Error} - Если текст сцены пустой.
 */
function createSceneObject(text, counter, videoUri = videoURI, fontFamily = 'Roboto', textColor = '#00FF00', fontSize = 32, textBackgroundColor = '#000000', voiceOver = true, splitTextOnPeriod = true, backgroundType = "video") {
    if (!text) {
        throw new Error("Текст сцены не может быть пустым.");
    }
    
    const start = counter * 5;
    const end = start + 5;
    const backgroundVideoSegments = createBackgroundVideoSegments(start, end);
    
    return {
        text,
        backgroundUri: videoUri,
        backgroundType,
        fontFamily,
        textColor,
        fontSize,
        textBackgroundColor,
        voiceOver,
        splitTextOnPeriod,
        backgroundVideoSegments
    };
}

/**
 * Создает объект голосового сопровождения AI.
 * @param {string} speaker - Имя говорящего.
 * @param {number} speed - Скорость речи.
 * @param {number} amplifyLevel - Уровень усиления.
 * @returns {object} - Объект голосового сопровождения.
 */
function createAIVoiceoverObject(speaker = 'Jackson', speed = 100, amplifyLevel = 0) {
    return {
        speaker,
        speed,
        amplifyLevel
    };
}

/**
 * Создает объект аудио.
 * @param {object} aiVoiceOver - Объект голосового сопровождения.
 * @param {boolean} autoBackgroundMusic - Использовать ли фоновую музыку.
 * @param {number} backgroundMusicVolume - Уровень громкости фоновой музыки.
 * @returns {object} - Объект аудио.
 */
function createAudioObject(aiVoiceOver, autoBackgroundMusic = true, backgroundMusicVolume = 0.5) {
    return {
        autoBackgroundMusic,
        backGroundMusicVolume: backgroundMusicVolume,
        aiVoiceOver
    };
}

/**
 * Создает массив сцен из списка текстов.
 * @param {Array} textList - Список текстов для сцен.
 * @returns {Array} - Массив объектов сцен.
 * @throws {Error} - Если textList не является массивом или пустым.
 */
function
