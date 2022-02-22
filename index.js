import fetch from 'node-fetch';
import fs from 'fs';

const zon = [
    { johor: ['JHR01', 'JHR02', 'JHR03', 'JHR04'] },
    { kedah: ['KDH01', 'KDH02', 'KDH03', 'KDH04', 'KDH05', 'KDH06', 'KDH07'] },
    { kelantan: ['KTN01', 'KTN03'] },
    { melaka: ['MLK01'] },
    { negeri_sembilan: ['NGS01', 'NGS02'] },
    { pahang: ['PHG01', 'PHG02', 'PHG03', 'PHG04', 'PHG05', 'PHG06'] },
    { perlis: ['PLS01'] },
    { pulau_pinang: ['PNG01'] },
    { perak: ['PRK01', 'PRK02', 'PRK03', 'PRK04', 'PRK05', 'PRK06', 'PRK07'] },
    { sabah: ['SBH01', 'SBH02', 'SBH03', 'SBH04', 'SBH05', 'SBH06', 'SBH07', 'SBH08', 'SBH09'] },
    { selangor: ['SGR01', 'SGR02', 'SGR03'] },
    { sarawak: ['SWK01', 'SWK02', 'SWK03', 'SWK04', 'SWK05', 'SWK06', 'SWK07', 'SWK08', 'SWK09'] },
    { terengganu: ['TRG01', 'TRG02', 'TRG03', 'TRG04'] },
    { wilayah_persekutuan: ['WLY01', 'WLY02'] }
];

const zoneName = {
    JHR01: "Pulau Aur dan Pulau Pemanggil",
    JHR02: "Johor Bahru, Kota Tinggi, Mersing",
    JHR03: "Kluang, Pontian",
    JHR04: "Batu Pahat, Muar, Segamat, Gemas Johor",
    KDH01: "Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)",
    KDH02: "Kuala Muda, Yan, Pendang",
    KDH03: "Padang Terap, Sik",
    KDH04: "Baling",
    KDH05: "Bandar Baharu, Kulim",
    KDH06: "Langkawi",
    KDH07: "Puncak Gunung Jerai",
    KTN01: "Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku",
    KTN03: "Gua Musang (Daerah Galas Dan Bertam), Jeli, Jajahan Kecil Lojing",
    MLK01: "Seluruh Negeri Melaka",
    NGS01: "Tampin, Jempol",
    NGS02: "Jelebu, Kuala Pilah, Port Dickson, Rembau, Seremban",
    PHG01: "Pulau Tioman",
    PHG02: "Kuantan, Pekan, Rompin, Muadzam Shah",
    PHG03: "Jerantut, Temerloh, Maran, Bera, Chenor, Jengka",
    PHG04: "Bentong, Lipis, Raub",
    PHG05: "Genting Sempah, Janda Baik, Bukit Tinggi",
    PHG06: "Cameron Highlands, Genting Higlands, Bukit Fraser",
    PLS01: "Kangar, Padang Besar, Arau",
    PNG01: "Seluruh Negeri Pulau Pinang",
    PRK01: "Tapah, Slim River, Tanjung Malim",
    PRK02: "Kuala Kangsar, Sg. Siput , Ipoh, Batu Gajah, Kampar",
    PRK03: "Lenggong, Pengkalan Hulu, Grik",
    PRK04: "Temengor, Belum",
    PRK05: "Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor",
    PRK06: "Selama, Taiping, Bagan Serai, Parit Buntar",
    PRK07: "Bukit Larut",
    SBH01: "Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau",
    SBH02: "Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)",
    SBH03: "Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau (Timur)",
    SBH04: "Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)",
    SBH05: "Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat",
    SBH06: "Gunung Kinabalu",
    SBH07: "Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat",
    SBH08: "Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)",
    SBH09: "Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston, Bahagian Pendalaman (Bawah)",
    SGR01: "Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam",
    SGR02: "Kuala Selangor, Sabak Bernam",
    SGR03: "Klang, Kuala Langat",
    SWK01: "Limbang, Lawas, Sundar, Trusan",
    SWK02: "Miri, Niah, Bekenu, Sibuti, Marudi",
    SWK03: "Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu",
    SWK04: "Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit",
    SWK05: "Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai",
    SWK06: "Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok",
    SWK07: "Serian, Simunjan, Samarahan, Sebuyau, Meludam",
    SWK08: "Kuching, Bau, Lundu, Sematan",
    SWK09: "Zon Khas (Kampung Patarikan)",
    TRG01: "Kuala Terengganu, Marang, Kuala Nerus",
    TRG02: "Besut, Setiu",
    TRG03: "Hulu Terengganu",
    TRG04: "Dungun, Kemaman",
    WLY01: "Kuala Lumpur, Putrajaya",
    WLY02: "Labuan",
}

const result = [], year = +process.argv.slice(2)[0] || new Date().getFullYear();
const formData = new URLSearchParams({
    datestart: `${year}-01-01`,
    dateend: `${year}-12-31`
});

console.log(`JAKIM Solat Tahun ${year}`);
console.log('Sila tunggu...');

zon.forEach((state) => {
    const zones = Object.keys(state);
    state[zones].forEach((zon) => {
        fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=duration&zone=${zon}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'OK!') {
                    data.prayerTime.forEach(element => {
                        const obj = {
                            TAHUN: year,
                            NEGERI: capitalize(zones.toString().replace(/_/g, ' ')),
                            ZON: zoneName[zon],
                            TARIKH: new Date(element.date).toLocaleDateString('ms-MY'),
                            IMSAK: element.imsak.replace(/^(?:00:)?0?/, ''),
                            SUBUH: element.fajr.replace(/^(?:00:)?0?/, ''),
                            SYURUK: element.syuruk.replace(/^(?:00:)?0?/, ''),
                            ZOHOR: element.dhuhr.replace(/^(?:00:)?0?/, ''),
                            ASAR: element.asr.replace(/^(?:00:)?0?/, ''),
                            MAGHRIB: element.maghrib.replace(/^(?:00:)?0?/, ''),
                            ISYAK: element.isha.replace(/^(?:00:)?0?/, '')
                        };
                        result.push(obj);
                    });
                }
            })
            .finally(() => {
                fs.writeFileSync('result.json', JSON.stringify(result, null, 0)); // change to whatever indentation you want
            })
            .catch(e => {
                // console.log('Error', e);
            });
    });
});

function capitalize(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}