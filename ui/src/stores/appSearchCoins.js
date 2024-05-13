import { writable } from "svelte/store";
export const availableCoins = writable([
  {
    id: "taraxa",
    name: "Taraxa",
    symbol: "tara",
    price: 0.0107791,
    dailyChange: -103,
    currentPrice: 0.07045,
    allTimeHigh: 0.07045,
    allTimeHighChangePercentage: -84.75033,
    allTimeHighDate: "2021-03-22T05:38:18.728Z",
    allTimeLow: 0.00059894,
    allTimeLowChangePercentage: 1693.73531,
    allTimeLowDate: "2022-12-24T15:30:42.481Z",
    marketCap: "44292378",
    marketCapRank: 728,
    fdv: 113202924,
    fdvRation: 0.39,
    totalVolume: 366472,
    high24h: 0.01193916,
    low24h: 0.01063003,
    priceChange24h: -0.0010214429094192,
    totalSupply: 10477024644,
    maxSupply: 12000000000,
    image: "https://assets.coingecko.com/coins/images/4372/small/CPuCDZX.jpg?1696504972",
    circulatingSupply: 4099296388,
    sparkLine7days: [
      0.0131041232433642, 0.0130594916807107, 0.0129155014890224, 0.0128200951448308,
      0.0129871627823761, 0.0129647817130321, 0.0131307530841666, 0.0132070680588685,
      0.0132270458360638, 0.0132096463789242, 0.0132475290953288, 0.01312283402595,
      0.0122057517948829, 0.0120257628324404, 0.0120571695478438, 0.0117707239895636,
      0.0118190222654361, 0.0116712204897175, 0.0117488006840768, 0.0117937191205942,
      0.0118141127162061, 0.0119856038751795, 0.0117468154095677, 0.0121128403938072,
      0.0121872183078198, 0.0120222562992779, 0.0119478748874462, 0.0119101687192709,
      0.0117551581877819, 0.01174885366195, 0.0116962870281858, 0.0116667303489007,
      0.0116259498439584, 0.0116325609255993, 0.0116169368885934, 0.0115693875366511,
      0.0116795677422444, 0.0115370210772598, 0.0114821963388726, 0.0116189814600924,
      0.0116584655903701, 0.012175860224975, 0.0124840398291969, 0.0115022749546709,
      0.0110096575103712, 0.0111066312666606, 0.0112292002762582, 0.0114116786500612,
      0.0111324737778693, 0.0110665277912376, 0.0111126267180535, 0.0111714975559983,
      0.0112232135885917, 0.0112134000879308, 0.0116274793570306, 0.0116779723111995,
      0.0117500508443421, 0.0118010061668225, 0.011887418606623, 0.0119454209121613,
      0.0120286636509382, 0.0119116555918297, 0.0120461869039379, 0.0120074514248134,
      0.0119070255355812, 0.0119216830638213, 0.0123870011917373, 0.012268852677647,
      0.0124678062860215, 0.0122957969050561, 0.0122273431360569, 0.0122236776782622,
      0.012232476694676, 0.0121856921320258, 0.0122212868413275, 0.0121803969065338,
      0.0121635743477367, 0.011992585887939, 0.0121000247572271, 0.0120659004420501,
      0.0121078982924082, 0.0121647657963679, 0.0122166699980917, 0.0122012011301536,
      0.0121816006179403, 0.0120999888205607, 0.0116752384183922, 0.0116294010827528,
      0.0114535157511713, 0.0115352223476195, 0.0116205175092735, 0.0116307504211012,
      0.0115883214622318, 0.0114484867743954, 0.0114021268352735, 0.0114029989808129,
      0.0114418270271669, 0.0114866622726541, 0.0114203170410511, 0.0114794040318049,
      0.0114862158956357, 0.011486270365508, 0.0114701672586855, 0.0114535292980061,
      0.0114661155223778, 0.0114564495460162, 0.011347674233658, 0.0112871635085383,
      0.0113078714923484, 0.0115740794254824, 0.0114581117980773, 0.011326906649671,
      0.0109678255744023, 0.0109011998220283, 0.0110548103851693, 0.0111506025241706,
      0.0111113158626252, 0.0116492931987912, 0.0116623781378312, 0.0117202901922044,
      0.0116686769885359, 0.0117333414637613, 0.0118212701432167, 0.0120098708560385,
      0.0120254536220632, 0.0120686386926048, 0.0120856469462486, 0.0120610176888701,
      0.0121763339243136, 0.0120955402047805, 0.0119825351455334, 0.0120188167868808,
      0.0120870039854286, 0.012157963402089, 0.0121552622486478, 0.0120146817758972,
      0.0119297407270366, 0.0118343582554459, 0.0121010841256352, 0.0121534752791585,
      0.0121665513151892, 0.0120856752501153, 0.0121065448302683, 0.0122471996511516,
      0.0122147394832138, 0.0119649795792585, 0.0119046448440494, 0.0118541189087989,
      0.0117680208944861, 0.0118808916764113, 0.0119242821960041, 0.011856165225561,
      0.0114253232135883, 0.0114784484410271, 0.0113151275534477, 0.0113179684118748,
      0.0113732981635682, 0.0113136584287661, 0.0112338083764172, 0.0112341474060996,
      0.0112675919859087, 0.0111055867406182, 0.0109931963805088, 0.0109201873751293,
      0.011039952977278, 0.0110063028518587, 0.0109854613058634, 0.0110741667945125,
    ],
    //add whats in community data
    totalFollowers: 32286,
    telegramChannel: "taraxa_project",
    twitter: "taraxa_project",
    ohcl: [
      [1714347000000, 0.012, 0.012, 0.012, 0.012],
      [1714348800000, 0.012, 0.012, 0.012, 0.012],
      [1714350600000, 0.012, 0.012, 0.012, 0.012],
      [1714352400000, 0.012, 0.012, 0.012, 0.012],
      [1714354200000, 0.012, 0.012, 0.012, 0.012],
      [1714356000000, 0.012, 0.012, 0.012, 0.012],
      [1714357800000, 0.012, 0.012, 0.012, 0.012],
      [1714359600000, 0.012, 0.012, 0.012, 0.012],
      [1714361400000, 0.011, 0.011, 0.011, 0.011],
      [1714363200000, 0.011, 0.011, 0.011, 0.011],
      [1714365000000, 0.011, 0.011, 0.011, 0.011],
      [1714366800000, 0.011, 0.011, 0.011, 0.011],
      [1714368600000, 0.011, 0.011, 0.011, 0.011],
      [1714370400000, 0.011, 0.011, 0.011, 0.011],
      [1714372200000, 0.011, 0.011, 0.011, 0.011],
      [1714374000000, 0.011, 0.011, 0.011, 0.011],
      [1714375800000, 0.011, 0.011, 0.011, 0.011],
      [1714377600000, 0.011, 0.011, 0.011, 0.011],
      [1714379400000, 0.011, 0.011, 0.011, 0.011],
      [1714381200000, 0.011, 0.011, 0.011, 0.011],
      [1714383000000, 0.011, 0.011, 0.011, 0.011],
      [1714384800000, 0.011, 0.011, 0.011, 0.011],
      [1714386600000, 0.011, 0.011, 0.011, 0.011],
      [1714388400000, 0.011, 0.011, 0.011, 0.011],
      [1714390200000, 0.011, 0.011, 0.011, 0.011],
      [1714392000000, 0.011, 0.011, 0.011, 0.011],
      [1714393800000, 0.011, 0.011, 0.011, 0.011],
      [1714395600000, 0.011, 0.011, 0.011, 0.011],
      [1714397400000, 0.011, 0.011, 0.011, 0.011],
      [1714399200000, 0.011, 0.011, 0.011, 0.011],
      [1714401000000, 0.011, 0.011, 0.011, 0.011],
      [1714402800000, 0.011, 0.011, 0.011, 0.011],
      [1714404600000, 0.011, 0.011, 0.011, 0.011],
      [1714406400000, 0.011, 0.011, 0.011, 0.011],
      [1714408200000, 0.011, 0.011, 0.011, 0.011],
      [1714410000000, 0.011, 0.011, 0.011, 0.011],
      [1714411800000, 0.011, 0.011, 0.011, 0.011],
      [1714413600000, 0.011, 0.011, 0.011, 0.011],
      [1714415400000, 0.011, 0.011, 0.011, 0.011],
      [1714417200000, 0.011, 0.011, 0.011, 0.011],
      [1714419000000, 0.011, 0.011, 0.011, 0.011],
      [1714420800000, 0.011, 0.011, 0.011, 0.011],
      [1714422600000, 0.011, 0.011, 0.011, 0.011],
      [1714424400000, 0.011, 0.011, 0.011, 0.011],
      [1714426200000, 0.011, 0.011, 0.011, 0.011],
      [1714428000000, 0.011, 0.011, 0.011, 0.011],
      [1714429800000, 0.011, 0.011, 0.011, 0.011],
      [1714431600000, 0.011, 0.011, 0.011, 0.011],
    ],
  },
]);
