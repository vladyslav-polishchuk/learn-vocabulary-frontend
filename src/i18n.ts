import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          profile: 'Profile',
          settings: 'Settings',
          logout: 'Logout',
          login: 'Log In',
          allwords: 'See all words',
          allbooks: 'See all books',
          'get-started': 'Get started',
          'remember-me': 'Remember me',
          'forget-password': 'Forget password?',
          'no-account': 'Don’t have an account?',
          or: 'OR',
          email: 'Email adress',
          password: 'Password',
          'confirm-password': 'Confirm password',
          'login-title': 'Sign in to Bookabulary',
          'login-subtitle': 'Enter your details below',
          'register-title': 'Get started absolutely free',
          'register-subtitle': 'Free forever. No credit card needed',
          'have-account': 'Already have an account?',
          'agree-terms': 'By registering, I agree to Minimal',
          'terms-policies': 'Terms of Service and Privacy Policy',
          'learn-more': 'Learn More',
          listen: 'Listen',
          'mark-learned': 'Mark as learned',
          'delete-learned': 'Remove from learned',
          'show-filters': 'Show filters',
          'hide-filters': 'Hide filters',
          'page-size': 'Page Size',
          'words-title': 'Frequency List',
          'pick-file': 'Pick File',
          search: 'Search',
          'books-title': 'Books List',
          'back-to-books': 'Back To Books',
          'learned-words': 'Your learned words',
          'login-first': 'You have to login to upload books',
        },
      },
      ru: {
        translations: {
          profile: 'Профиль',
          settings: 'Настройки',
          logout: 'Выход',
          login: 'Вход',
          allwords: 'Просмотреть все слова',
          allbooks: 'Просмотреть все книги',
          'get-started': 'Зарегистрироваться',
          'remember-me': 'Запомнить меня',
          'forget-password': 'Забыли пароль?',
          'no-account': 'Нет аккаунта?',
          or: 'ИЛИ',
          email: 'Электронная почта',
          password: 'Пароль',
          'confirm-password': 'Подтвердите пароль',
          'login-title': 'Войти в Bookabulary',
          'login-subtitle': 'Введите ваши данные в форму ниже',
          'register-title': 'Начни пользоваться абсолютно бесплатно',
          'register-subtitle': 'Бесплатно навсегда. Никаких платежных карт',
          'have-account': 'Уже есть аккаунт?',
          'agree-terms': 'Регистрируясь, я соглашаюсь с',
          'terms-policies':
            'Условиями предоставления услуг и Политикой конфиденциальности',
          'learn-more': 'Узнать больше',
          listen: 'Прослушать',
          'mark-learned': 'Пометить как выученное',
          'delete-learned': 'Удалить из выученого',
          'show-filters': 'Показать фильтры',
          'hide-filters': 'Спрятать фильтры',
          'page-size': 'Размер страницы',
          'words-title': 'Все слова',
          'pick-file': 'Загрузить файл',
          search: 'Поиск',
          'books-title': 'Все книги',
          'back-to-books': 'Вернуться к книгам',
          'learned-words': 'Ваши выученные слова',
          'login-first': 'Войдите чтобы выполнить это действие',
        },
      },
      ua: {
        translations: {
          profile: 'Профіль',
          settings: 'Налаштування',
          logout: 'Вихiд',
          login: 'Вхiд',
          allwords: 'Переглянути усi слова',
          allbooks: 'Переглянути усi книги',
          'get-started': 'Зареєструватись',
          'remember-me': 'Запам’ятати мене',
          'forget-password': 'Забули пароль?',
          'no-account': 'Немає аккаунта?',
          or: 'АБО',
          email: 'Електронна адреса',
          password: 'Пароль',
          'confirm-password': 'Підтвердіть пароль',
          'login-title': 'Увійти в Bookabulary',
          'login-subtitle': 'Введіть ваші дані в форму нижче',
          'register-title': 'Розпочни корисуватись абсолютно безкоштовно',
          'register-subtitle': 'Безкоштовно назавжди. Ніяких платіжних карток',
          'have-account': 'Вже маєте акаунт?',
          'agree-terms': 'Реєструючись, я погоджуюсь з',
          'terms-policies':
            'Умовами надання послуг та Політикою конфіденційності',
          'learn-more': 'Дізнатися більше',
          listen: 'Прослухати',
          'mark-learned': 'Позначити як вивчене',
          'delete-learned': 'Видилити з вивченого',
          'show-filters': 'Показати фільтри',
          'hide-filters': 'Сховати фільтри',
          'page-size': 'Розмір сторінки',
          'words-title': 'Усі слова',
          'pick-file': 'Завантажити файл',
          search: 'Пошук',
          'books-title': 'Усі книги',
          'back-to-books': 'Повернутися до книг',
          'learned-words': 'Ваші вивчені слова',
          'login-first': 'Увійдіть щоб виконати операцію',
        },
      },
    },
    fallbackLng: 'en',
    debug: true,
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
