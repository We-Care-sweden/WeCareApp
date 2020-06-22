import I18n from 'i18n-js'

import english from './locales/en'
import farsi from './locales/fa'

I18n.locale = 'english'
I18n.fallbacks = true
I18n.translations = {
  english,
  farsi,
}

export default I18n
