export const messages = {
  menu: {
    heading: 'Menu',
    group: {
      mainTitle: 'Groups',
      subLinks: {
        add: '@:group.title.add',
        list: '@:group.title.list',
      },
    },
    student: {
      mainTitle: 'Students',
      subLinks: {
        add: '@:student.title.add',
        list: '@:student.title.list',
      },
    },
    teacher: {
      mainTitle: 'Teachers',
      subLinks: {
        add: '@:teacher.title.add',
        list: '@:teacher.title.list',
      },
    },
    user: {
      mainTitle: 'Users',
      subLinks: {
        add: '@:user.title.add',
        list: '@:user.title.list',
      },
    },
  },
  student: {
    title: {
      add: 'Add Student',
      list: 'List Students',
      profile: {
        male: 'Student',
        female: 'Student',
      },
    },
    chooseGender: 'Choose gender',
    redirectTo: 'Go to the student page',
    visit: {
      title: 'Visits',
    },
  },
  teacher: {
    title: {
      add: 'Add teachers',
      list: 'List teachers',
    },
    redirectTo: 'Go to the teachers page',
  },
  user: {
    title: {
      add: 'Add user',
      list: 'List user',
    },
    redirectTo: 'Go to the user page',
  },
  group: {
    title: {
      add: 'Add group',
      list: 'List groups',
    },
  },
  welcome: {
    title: 'Welcome to the student tracking system',
  },
  pageNotFound: {
    title: '(404) Page Not Found',
  },
  formFields: {
    name: 'Enter name',
    surname: 'Enter surname',
    male: 'Male',
    female: 'Female',
    group: 'Enter group',
    phone: 'Enter phone',
    birthday: 'Enter birthday',
    email: 'Enter email',
    password: 'Enter password',
    confirmPassword: 'Confirm password',
    company: 'Enter company',
    companyName: 'Company',
    role: 'Role',
  },
  validationErrors: {
    name: {
      required: 'Name is required',
      invalid: 'Only letters are allowed',
    },
    surname: {
      required: 'Last name is required',
      invalid: 'Only letters are allowed',
    },
    company: {
      required: 'Company is required',
      invalid: 'Company is invalid',
    },
    mobilePhone: {
      required: 'Mobile phone is required',
      invalid: 'Mobile phone is invalid',
    },
    group: {
      required: 'Group is required',
      invalid: 'Group is invalid',
    },
    email: {
      required: 'Email is required',
      invalid: 'Email is invalid',
    },
    password: {
      required: 'Password is required',
      invalid: 'Password is invalid',
    },
  },
  buttons: {
    cancel: 'Cancel',
    ok: 'OK',
    save: 'Save',
    edit: 'Edit',
    setTime: 'Set time',
    delete: 'Delete',
    approve: 'Approve',
    login: 'Login',
    register: 'Register',
  },
  alerts: {
    noGroups: 'Group not yet added',
  },
  success: {
    student: {
      added: 'Student successfully added',
      edit: {
        group: 'Group successfully edited',
      },
      set: {
        time: 'Time is set successfully',
      },
      update: 'Student successfully updated',
      delete: 'Student successfully deleted',
      avatar: "Student's avatar successfully updated",
    },
    teacher: {
      added: 'Teacher successfully added',
      update: 'Teacher successfully updated',
      delete: 'Teacher successfully deleted',
      avatar: "Teacher's avatar successfully updated",
    },
    group: {
      added: 'Group successfully added',
      update: 'Group successfully updated',
      delete: 'Group successfully deleted',
    },
    user: {
      added: 'User successfully added',
      update: 'User information successfully updated',
      delete: 'User successfully deleted',
    },
  },
  error: {
    student: {},
    general: {
      oops: 'Упс...',
    },
    type: {
      invalid: 'Invalid type',
    },
  },
  table: {
    header: {
      name: 'Name',
      surname: 'Surname',
      gender: 'Gender',
      group: 'Group',
      teacher: 'Teacher',
      came: 'Came',
      left: 'Left',
      actions: 'Actions',
      students: 'Students',
      users: 'Users',
      role: 'Role',
    },
  },
  dialog: {
    heading: {
      edit: {
        group: 'Edit group',
      },
      time: {
        came: 'Come time',
        left: 'Leave time',
      },
      delete: {
        default: 'Delete',
        group: 'Delete group',
      },
    },
    chip: {
      for: 'For:',
      time: {
        set: 'Time is set',
      },
    },
    warning: {
      title: 'Warning',
      description: 'All data will be deleted completely. Are you sure you want to delete?',
    },
  },
  tooltips: {
    edit: {
      group: '@:dialog.heading.edit.group',
    },
    set: {
      time: {
        arrival: 'Set the arrival time',
        leave: 'Set the leave time',
      },
    },
    delete: '@:dialog.heading.delete.default',
    profile: 'Profile',
    logout: 'Logout',
  },
  general: {
    who: 'Who',
    relatives: {
      father: 'Father',
      mother: 'Mother',
      grandpa: 'Grandpa',
      grandma: 'Grandma',
    },
    set: {
      time: {
        not: 'Time is not set',
      },
    },
    detail: {
      title: 'User data',
    },
    chips: {
      students: 'Students',
      attached: {
        group: 'Group is not attached',
        teacher: 'Teacher is not attached',
      },
    },
    page: 'Page',
    pageAdmin: 'Administrator',
    welcomeUser: 'Welcome',
    version: 'Version',
    flag: {
      english: 'EN',
      ukraine: 'UK',
    },
    password: {
      hint: 'Password should have 7 to 15 characters which contain at least one numeric digit and a special character',
    },
    nodata: 'Nothing has been created yet',
    sortBy: {
      group: 'Sort by group',
    },
  },
  avatar: {
    title: 'Upload a new avatar',
    label: 'Avatar',
    placeholder: 'Pick an avatar',
  },
  auth: {
    login: {
      title: 'Enter the system',
      goToPageInfo: 'You must be logged in to go to the page',
    },
    register: {
      title: 'Register',
    },
  },
};
