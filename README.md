# JAKIM waktu solat database

This is a simple script to pull all prayer times from all available locations and put it in one single file. You can then use it on your app.

### How to use
- node index
- node index 2021
- node index 2022

### Sample output
Output format is the same as the one on [MAMPU](https://www.data.gov.my/data/ms_MY/dataset/waktu-solat-seluruh-malaysia)

Example:

```json
[
  {
    "TAHUN": 2022,
    "NEGERI": "Johor",
    "ZON": "Pulau Aur dan Pulau Pemanggil",
    "TARIKH": "1/1/2022",
    "IMSAK": "5:43:00",
    "SUBUH": "5:53:00",
    "SYURUK": "7:06:00",
    "ZOHOR": "13:08:00",
    "ASAR": "16:31:00",
    "MAGHRIB": "19:06:00",
    "ISYAK": "20:21:00"
  },
  ....

  {
    "TAHUN": 2022,
    "NEGERI": "Sarawak",
    "ZON": "Limbang, Lawas, Sundar, Trusan",
    "TARIKH": "20/7/2022",
    "IMSAK": "4:52:00",
    "SUBUH": "5:02:00",
    "SYURUK": "6:16:00",
    "ZOHOR": "12:29:00",
    "ASAR": "15:52:00",
    "MAGHRIB": "18:38:00",
    "ISYAK": "19:53:00"
  },

  ....


  {
    "TAHUN": 2022,
    "NEGERI": "Wilayah Persekutuan",
    "ZON": "Labuan",
    "TARIKH": "31/12/2022",
    "IMSAK": "5:03:00",
    "SUBUH": "5:13:00",
    "SYURUK": "6:26:00",
    "ZOHOR": "12:24:00",
    "ASAR": "15:45:00",
    "MAGHRIB": "18:18:00",
    "ISYAK": "19:32:00"
  }
```
