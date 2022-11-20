import React from 'react';
import styles from './index.module.less';

const github = (
  <svg version="1.1" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const zhHans = (
  <svg className={styles.zhHans} viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" />
    <path fillRule="nonzero" d="M10.5793605,8.25423729 L11.9225399,12.4943503 L16.2103818,12.4943503 L12.7491119,15.0706215 L14.0406305,19.3107344 L10.5793605,16.680791 L7.11809059,19.3107344 L8.46126999,15.0706215 L5,12.4943503 L9.28784191,12.4943503 L10.5793605,8.25423729 Z M21.7380816,6 L21.6864209,7.50282489 L22.9779395,8.03954803 L21.5830994,8.41525425 L21.5314386,9.86440679 L20.7565274,8.62994351 L19.413348,8.95197743 L20.2915807,7.82485876 L19.5683303,6.59039549 L20.859849,7.18079097 L21.7380816,6 Z M26.542531,10.7768362 L25.922602,12.0649718 L26.9041562,13.0847457 L25.5093161,12.8700565 L24.8893871,14.1581921 L24.6827441,12.7090396 L23.287904,12.4943503 L24.5277619,11.8502825 L24.3211189,10.40113 L25.3026731,11.4209039 L26.542531,10.7768362 Z M25.0960301,16.680791 L25.5609768,18.0762712 L26.9558169,18.0762712 L25.8192805,18.9350283 L26.2325665,20.3305085 L25.0960301,19.4717514 L23.9594937,20.3305085 L24.4244404,18.9350283 L23.287904,18.0762712 L24.6827441,18.0762712 L25.0960301,16.680791 Z M21.7380816,21.1892655 L21.6347601,22.6384181 L22.9779395,23.1751412 L21.5830994,23.5508475 L21.4797779,25 L20.7565274,23.7655367 L19.3616873,24.1412429 L20.2915807,23.0141243 L19.5166696,21.779661 L20.859849,22.3163842 L21.7380816,21.1892655 Z" />
  </svg>
);

const heart = (
  <svg viewBox="0 0 32 32">
    <path fillRule="nonzero" d="M22.5610847,4 C19.9798492,4 17.5795962,6.5096974 16.0001413,8.39339234 C14.4211809,6.50927346 12.0214932,4 9.43887996,4 C4.78554825,4 1,7.65183385 1,12.140469 C1,14.8183957 2.35597353,16.6970742 3.44575469,18.2065808 C6.61331986,22.5909293 14.5781408,28.0469361 14.9154473,28.2769531 C15.2403185,28.4983855 15.6205478,28.6093844 15.9995054,28.6093844 C16.3794521,28.6093844 16.7589396,28.4983855 17.0834222,28.2769531 C17.4211527,28.046936 25.3866801,22.5909293 28.5532561,18.2065808 C29.6437085,16.6971095 31,14.8183957 31,12.140469 C30.9999646,7.65179853 27.2143811,4 22.5610847,4 Z" />
  </svg>
);

const website = (
  <svg viewBox="0 0 32 32">
    <path d="M15.6984691,13.2960128 C15.7032739,13.2929205 15.7102284,13.2901952 15.7149069,13.2870505 C15.6964459,13.2505725 15.6813989,13.2187067 15.6746973,13.1960128 C15.6830427,13.2291889 15.691641,13.2625747 15.6984691,13.2960128 Z M21.8355394,19.9955677 C21.8361716,19.9955677 21.8361716,19.994808 21.8361716,19.9944281 C21.8338956,19.9932885 21.8260559,19.9932885 21.8244121,19.990756 C21.8269411,19.9932885 21.8330105,19.9932885 21.8355394,19.9955677 Z M21.9857826,20.0214274 C21.9477411,20.0124227 21.8622723,20.0287646 21.8284475,19.992479 C21.8075905,20.098401 21.8390575,20.1383551 21.9857826,20.0214274 Z M16.0000227,0 C7.16327902,0 0,7.16327903 0,15.999932 C0,24.8364036 7.16327902,32 16.0000227,32 C24.8364489,32 32,24.8364489 32,15.999932 C32,7.16327903 24.8364489,0 16.0000227,0 Z M26.2198638,6.25014629 C25.6685564,6.26687733 25.2847858,6.26792016 24.8418899,6.57356729 C24.6634257,6.69694158 24.5422732,6.86030704 24.3157923,6.92383051 C24.1127076,6.98100612 23.8935268,6.93090375 23.6920744,6.99923346 C22.9651139,7.24593664 23.0802814,8.80300953 22.1223966,8.56782312 C21.6724727,8.45741652 21.3553542,7.9256966 21.1288733,7.57847129 C20.929416,7.27300549 20.5661398,7.02036261 20.8114828,6.63804296 C20.6995799,6.66674411 20.580241,6.63405288 20.4700158,6.65500066 C20.6234968,6.31806786 21.138123,6.34749453 21.2237278,6.17528747 C21.4369689,5.74368159 20.6366459,5.69861209 20.410029,5.63876134 C20.6832116,5.34762347 20.8214579,5.73669897 21.0911038,5.6706364 C21.3501853,5.60684091 20.9543538,5.26560067 20.7989685,5.22728706 C20.7431531,5.21345793 19.8307911,5.47943124 20.3588837,5.00683664 C19.7069635,4.59128169 19.0553606,4.17586274 18.4033043,3.75999035 C18.2935778,4.22233776 19.2709594,4.48509184 19.5902091,4.64800387 C19.5406508,4.83893699 19.2436639,5.11692583 19.0162762,5.03553783 C18.8020829,4.95872927 18.8890479,4.60384125 18.5656269,4.63947969 C18.3347026,5.17636855 19.0538643,5.01944157 19.1206977,5.34843961 C19.1965994,5.72332324 18.84883,5.56444655 18.7150725,5.55796274 C18.6831974,5.55633043 18.4339098,5.29829187 18.4204434,5.49362314 C18.4043017,5.72559032 18.8180431,5.635134 18.847243,5.86941358 C18.3653081,5.88891045 18.1191944,5.71493506 17.7268542,5.45426669 C17.2689503,5.1503879 17.0339905,5.17777416 16.47298,5.17777416 C16.6407436,5.10885505 16.8718946,5.05775518 17.0153552,4.94675915 C17.0937053,4.88613753 17.4012568,4.58724628 17.4215244,4.52050358 C17.5084441,4.23258499 17.4168089,4.25443956 17.1413139,4.06568284 C16.8964244,3.89814597 16.5994375,3.59739572 16.3026773,3.53813433 C15.2275846,3.32353295 15.9710948,4.50880545 15.1549929,4.67226162 C15.168958,4.67298705 15.1840568,4.67362186 15.1960723,4.67362186 L15.1493252,4.67362186 C15.1514109,4.67348582 15.1530885,4.67271502 15.1549929,4.67226162 C14.9661908,4.66550571 14.6123456,4.61957474 14.4906944,4.71932608 C14.4048175,4.7894241 14.3976082,5.07108557 14.3016202,5.17305865 C14.1307734,5.35519549 13.8760901,5.3915594 13.6722347,5.5228684 C13.4732761,5.6511849 13.0345516,5.98031897 12.9177066,6.2036259 C12.4870075,7.02643835 13.8881056,7.28184711 14.4193268,7.5223838 C14.6593194,7.63106743 15.3607073,7.77987826 15.4913362,7.96147104 C15.6665358,8.2053177 15.340349,8.43397494 15.7061643,8.60541123 C15.8230094,8.6600024 16.0639542,8.67115643 16.1646124,8.55802936 C16.3281592,8.37371608 16.0981417,8.3321379 16.0589666,8.11925949 C15.9831103,7.70946292 16.1081169,7.87228429 16.3142393,7.72002747 C16.7342831,7.40989154 16.6397008,7.39089343 16.4885774,6.89671625 C16.4183888,6.66669878 16.1536397,6.02457226 16.3865137,5.85476828 C16.6901658,5.63322966 17.337824,5.97483263 17.5706527,6.00339779 C17.8416136,6.03658775 17.9955027,6.41206082 18.14318,6.56563257 C18.2412537,6.66760558 18.41668,6.88397533 18.5880256,6.86057908 C18.8600293,6.82330837 18.7462221,6.58553745 18.9039653,6.47585636 C19.3271829,6.18231539 19.4386777,6.58104867 19.6073481,6.97982725 C19.7659981,7.35439353 19.9161692,7.49341061 20.1985561,7.73367527 C20.3297291,7.8455328 20.9045235,8.24467415 20.8502951,8.49069719 C20.8135231,8.65642043 20.1569326,8.90779378 19.9813249,8.96342779 C19.3395158,9.16669381 18.1355173,8.63062111 18.0062033,9.6484474 C18.2552189,9.55572401 18.963544,8.97707562 19.175969,9.25134645 C19.2728185,9.37576354 19.0991151,9.55699358 19.1400132,9.6805492 C19.261211,10.0510347 19.5469533,9.92194739 19.84657,9.8620966 C19.8261663,9.8748376 19.8052185,9.88594625 19.7830919,9.89583067 C20.1924804,9.68544607 20.1499501,9.72929133 20.3377999,9.3880511 C20.399147,9.2765563 20.4903741,9.00672898 20.576795,8.92692788 C20.8743714,8.65320119 20.9202117,8.84168588 21.1045703,9.05288661 C21.152859,9.10856599 21.6086319,9.76483907 21.4463999,9.7321025 C20.9162216,9.62577665 20.4071724,9.64001388 19.9674958,9.92992751 C19.7141727,10.0972831 19.4745429,10.3230385 19.1719789,10.4341705 C19.0994779,10.4606499 18.5624529,10.5115231 18.6259311,10.4199786 C18.7186091,10.2864478 19.0375413,10.1980772 19.1634094,10.0539366 C18.8145971,9.91029467 18.523686,10.2274586 18.2495965,10.4129053 C17.9587307,10.5505168 17.8911265,10.8069231 17.6434712,11.0317716 C17.535377,11.1298 17.3309321,11.1464857 17.2247876,11.2754823 C17.121817,11.4006702 17.1090307,11.5974977 17.0114558,11.7163378 C16.9430354,11.7995395 16.7675638,11.7493011 16.6961056,11.8746704 C16.6030194,12.0385346 16.7813023,12.19061 16.7422179,12.308634 C16.6706236,12.5230994 16.2627314,12.7050549 16.1058497,12.8594881 C16.1267975,12.8393564 16.1476093,12.81859 16.1681037,12.7975969 C16.0109046,12.9625493 15.8119914,13.0838379 15.6892066,13.2747256 C15.7455661,13.5441903 15.9232595,14.1868609 15.8737012,14.3347649 C15.7101997,14.821234 15.3926278,14.0701518 15.2638125,13.8761355 C14.8212793,13.2093432 13.9368024,13.655549 13.3325814,13.7108657 C12.5598713,13.7815531 11.8029854,14.7844167 12.2796608,15.5984329 C12.5084541,15.9888233 12.8933582,16.1399919 13.3348485,16.0496263 C13.7278234,15.9691904 13.845802,15.4194699 14.2157887,15.4094495 C14.8957754,15.3913129 14.2307968,16.075743 14.1719435,16.326935 C14.1175337,16.5596276 14.2567321,16.5811195 14.496226,16.6387939 C14.6731033,16.6810975 14.9235698,16.5631189 15.0769148,16.6640945 C15.1734922,16.72789 15.1688221,17.0769743 15.301718,16.9668851 C15.0401882,17.1836629 15.1012632,17.6976997 15.3694129,17.8834638 C15.6667172,18.0897224 16.0167537,17.8987439 16.3280232,17.9779102 C16.9156945,18.1278546 16.6351666,17.9331128 17.1512437,17.6215712 C17.4995572,17.41164 17.5566875,17.661109 17.7947305,17.6621065 C17.9567357,17.6627413 18.0596609,17.4291418 18.3305765,17.4971088 C18.5513896,17.5527882 18.6386267,17.7232269 18.9022876,17.7624473 C19.0103818,17.7783622 19.1219672,17.721776 19.2250738,17.7331567 C19.7126765,17.7873398 20.0860185,18.0988813 20.4702878,18.3806335 C20.786953,18.6124647 20.9967028,18.5654909 21.3665989,18.6712273 C21.6368343,18.7482625 22.1354549,19.1393331 22.1099277,19.4827043 C22.1053482,19.5441421 21.8691189,19.8529178 21.8287649,19.9919802 C21.8979107,20.0398609 22.3788482,19.9324015 22.5195882,19.9222903 C22.4733399,19.9761107 22.1458381,20.2062189 22.1458381,20.0840235 C22.1458381,20.1466854 22.3775786,20.275274 22.4340288,20.3152199 C22.6048303,19.7606025 22.8854036,20.1174856 23.2231072,20.2548703 C23.5102096,20.3718061 23.8636014,20.3780632 24.169838,20.4510177 C24.4297809,20.5129089 25.0030336,20.6884259 25.1956444,20.9008509 C25.4275209,21.1565317 25.2672386,21.5719506 25.0956663,21.8263619 C24.8712258,22.1598033 24.5328421,22.2880745 24.3928275,22.6804146 C24.2821942,22.9913667 24.3652599,23.3055381 24.3020538,23.6502696 C24.2165851,24.1169244 24.1480741,23.9533323 23.8475505,24.2380769 C23.5946809,24.4778882 23.8433337,24.4362194 23.4990556,24.5890656 C23.1532359,24.742728 22.8487223,24.6970238 22.6093191,25.0764416 C22.6188861,25.0525919 22.6266849,25.0286516 22.6333501,25.0037137 C22.5323292,25.1450886 22.4818187,25.4345942 22.4339381,25.5295846 C22.313239,25.7719804 22.146745,25.924872 21.9558118,26.1267324 C21.882676,26.2040396 21.2100346,27.1229761 21.171177,27.0491148 C21.1212106,26.9531268 20.5908509,27.1455562 20.5655957,27.0086248 C20.5866795,27.1237016 20.5605628,27.0851159 20.6922799,27.1514506 C20.5703112,27.9066588 20.2508802,28.0193325 19.5092744,28.0269499 C19.57307,28.3899087 19.2405353,28.3174983 19.0860114,28.5126482 C18.9956458,28.6265914 18.952526,28.9470199 18.8899094,29.0946065 C18.8507797,29.1872846 18.5612741,29.5586769 18.5612741,29.6322662 C18.5609567,29.7000517 18.6586677,29.7993496 18.7501215,29.8946122 C18.2272885,29.9979908 17.6942083,30.0701292 17.1527853,30.1140651 C17.2541236,29.9863834 17.2785173,29.8741631 16.9556858,29.8587924 C17.0420613,29.6240594 17.2449193,29.4901658 17.3308868,29.2627782 C17.3716488,29.1555001 17.3379147,29.1131058 17.3724196,29.00678 C17.4905343,28.6398765 17.4392983,28.7783041 17.3726916,28.4932873 C17.2166715,27.8252708 17.4281897,27.6425899 17.6102812,27.0309782 C17.7972243,26.4024541 17.7798131,25.5877124 17.8996054,24.910673 C17.9564183,24.5867079 18.0495044,23.9125702 17.9369668,23.6063336 C17.8101919,23.2614208 17.2525366,22.9897797 16.9971279,22.7578579 C16.6355293,22.4284065 16.4433267,22.0724302 16.1748142,21.6652181 C16.0385176,21.4584155 15.8831776,21.2554669 15.7768518,21.0306183 C15.5494187,20.5498169 15.7769877,20.8359672 15.815256,20.55222 C15.8519373,20.2779945 15.7826101,20.0329236 15.8914751,19.745141 C16.0119021,19.4269796 16.3125164,19.2287012 16.4112702,18.9078646 C16.5001396,18.6222584 16.4325353,18.2632443 16.1391304,18.1679818 C15.9756289,18.1146148 15.795215,18.237581 15.6308974,18.2106028 C15.4018321,18.1734681 15.1424786,18.0024399 14.9626995,17.8656899 C14.7117342,17.6744848 14.6176506,17.3637594 14.3504077,17.1824387 C14.1266474,17.0313607 13.9674986,17.1217717 13.7281408,17.0510843 C13.4785357,16.9775404 13.32442,16.6695808 13.1230583,16.5731394 C12.8209024,16.4285907 12.650645,16.6361188 12.3316675,16.5941779 C12.0603892,16.5586754 11.6466479,16.2580159 11.3931888,16.1444354 C10.8777919,15.9137378 10.5639379,15.6590998 10.3578154,15.1360401 C10.1813462,14.6874765 9.92403311,14.4782254 9.62106114,14.1046567 C9.31405375,13.7261004 9.21792973,13.4035409 8.74474567,13.302656 C8.68920233,13.2905952 8.86054791,13.700029 8.87823109,13.7328563 C9.04730961,14.0459395 9.30122208,14.3319084 9.50544024,14.623409 C9.80591851,15.0527931 9.67782873,15.133365 9.37218156,14.7181727 C9.02264383,14.243175 8.617064,13.7708978 8.3138653,13.2678791 C8.19924192,13.0777621 8.22123258,12.9548413 8.03220382,12.7743367 C7.84952285,12.5999532 7.61048236,12.5149832 7.42653186,12.349124 C6.76468179,11.7539259 6.64434538,10.9593613 6.71983903,10.1108855 C6.74432344,9.83430228 6.84425614,9.61308103 6.80018421,9.34724371 C6.76382032,9.12647589 6.63350882,8.94397632 6.4706874,8.78133629 C6.41822725,8.69777188 6.28651016,8.49196676 6.2788928,8.47886307 C6.12863102,8.22925802 6.01174059,7.98382442 5.77306288,7.7791075 C5.63613149,7.66112885 5.28178761,7.38540712 4.94816473,7.15443741 C6.44706449,5.28500685 8.40840236,3.8035182 10.6583843,2.88367492 C10.6762488,2.99680202 10.7248549,3.10970238 10.7976734,3.21779654 C10.9826668,3.49215803 11.1589546,3.47043945 11.5200544,3.54638651 C11.4813781,3.96552344 10.991463,3.96883334 10.6598352,3.92340115 C10.2640038,3.86903667 9.84754198,3.73754634 9.5046241,4.08445425 C9.69406097,4.19835212 10.2138561,4.64183746 10.1448009,4.17844717 C10.5239921,4.1594491 10.8905328,4.14815904 11.2615171,4.19350057 C11.4101466,4.21172784 11.9081777,4.37885669 12.0431595,4.3026376 C12.099791,4.2706265 12.1601405,3.99118672 12.2201274,3.90521925 C12.1143456,3.90580865 12.0009918,3.85244171 11.8956635,3.86255286 C12.1413238,3.54801878 12.3860773,3.79476732 12.6987071,3.93940675 C12.3545196,4.14856715 12.5586471,4.64986291 12.8951718,4.24256007 C13.1715737,3.90762232 12.8275223,3.66481852 12.4765336,3.46966865 C12.8304695,3.02699944 13.0486982,2.98705356 13.3817316,3.48667169 C13.4365948,3.17853079 13.685293,3.30190504 13.945236,3.32466649 L13.945236,3.2475859 C13.830794,3.25035174 13.7086439,3.18451587 13.5953808,3.19639536 C13.8601752,2.77394846 13.6911875,2.6774164 14.0697437,2.53953284 C14.3711741,2.42976102 15.2311666,2.53196079 15.3371297,2.24853098 C14.7352665,2.36555745 14.0081246,2.39353318 13.4651147,2.66721454 C13.2310164,2.78519315 12.9521208,3.15771901 12.7182946,2.91559535 C12.4786193,2.66721454 12.8896855,2.26780115 13.1000248,2.14605917 L13.0496957,2.14605917 C14.0019581,1.94351866 14.9882268,1.8347897 16.000068,1.8347897 C16.6538926,1.8347897 17.2964272,1.8831691 17.9271277,1.96931794 C17.7088989,2.08394131 17.8702694,2.16133927 17.7113021,2.27845641 C17.4077406,2.50176337 16.8688568,2.68807165 16.5075756,2.8291744 C16.9667944,2.82795017 18.0784323,3.25978275 18.2923536,2.6156159 C18.1440868,2.59285442 17.9962281,2.5700023 17.8480974,2.54724089 C18.1248167,2.36374375 18.4335017,2.21525031 18.7575575,2.10638536 C21.6819491,2.68571388 24.2831011,4.16901615 26.2618501,6.25041832 C26.2475675,6.25014629 26.2335116,6.24978356 26.2198638,6.25014629 Z M28.809363,11.8676878 C28.8357064,11.8114643 28.8972349,11.7929196 28.9226261,11.7465353 C28.9760838,11.6490057 28.964159,11.5828524 29.0299495,11.499152 C29.1004102,11.4086503 29.1954914,11.3864783 29.2741136,11.3157909 C29.3058526,11.2873164 29.3234904,11.260973 29.3380451,11.2341308 C29.5740477,11.8927616 29.7621696,12.5737458 29.8989649,13.272912 C29.8948388,13.2779449 29.8925265,13.2855169 29.8873575,13.2897337 C29.8529433,13.3168933 29.6287295,13.3502193 29.5827079,13.3518062 C29.4202946,13.3580634 29.2996861,13.2503319 29.1830678,13.1489029 C29.0644544,13.045887 28.9248025,12.9080489 28.8405126,12.7746541 C28.7505097,12.6321457 28.8060531,12.4857833 28.8125369,12.3230073 C28.8178872,12.1861666 28.7512805,11.9910167 28.809363,11.8676878 Z M28.992452,19.2037633 C28.7176371,18.964995 28.3934,18.6449292 28.1979781,18.3356547 C27.989271,18.0058859 28.1179049,17.66655 28.133185,17.2889005 C28.1458353,16.9712832 27.9906767,16.519319 28.1256584,16.2333501 C28.1876402,16.1028119 28.3296498,16.0596014 28.3881404,15.9526408 C28.5124214,15.7261146 28.4848538,15.5729963 28.6373373,15.3782545 C28.8009295,15.1690941 29.0209265,15.1175862 29.2031541,14.9535859 C29.3940872,14.7816509 29.3887822,14.6459437 29.5096627,14.4256746 C29.5980786,14.2644855 29.8059241,13.9958371 30.0027063,13.8553237 C30.1094856,14.5548073 30.1651196,15.2711578 30.1651196,15.9998867 C30.1651196,17.2607435 29.997356,18.4827879 29.6866306,19.647158 C29.4217455,19.5788283 29.2038795,19.3878952 28.992452,19.2037633 Z" />
  </svg>
);

export {
  github,
  zhHans,
  heart,
  website,
};