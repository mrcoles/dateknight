export default 
[
  {
    "cat": "year",
    "codes": [
      {
        "code": "Y",
        "example": "2017",
        "info": "Year with century as a decimal number."
      },
      {
        "code": "y",
        "example": "17",
        "info": "Year without century as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "month",
    "codes": [
      {
        "code": "B",
        "example": "June",
        "info": "Month as locale\u2019s full name."
      },
      {
        "code": "b",
        "example": "Jun",
        "info": "Month as locale\u2019s abbreviated name."
      },
      {
        "code": "-m",
        "example": "1",
        "info": "Month as a decimal number."
      },
      {
        "code": "m",
        "example": "01",
        "info": "Month as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "day",
    "codes": [
      {
        "code": "-d",
        "example": "9",
        "info": "Day of the month as a decimal number."
      },
      {
        "code": "d",
        "example": "09",
        "info": "Day of the month as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "hour",
    "codes": [
      {
        "code": "-H",
        "example": "14",
        "info": "Hour (24-hour clock) as a decimal number."
      },
      {
        "code": "-I",
        "example": "2",
        "info": "Hour (12-hour clock) as a decimal number."
      },
      {
        "code": "H",
        "example": "14",
        "info": "Hour (24-hour clock) as a zero-padded decimal number."
      },
      {
        "code": "I",
        "example": "02",
        "info": "Hour (12-hour clock) as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "ampm",
    "codes": [
      {
        "code": "p",
        "example": "PM",
        "info": "Locale\u2019s equivalent of either AM or PM."
      }
    ]
  },
  {
    "cat": "minute",
    "codes": [
      {
        "code": "-M",
        "example": "5",
        "info": "Minute as a decimal number."
      },
      {
        "code": "M",
        "example": "05",
        "info": "Minute as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "second",
    "codes": [
      {
        "code": "-S",
        "example": "8",
        "info": "Second as a decimal number."
      },
      {
        "code": "S",
        "example": "08",
        "info": "Second as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "microsecond",
    "codes": [
      {
        "code": "f",
        "example": "000001",
        "info": "Microsecond as a decimal number, zero-padded on the left."
      }
    ]
  },
  {
    "cat": "timezone",
    "codes": [
      {
        "code": "Z",
        "example": "(empty), UTC, EST, CST",
        "info": "Time zone name (empty string if the object is naive)."
      },
      {
        "code": "z",
        "example": "(empty), +0000, -0400, +1030",
        "info": "UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive)."
      }
    ]
  },
  {
    "cat": "weeknumber",
    "codes": [
      {
        "code": "U",
        "example": "00, 01, \u2026, 53",
        "info": "Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0."
      },
      {
        "code": "W",
        "example": "00, 01, \u2026, 53",
        "info": "Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0."
      }
    ]
  },
  {
    "cat": "dayofyear",
    "codes": [
      {
        "code": "-j",
        "example": "273",
        "info": "Day of the year as a decimal number."
      },
      {
        "code": "j",
        "example": "273",
        "info": "Day of the year as a zero-padded decimal number."
      }
    ]
  },
  {
    "cat": "weekday",
    "codes": [
      {
        "code": "a",
        "example": "Mon",
        "info": "Weekday as locale\u2019s abbreviated name."
      },
      {
        "code": "A",
        "example": "Monday",
        "info": "Weekday as locale\u2019s full name."
      },
      {
        "code": "w",
        "example": "1",
        "info": "Weekday as a decimal number, where 0 is Sunday and 6 is Saturday."
      }
    ]
  }
]
