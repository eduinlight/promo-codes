module.exports = {
  postGenerate: {
    event_id: [
      'required',
    ],
  },
  getCodes: {
    active: [
      'boolean'
    ]
  },
  putRadius: {
    radius: [
      'required',
      'float',
    ]
  },
  postPickup: {
    user_id: [
      'required',
    ],
    code_id: [
      'required',
    ]
  },
  postRide: {
    code_id: [
      'required'
    ],
    user_id: [
      'required'
    ],
    origin_latitude: [
      'required',
      'float',
    ],
    origin_longitude: [
      'required',
      'float',
    ],
    destination_latitude: [
      'required',
      'float',
    ],
    destination_longitude: [
      'required',
      'float',
    ]
  },
  putConfig: {
    promo_code_max_rides: [
      'int',
    ],
    promo_code_radius: [
      'float',
    ],
    promo_code_duration: [
      'int',
    ],
  }
}