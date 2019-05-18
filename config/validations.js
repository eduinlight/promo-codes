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
      'numeric',
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
      'numeric',
    ],
    origin_longitude: [
      'required',
      'numeric',
    ],
    destination_longitude: [
      'required',
      'numeric',
    ],
    destination_longitude: [
      'required',
      'numeric',
    ]
  }
}