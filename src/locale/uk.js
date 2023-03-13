export const messages = {
  menu: {
    heading: 'Меню',
    group: {
      mainTitle: 'Групи',
      subLinks: {
        add: '@:group.title.add',
        list: '@:group.title.list',
      },
    },
    pupil: {
      mainTitle: 'Учні',
      subLinks: {
        add: '@:pupil.title.add',
        list: '@:pupil.title.list',
      },
    },
    teacher: {
      mainTitle: 'Вчителі',
      subLinks: {
        add: '@:teacher.title.add',
        list: '@:teacher.title.list',
      },
    },
    user: {
      mainTitle: 'Користувачі',
      subLinks: {
        add: '@:user.title.add',
        list: '@:user.title.list',
      },
    },
  },
  pupil: {
    title: {
      add: 'Додати учня',
      list: 'Список учнів',
      profile: {
        male: 'Учень',
        female: 'Учениця',
      },
    },
    chooseGender: 'Виберіть стать',
    redirectTo: 'Перейти на сторінку учня',
    visit: {
      title: 'Відвідування',
    },
  },
  teacher: {
    title: {
      add: 'Додати вчителя',
      list: 'Список вчителів',
    },
    redirectTo: 'Перейти на сторінку вчителя',
  },
  user: {
    title: {
      add: 'Додати користувача',
      list: 'Список користувачів',
    },
    redirectTo: 'Перейти на сторінку користувача',
  },
  group: {
    title: {
      add: 'Додати групу',
      list: 'Список груп',
    },
  },
  welcome: {
    title: 'Вас вітає система трекінгу учнів',
  },
  pageNotFound: {
    title: '(404) Сторінку не знайдено',
  },
  formFields: {
    name: "Введіть ім'я",
    surname: 'Введіть прізвище',
    male: 'Хлопчик',
    female: 'Дівчинка',
    group: 'Введіть групу',
    phone: 'Введіть номер',
    birthday: 'Вкажіть день народження',
    email: 'Введіть email',
    password: 'Введіть пароль',
    confirmPassword: 'Введіть пароль повторно',
    company: 'Введіть компанію',
    companyName: 'Компанія',
    role: 'Роль',
  },
  validationErrors: {
    name: {
      required: "Ім'я обов'язкове",
      invalid: 'Тільки літери дозволено',
    },
    surname: {
      required: "Прізвище обов'язково",
      invalid: 'Тільки літери дозволено',
    },
    company: {
      required: "Компанія обов'язкова",
      invalid: 'Компанія невалідна',
    },
    mobilePhone: {
      required: "Мобільний обов'язковий",
      invalid: 'Мобільний невалідний',
    },
    group: {
      required: "Група обов'язкова",
      invalid: 'Група невалідна',
    },
    email: {
      required: "Пошта обов'язкова",
      invalid: 'Пошта невалідна',
    },
    password: {
      required: "Пароль обов'язковий",
      invalid: 'Пароль невалідний',
    },
  },
  buttons: {
    cancel: 'Відміна',
    ok: 'OK',
    save: 'Зберегти',
    edit: 'Редагувати',
    setTime: 'Встановити час',
    delete: 'Видалити',
    approve: 'Підтвердити',
    login: 'Увійти',
    register: 'Зареєструватись',
  },
  alerts: {
    noGroups: 'Група ще не добавлена',
  },
  success: {
    pupil: {
      added: 'Учень успішно доданий',
      edit: {
        group: 'Група успішно змінена',
      },
      set: {
        time: 'Час успішно доданий',
      },
      update: 'Дані учня успішно змінені',
      delete: 'Учень успішно видалена',
      avatar: 'Аватар учня успішно змінено',
    },
    teacher: {
      added: 'Вчитель успішно доданий',
      update: 'Дані вчителя успішно змінені',
      delete: 'Вчитель успішно видалений',
      avatar: 'Аватар вчителя успішно змінено',
    },
    group: {
      added: 'Група успішно додана',
      update: 'Група успішно змінена',
      delete: 'Група успішно видалена',
    },
    user: {
      added: 'Користувач успішно доданий',
      update: 'Дані користувача успішно змінені',
      delete: 'Користувач успішно видалений',
    },
  },
  error: {
    pupil: {},
    general: {
      oops: 'Упс...',
    },
    type: {
      invalid: 'Невалідний тип',
    },
  },
  table: {
    header: {
      name: "Ім'я",
      surname: 'Прізвище',
      gender: 'Стать',
      group: 'Група',
      teacher: 'Вчитель',
      came: 'Прийшов/ла',
      left: 'Пішов/ла',
      actions: 'Дії',
      pupils: 'Кількість учнів',
      users: 'Користувачі',
      role: 'Роль',
    },
  },
  dialog: {
    heading: {
      edit: {
        group: 'Редагувати групу',
      },
      time: {
        came: 'Час, коли прийшов/ла',
        left: 'Час, коли пішов/ла',
      },
      delete: {
        default: 'Видалити',
        group: 'Видалити групу',
        user: 'Видалити користувача',
        teacher: 'Видалити вчителя',
        admin: 'Видалити компанію',
      },
    },
    chip: {
      for: 'Для:',
      time: {
        set: 'Час уже встановлений',
      },
    },
    warning: {
      title: 'Попередження',
      description: 'Усі дані будуть видалені повністю. Ви дійсно бажаєте видалити?',
    },
  },
  tooltips: {
    edit: {
      group: '@:dialog.heading.edit.group',
    },
    set: {
      time: {
        arrival: 'Встановити час приходу',
        leave: 'Встановити час коли залишив',
      },
    },
    delete: '@:dialog.heading.delete.default',
    profile: 'Профіль',
    logout: 'Вийти',
  },
  general: {
    who: 'Ким',
    relatives: {
      father: 'Тато',
      mother: 'Мама',
      grandpa: 'Дідусь',
      grandma: 'Бабуся',
    },
    set: {
      time: {
        not: 'Час не встановлений',
      },
    },
    detail: {
      title: 'Дані користувача',
    },
    chips: {
      pupils: 'Учнів',
      attached: {
        group: 'Група не підвязана',
        teacher: 'Вчитель не підвязаний',
      },
    },
    page: 'Сторінка',
    pageAdmin: 'Адміністратор',
    welcomeUser: 'Вітаємо',
    version: 'Версія',
    flag: {
      english: 'EN',
      ukraine: 'UK',
    },
    password: {
      hint: 'Пароль повинен бути від 7 до 15 символів, що містять принаймні одну цифру і особливий символ.',
    },
    nodata: 'Ще нічого не було створено',
    sortBy: {
      group: 'Сортувати по группі',
    },
  },
  avatar: {
    title: 'Завантажте нову аватар',
    label: 'Аватар',
    placeholder: 'Виберіть аватар',
  },
  auth: {
    login: {
      title: 'Увійти в систему',
      goToPageInfo: 'Ви повинні бути залогінені, щоб перейти на сторінку',
    },
    register: {
      title: 'Зареєструватись',
    },
    account: {
      exist: 'Вже є аккаунт?',
      notExist: 'Немає аккаунта?'
    }
  },
};
