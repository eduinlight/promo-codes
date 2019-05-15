module.exports = {
  login: {
    user: [
      'required',
    ],
    pass: [
      'required',
    ],
  },
  changepass: {
    old_pass: [
      'required',
    ],
    new_pass: [
      'required',
    ],
  },
  record_emotion: {
    fk_emotion: [
      'required',
    ],
    fk_category_emotion: [
      'required',
    ],
  },
  summary: {
    date_from: [
      'required',
    ],
    date_to: [
      'required',
    ],
  },
  system_config: {
    phrase_umbral: [
      'required',
      'int'
    ]
  },
  level: {
    tag: ['required'],
    number: ['required', 'int'],
    random: ['required', 'boolean'],
  },
  question: {
    text: ['required'],
  },
  answer: {
    text: ['required'],
  },
  question: {
    text: ['required'],
  },
  robot: {
    name: [
      'required',
      // {
      //   rule: 'max_length',
      //   params: [128]
      // },
    ],
    description: [
      'required',
      // {
      //   rule: 'max_length',
      //   params: [255]
      // },
    ],
    image: [
      'required'
    ]
  },
  language: {
    name: [
      'required',
      {
        rule: 'max_length',
        params: [128]
      },
    ],
    code: [
      'required',
      {
        rule: 'max_length',
        params: [3]
      },
    ],
    standard: [
      'required',
      'boolean',
    ],
    image: [
      'required'
    ]
  },
  phrase: {
    author: [
      'required',
    ],
    text: [
      'required',
    ],
    fk_type: [
      'required',
    ],
    active: [
      'boolean',
    ],
  },
  type_phrase: {
    type: [
      'required',
    ],
  },
  country: {
    name: [
      'required',
    ],
  },
  emotion: {
    name: [
      'required',
    ],
  },
  category_emotion: {
    name: [
      'required',
    ],
    is_system: [
      'boolean'
    ],
  },
  city: {
    name: [
      'required',
    ],
    fk_country: [
      'required',
    ]
  },
  district: {
    name: [
      'required',
    ],
    fk_city: [
      'required',
    ]
  },
  profile: {
    alias: [ 'required', {rule: 'max_length',params: [128]}],
    first_name: [ {rule: 'max_length',params: [128]}],
    last_name: [ {rule: 'max_length',params: [128]}],
    email: [ 'email',  {rule: 'max_length',params: [128]}],
    phone: [ 'int',  {rule: 'max_length',params: [32]}],
    birth_date: [ 'required', 'date' ],
    sex: [ 'required', 'gender' ],
    life_feeling: [ 'required', 'int', {rule: 'min',params: [1]}, {rule: 'max',params: [10]} ], 
    fk_district: [ 'required'],
    fk_language: [ 'required' ],
    fk_robot: [ 'required'],
  },
  diary_emoticon: {
    status: [
      'required',
    ],
  },
  diary_phrase: {
    text: [
      'required',
    ],
    fk_emoticon: [
      'required',
    ],
  },
}