/**
 * 国家详细信息
 * key 与 SVG 中的 id 名称对应
 * 多岛屿国家共享相同数据（印度尼西亚、新西兰）
 */

const CountryInfo = {
    // ============ 亚洲 ============
    "china": {
        name: "中国",
        color: "#FF6B6B",
        region: "亚洲",
        capital: { name: "北京", label: "首都" },
        food: { emoji: "🥟", name: "饺子" },
        landmark: { emoji: "🏯", name: "长城" },
        funFact: "中国是世界人口最多的国家，有五千年的文明历史！"
    },
    "honshu": {
        name: "日本",
        color: "#FFAB4C",
        region: "亚洲",
        capital: { name: "东京", label: "首都" },
        food: { emoji: "🍣", name: "寿司" },
        landmark: { emoji: "🗻", name: "富士山" },
        funFact: "日本由四个大岛和六千多个小岛组成！"
    },
    "south korea": {
        name: "韩国",
        color: "#4A90D9",
        region: "亚洲",
        capital: { name: "首尔", label: "首都" },
        food: { emoji: "🥘", name: "泡菜" },
        landmark: { emoji: "🏛️", name: "景福宫" },
        funFact: "韩国人喜欢用金属筷子吃饭！"
    },
    "india": {
        name: "印度",
        color: "#FF8C42",
        region: "亚洲",
        capital: { name: "新德里", label: "首都" },
        food: { emoji: "🍛", name: "咖喱" },
        landmark: { emoji: "🕌", name: "泰姬陵" },
        funFact: "印度是世界上最大的民主国家！"
    },
    "russia": {
        name: "俄罗斯",
        color: "#9B59B6",
        region: "欧洲/亚洲",
        capital: { name: "莫斯科", label: "首都" },
        food: { emoji: "🥣", name: "罗宋汤" },
        landmark: { emoji: "🏰", name: "红场" },
        funFact: "俄罗斯是世界上面积最大的国家，横跨欧亚两大洲！"
    },
    "mongolia": {
        name: "蒙古",
        color: "#DEB887",
        region: "亚洲",
        capital: { name: "乌兰巴托", label: "首都" },
        food: { emoji: "🥩", name: "烤全羊" },
        landmark: { emoji: "🏕️", name: "大草原" },
        funFact: "蒙古是世界上人口最稀疏的国家之一！"
    },
    "thailand": {
        name: "泰国",
        color: "#FF69B4",
        region: "亚洲",
        capital: { name: "曼谷", label: "首都" },
        food: { emoji: "🍜", name: "冬阴功汤" },
        landmark: { emoji: "🛕", name: "大皇宫" },
        funFact: "泰国被称为微笑之国！"
    },
    "vietnam": {
        name: "越南",
        color: "#32CD32",
        region: "亚洲",
        capital: { name: "河内", label: "首都" },
        food: { emoji: "🍜", name: "河粉" },
        landmark: { emoji: "🌊", name: "下龙湾" },
        funFact: "越南的下龙湾有上千个石灰岩岛屿！"
    },
    "java": {
        name: "印度尼西亚",
        color: "#FFD700",
        region: "亚洲",
        capital: { name: "雅加达", label: "首都" },
        food: { emoji: "🍚", name: "炒饭" },
        landmark: { emoji: "🛕", name: "婆罗浮屠" },
        funFact: "印度尼西亚是世界上最大的群岛国家，有一万七千个岛屿！"
    },
    "sumatra": {
        name: "印度尼西亚",
        color: "#FFD700",
        region: "亚洲",
        capital: { name: "雅加达", label: "首都" },
        food: { emoji: "🍚", name: "炒饭" },
        landmark: { emoji: "🛕", name: "婆罗浮屠" },
        funFact: "印度尼西亚是世界上最大的群岛国家，有一万七千个岛屿！"
    },
    "kalimantan": {
        name: "印度尼西亚",
        color: "#FFD700",
        region: "亚洲",
        capital: { name: "雅加达", label: "首都" },
        food: { emoji: "🍚", name: "炒饭" },
        landmark: { emoji: "🛕", name: "婆罗浮屠" },
        funFact: "印度尼西亚是世界上最大的群岛国家，有一万七千个岛屿！"
    },
    "sulawesi": {
        name: "印度尼西亚",
        color: "#FFD700",
        region: "亚洲",
        capital: { name: "雅加达", label: "首都" },
        food: { emoji: "🍚", name: "炒饭" },
        landmark: { emoji: "🛕", name: "婆罗浮屠" },
        funFact: "印度尼西亚是世界上最大的群岛国家，有一万七千个岛屿！"
    },

    // ============ 欧洲 ============
    "britain": {
        name: "英国",
        color: "#4169E1",
        region: "欧洲",
        capital: { name: "伦敦", label: "首都" },
        food: { emoji: "🍟", name: "炸鱼薯条" },
        landmark: { emoji: "🕰️", name: "大本钟" },
        funFact: "英国是世界上第一个工业化国家！"
    },
    "france": {
        name: "法国",
        color: "#1E90FF",
        region: "欧洲",
        capital: { name: "巴黎", label: "首都" },
        food: { emoji: "🥐", name: "可颂面包" },
        landmark: { emoji: "🗼", name: "埃菲尔铁塔" },
        funFact: "埃菲尔铁塔夏天会长高15厘米！"
    },
    "germany": {
        name: "德国",
        color: "#FFCC00",
        region: "欧洲",
        capital: { name: "柏林", label: "首都" },
        food: { emoji: "🌭", name: "香肠" },
        landmark: { emoji: "🏰", name: "新天鹅堡" },
        funFact: "德国有世界上第一条高速公路！"
    },
    "italy": {
        name: "意大利",
        color: "#00BFFF",
        region: "欧洲",
        capital: { name: "罗马", label: "首都" },
        food: { emoji: "🍕", name: "披萨" },
        landmark: { emoji: "🏛️", name: "斗兽场" },
        funFact: "意大利的形状像一只长筒靴！"
    },
    "spain": {
        name: "西班牙",
        color: "#FF4500",
        region: "欧洲",
        capital: { name: "马德里", label: "首都" },
        food: { emoji: "🥘", name: "海鲜饭" },
        landmark: { emoji: "⛪", name: "圣家堂" },
        funFact: "西班牙人喜欢午睡，很多商店下午会关门休息！"
    },

    // ============ 非洲 ============
    "egypt": {
        name: "埃及",
        color: "#DAA520",
        region: "非洲",
        capital: { name: "开罗", label: "首都" },
        food: { emoji: "🫓", name: "皮塔饼" },
        landmark: { emoji: "🔺", name: "金字塔" },
        funFact: "埃及金字塔有几千年的历史，是世界七大奇迹之一！"
    },
    "south africa": {
        name: "南非",
        color: "#228B22",
        region: "非洲",
        capital: { name: "开普敦", label: "立法首都" },
        food: { emoji: "🥩", name: "烤肉" },
        landmark: { emoji: "⛰️", name: "桌山" },
        funFact: "南非有三个首都，是世界上唯一这样做的国家！"
    },
    "kenya": {
        name: "肯尼亚",
        color: "#8B4513",
        region: "非洲",
        capital: { name: "内罗毕", label: "首都" },
        food: { emoji: "🌽", name: "乌伽黎" },
        landmark: { emoji: "🦁", name: "马赛马拉" },
        funFact: "肯尼亚有世界上最大的动物迁徙！"
    },
    "nigeria": {
        name: "尼日利亚",
        color: "#2E8B57",
        region: "非洲",
        capital: { name: "阿布贾", label: "首都" },
        food: { emoji: "🍲", name: "炖菜" },
        landmark: { emoji: "🏙️", name: "拉各斯" },
        funFact: "尼日利亚是非洲人口最多的国家！"
    },

    // ============ 北美洲 ============
    "usa": {
        name: "美国",
        color: "#4169E1",
        region: "北美洲",
        capital: { name: "华盛顿", label: "首都" },
        food: { emoji: "🍔", name: "汉堡包" },
        landmark: { emoji: "🗽", name: "自由女神像" },
        funFact: "美国有50个州，国旗上有50颗星星！"
    },
    "canada": {
        name: "加拿大",
        color: "#FF0000",
        region: "北美洲",
        capital: { name: "渥太华", label: "首都" },
        food: { emoji: "🍁", name: "枫糖浆" },
        landmark: { emoji: "🏔️", name: "尼亚加拉瀑布" },
        funFact: "加拿大是世界上湖泊最多的国家！"
    },
    "mexico": {
        name: "墨西哥",
        color: "#00CED1",
        region: "北美洲",
        capital: { name: "墨西哥城", label: "首都" },
        food: { emoji: "🌮", name: "玉米卷" },
        landmark: { emoji: "🔺", name: "奇琴伊察" },
        funFact: "墨西哥是玉米的发源地！"
    },

    // ============ 南美洲 ============
    "brazil": {
        name: "巴西",
        color: "#00FF00",
        region: "南美洲",
        capital: { name: "巴西利亚", label: "首都" },
        food: { emoji: "🥩", name: "烤肉" },
        landmark: { emoji: "🗿", name: "基督像" },
        funFact: "巴西有世界上最大的热带雨林——亚马逊雨林！"
    },
    "argentina": {
        name: "阿根廷",
        color: "#87CEEB",
        region: "南美洲",
        capital: { name: "布宜诺斯艾利斯", label: "首都" },
        food: { emoji: "🥟", name: "烤肉饺子" },
        landmark: { emoji: "⛰️", name: "巴塔哥尼亚" },
        funFact: "阿根廷是探戈舞的发源地！"
    },
    "chile": {
        name: "智利",
        color: "#FF6347",
        region: "南美洲",
        capital: { name: "圣地亚哥", label: "首都" },
        food: { emoji: "🍲", name: "海鲜汤" },
        landmark: { emoji: "🗿", name: "复活节岛" },
        funFact: "智利是世界上最狭长的国家！"
    },

    // ============ 大洋洲 ============
    "australia": {
        name: "澳大利亚",
        color: "#FFD700",
        region: "大洋洲",
        capital: { name: "堪培拉", label: "首都" },
        food: { emoji: "🥧", name: "肉派" },
        landmark: { emoji: "🪨", name: "乌鲁鲁巨石" },
        funFact: "澳大利亚是世界上唯一一个占据整个大陆的国家！"
    },
    "new zealand north island": {
        name: "新西兰",
        color: "#20B2AA",
        region: "大洋洲",
        capital: { name: "惠灵顿", label: "首都" },
        food: { emoji: "🥧", name: "肉馅饼" },
        landmark: { emoji: "🏔️", name: "霍比特人村" },
        funFact: "新西兰是第一个看到日出的国家！"
    },
    "new zealand south island": {
        name: "新西兰",
        color: "#20B2AA",
        region: "大洋洲",
        capital: { name: "惠灵顿", label: "首都" },
        food: { emoji: "🥧", name: "肉馅饼" },
        landmark: { emoji: "🏔️", name: "霍比特人村" },
        funFact: "新西兰是第一个看到日出的国家！"
    },

    // ============ 中东 ============
    "saudi": {
        name: "沙特阿拉伯",
        color: "#228B22",
        region: "中东",
        capital: { name: "利雅得", label: "首都" },
        food: { emoji: "🍚", name: "抓饭" },
        landmark: { emoji: "🕋", name: "麦加" },
        funFact: "沙特阿拉伯是世界上最大的石油出口国！"
    },
    "turkey": {
        name: "土耳其",
        color: "#FF4500",
        region: "中东/欧洲",
        capital: { name: "安卡拉", label: "首都" },
        food: { emoji: "🥙", name: "烤肉卷" },
        landmark: { emoji: "🕌", name: "蓝色清真寺" },
        funFact: "土耳其横跨欧亚两大洲，首都伊斯坦布尔被海峡分成两半！"
    },
    "iran": {
        name: "伊朗",
        color: "#008000",
        region: "中东",
        capital: { name: "德黑兰", label: "首都" },
        food: { emoji: "🍚", name: "藏红花饭" },
        landmark: { emoji: "🏛️", name: "波斯波利斯" },
        funFact: "伊朗的前身是波斯帝国，有三千年的历史！"
    }
};

// 国家数量统计
const CountryStats = {
    asia: 12,
    europe: 5,
    africa: 4,
    northAmerica: 3,
    southAmerica: 3,
    oceania: 3,
    middleEast: 3
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CountryInfo, CountryStats };
}
