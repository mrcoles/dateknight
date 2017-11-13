export default 
[
  {
    "id": "python",
    "name": "Python",
    "docs": "http://strftime.org",
    "formats": [
      {
        "cat": "year",
        "id": "Y",
        "code": "%Y",
        "example": "2017",
        "info": "Year with century as a decimal number."
      },
      {
        "cat": "year",
        "id": "y",
        "code": "%y",
        "example": "17",
        "info": "Year without century as a zero-padded decimal number."
      },
      {
        "cat": "month",
        "id": "B",
        "code": "%B",
        "example": "June",
        "info": "Month as locale\u2019s full name."
      },
      {
        "cat": "month",
        "id": "b",
        "code": "%b",
        "example": "Jun",
        "info": "Month as locale\u2019s abbreviated name."
      },
      {
        "cat": "month",
        "id": "-m",
        "code": "%-m",
        "example": "1",
        "info": "Month as a decimal number. (Platform specific)"
      },
      {
        "cat": "month",
        "id": "m",
        "code": "%m",
        "example": "01",
        "info": "Month as a zero-padded decimal number."
      },
      {
        "cat": "day",
        "id": "-d",
        "code": "%-d",
        "example": "9",
        "info": "Day of the month as a decimal number. (Platform specific)"
      },
      {
        "cat": "day",
        "id": "d",
        "code": "%d",
        "example": "09",
        "info": "Day of the month as a zero-padded decimal number."
      },
      {
        "cat": "hour",
        "id": "-H",
        "code": "%-H",
        "example": "14",
        "info": "Hour (24-hour clock) as a decimal number. (Platform specific)"
      },
      {
        "cat": "hour",
        "id": "-I",
        "code": "%-I",
        "example": "2",
        "info": "Hour (12-hour clock) as a decimal number. (Platform specific)"
      },
      {
        "cat": "hour",
        "id": "H",
        "code": "%H",
        "example": "14",
        "info": "Hour (24-hour clock) as a zero-padded decimal number."
      },
      {
        "cat": "hour",
        "id": "I",
        "code": "%I",
        "example": "02",
        "info": "Hour (12-hour clock) as a zero-padded decimal number."
      },
      {
        "cat": "ampm",
        "id": "p",
        "code": "%p",
        "example": "PM",
        "info": "Locale\u2019s equivalent of either AM or PM."
      },
      {
        "cat": "minute",
        "id": "-M",
        "code": "%-M",
        "example": "5",
        "info": "Minute as a decimal number. (Platform specific)"
      },
      {
        "cat": "minute",
        "id": "M",
        "code": "%M",
        "example": "05",
        "info": "Minute as a zero-padded decimal number."
      },
      {
        "cat": "second",
        "id": "-S",
        "code": "%-S",
        "example": "8",
        "info": "Second as a decimal number. (Platform specific)"
      },
      {
        "cat": "second",
        "id": "S",
        "code": "%S",
        "example": "08",
        "info": "Second as a zero-padded decimal number."
      },
      {
        "cat": "microsecond",
        "id": "f",
        "code": "%f",
        "example": "000001",
        "info": "Microsecond as a decimal number, zero-padded on the left."
      },
      {
        "cat": "timezone",
        "id": "Z",
        "code": "%Z",
        "example": "(empty), UTC, EST, CST",
        "info": "Time zone name (empty string if the object is naive)."
      },
      {
        "cat": "timezone",
        "id": "z",
        "code": "%z",
        "example": "(empty), +0000, -0400, +1030",
        "info": "UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive)."
      },
      {
        "cat": "weeknumber",
        "id": "U",
        "code": "%U",
        "example": "00, 01, \u2026, 53",
        "info": "Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0."
      },
      {
        "cat": "weeknumber",
        "id": "W",
        "code": "%W",
        "example": "00, 01, \u2026, 53",
        "info": "Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0."
      },
      {
        "cat": "dayofyear",
        "id": "-j",
        "code": "%-j",
        "example": "273",
        "info": "Day of the year as a decimal number. (Platform specific)"
      },
      {
        "cat": "dayofyear",
        "id": "j",
        "code": "%j",
        "example": "273",
        "info": "Day of the year as a zero-padded decimal number."
      },
      {
        "cat": "weekday",
        "id": "a",
        "code": "%a",
        "example": "Mon",
        "info": "Weekday as locale\u2019s abbreviated name."
      },
      {
        "cat": "weekday",
        "id": "A",
        "code": "%A",
        "example": "Monday",
        "info": "Weekday as locale\u2019s full name."
      },
      {
        "cat": "weekday",
        "id": "w",
        "code": "%w",
        "example": "1",
        "info": "Weekday as a decimal number, where 0 is Sunday and 6 is Saturday."
      }
    ]
  },
  {
    "id": "python2",
    "alias": "python",
    "name": "Python 2.x"
  },
  {
    "id": "python3",
    "alias": "python",
    "name": "Python 3.x"
  },
  {
    "id": "django",
    "name": "Django",
    "docs": "https://docs.djangoproject.com/en/1.11/ref/templates/builtins/#date",
    "notes": "There are some extra press style conversions, like AP month abbreviations, etc. that are not included here, yet.",
    "formats": [
      {
        "cat": "year",
        "id": "Y",
        "code": "Y",
        "example": "1999",
        "info": "Year, 4 digits."
      },
      {
        "cat": "year",
        "id": "y",
        "code": "y",
        "example": "99",
        "info": "Year, 2 digits."
      },
      {
        "cat": "month",
        "id": "B",
        "code": "F",
        "example": "June",
        "info": "Month, textual, long."
      },
      {
        "cat": "month",
        "id": "b",
        "code": "M",
        "example": "Jun",
        "info": "Month, textual, 3 letters."
      },
      {
        "cat": "month",
        "id": "-m",
        "code": "n",
        "example": "'1' to '12'",
        "info": "Month without leading zeros."
      },
      {
        "cat": "month",
        "id": "m",
        "code": "m",
        "example": "'01' to '12'",
        "info": "Month, 2 digits with leading zeros."
      },
      {
        "cat": "day",
        "id": "-d",
        "code": "j",
        "example": "'1' to '31'",
        "info": "Day of the month without leading zeros."
      },
      {
        "cat": "day",
        "id": "d",
        "code": "d",
        "example": "'01' to '31'",
        "info": "Day of the month, 2 digits with leading zeros."
      },
      {
        "cat": "hour",
        "id": "-H",
        "code": "G",
        "example": "'0' to '23'",
        "info": "Hour, 24-hour format without leading zeros.."
      },          
      {
        "cat": "hour",
        "id": "H",
        "code": "H",
        "example": "'00' to '23'",
        "info": "Hour, 24-hour format."
      },
      {
        "cat": "hour",
        "id": "-I",
        "code": "g",
        "example": "'1' to '12'",
        "info": "Hour, 12-hour format without leading zeros."
      },
      {
        "cat": "hour",
        "id": "I",
        "code": "h",
        "example": "'01' to '12'",
        "info": "Hour, 12-hour format."
      },
      {
        "cat": "ampm",
        "id": "p",
        "code": "A",
        "example": "AM",
        "info": "'AM' or 'PM'."
      },
      {
        "cat": "minute",
        "id": "M",
        "code": "i",
        "example": "'00' to '59'",
        "info": "Minutes."
      },
      {
        "cat": "second",
        "id": "S",
        "code": "s",
        "example": "'00' to '59'",
        "info": "Seconds, 2 digits with leading zeros."
      },
      {
        "cat": "microsecond",
        "id": "f",
        "code": "u",
        "example": "000000 to 999999",
        "info": "Microsecond as a decimal number, zero-padded on the left."
      },
      {
        "cat": "timezone",
        "id": "Z",
        "code": "e",
        "example": "'', 'GMT', '-500', 'US/Eastern', etc.",
        "info": "Timezone name. Could be in any format, or might return an empty string, depending on the datetime."
      },
      {
        "cat": "timezone",
        "id": "z",
        "code": "O",
        "example": "+0200",
        "info": "Difference to Greenwich time in hours."
      },
      {
        "cat": "weeknumber",
        "id": "W",
        "code": "W",
        "example": "1, 53",
        "info": "ISO-8601 week number of year, with weeks starting on Monday."
      },
      {
        "cat": "dayofyear",
        "id": "j",
        "code": "z",
        "example": "0 to 365",
        "info": "Day of the year."
      },
      {
        "cat": "weekday",
        "id": "a",
        "code": "D",
        "example": "Fri",
        "info": "Day of the week, textual, 3 letters."
      },
      {
        "cat": "weekday",
        "id": "A",
        "code": "l",
        "example": "Friday",
        "info": "Day of the week, textual, long."
      },
      {
        "cat": "weekday",
        "id": "w",
        "code": "w",
        "example": "'0' (Sunday) to '6' (Saturday)",
        "info": "Day of the week, digits without leading zeros."
      }
    ]
  }
]
