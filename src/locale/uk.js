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
    payment: {
      mainTitle: 'Оплати',
      subLinks: {
        list: '@:payments.title.list',
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
  payments: {
    title: {
      list: 'Список оплат',
    },
  },
  welcome: {
    title: 'Вас вітає KiddySafe',
    subtitle: 'Онлайн система трекінгу учнів',
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
    plan: 'Виберіть план',
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
      different: 'Пароль підтвердження інший',
    },
    tariff: {
      required: "Тариф обов'язковий",
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
    makePayment: 'Оплатити',
    goToPayment: 'Перейти до оплати',
    send: 'Відправити',
    forgetPass: 'Забули пароль',
    change: 'Змінити',
  },
  alerts: {
    noGroups: 'Група ще не добавлена',
    toUsePlan: 'Щоб використовувати ваш тариф, оплатіть його.',
    remindToPayPlan: "Нагадуємо про обов'язкову оплату тарифу до",
    notInTimePaidPlan: 'Оплати згідно тарифу не було зроблено до',
    payOrChangePlan:
      'Ваш тариф залишився такий самий, але з лімітом данних. Щоб продовжити ваш тариф перейдіть до оплати.',
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
      changeTariff: 'Тарифний план змінений',
    },
    auth: {
      reset: 'Пароль успішно змінений для ',
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
      amount: 'Сума',
      status: 'Статус',
      plan: 'Тарифний план',
      tariffStart: 'Початок тарифу',
      tariffEnd: 'Кінець тарифу',
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
      nanny: 'Няня',
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
    supportTitle: 'Підтримка',
    copyrights: 'Всі права захищені.',
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
      notExist: 'Немає аккаунта?',
    },
    forgotPassword: {
      title: 'Забули пароль',
    },
    resetPassword: {
      title: 'Змінити пароль',
    },
  },
  breadcrumb: {
    homepage: 'Головна',
    group: {
      add: '@:group.title.add',
      list: '@:group.title.list',
    },
    pupil: {
      add: '@:pupil.title.add',
      list: '@:pupil.title.list',
      profile: '@:general.page',
    },
    teacher: {
      add: '@:teacher.title.add',
      list: '@:teacher.title.list',
      profile: '@:general.page',
    },
    user: {
      add: '@:user.title.add',
      list: '@:user.title.list',
      profile: '@:general.page',
    },
    profile: 'Профіль',
  },
  plans: {
    list: {
      free: 'Free',
      light: 'Light',
      standard: 'Standard',
      premium: 'Premium',
    },
    heading: 'Тарифи',
    title: 'міс.',
    button: {
      choose: 'Обрати',
    },
    tariffs: {
      free: '<li>1 користувач</li><li>1 вчитель</li><li>1 група</li><li>до 5 учнів</li>',
      light:
        '<li>до 2х користувачів</li><li>до 2х вчителів</li><li>до 2х груп</li><li>до 10 учнів</li>',
      standard:
        '<li>до 3х користувачів</li><li>до 3х вчителів</li><li>до 3х груп</li><li>до 30 учнів</li>',
      premium:
        '<li>до 10 користувачів</li><li>до 10 вчителів</li><li>до 10 груп</li><li>до 100 учнів</li><li class="cross">Можливість додавати фото учням, вчителям</li>',
    },
    paidTill: 'Оплачено до:',
  },
  payment: {
    status: {
      paid: 'Оплачений',
      unpaid: 'Неоплачений',
    },
  },
  admin: {
    cards: {
      delete: {
        heading: 'Видалити аккаунт',
        subtitle:
          'Після видалення облікового запису повернення назад не буде. Будь ласка, будьте певні.',
        checkbox: 'Підтвержую видаленя аккаунта',
      },
    },
  },
  toastification: {
    errors: {
      group: {
        0: 'Перевищений ліміт згідно умови тарифу',
        1: 'Така група вже створена',
        2: 'Група не може бути видалена. Видаліть звязок з учнем/вчителем спочатку!',
      },
      pupil: {
        0: 'Перевищений ліміт згідно умови тарифу',
        1: 'Такий учень вже створений',
        2: 'Учень не може бути видалений. Видаліть звязок з спочатку!',
      },
      teacher: {
        0: '@:toastification.errors.group.0',
        1: 'Такий вчитель вже доданий',
        // 2: 'Teacher can not be deleted. Delete relations with pupil or teacher first!'
      },
      user: {
        0: '@:toastification.errors.group.0',
        1: 'Такий користувач вже доданий',
        3: 'Користувач з такою поштою вже доданий',
        // 2: 'Teacher can not be deleted. Delete relations with pupil or teacher first!'
      },
      general: {
        0: 'щось зламалось, вже виправлямо!',
      },
    },
  },
  metaData: {
    title: {
      admin: 'Адмін',
    },
  },
  staticPages: {
    userAgreement: 'Угода користувача',
    privacyPolicy: 'Політика конфіденційності',
    instructions: 'Інструкція',
  },
  serverAnswers: {
    inc_mail: 'Невірна почта',
    inc_pass: 'Невірний пароль',
    not_f_email: 'Пошта не знайдена',
    not_f_user: 'Користувач не знайдений',
    not_f_group: 'Група не знайдена',
    not_f_teacher: 'Вчитель не знайдений',
    token_expired: 'Токен просрочений або невірний',
    exist_company: 'Така компанія вже існує',
    exist_admin: 'Такий адміністратор вже існує',
    inc_mailer: 'Щось пішло не так на стороні почтовика',
    not_auth_user: 'Користувач не авторизований',
    not_updated: 'Не оновлено спробуйте пізніше',
  },
};
