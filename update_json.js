const fs = require('fs');

function updateJson(file, isZh) {
  let data = fs.readFileSync(file, 'utf8');
  let obj = JSON.parse(data);

  // Global string replacement on stringified JSON is easier for "Monsaraz Castle" -> "Centro Histórico de Évora"
  // but let's be careful and update specific fields if needed, or just do a global replace.
  let str = JSON.stringify(obj, null, 2);
  str = str.replace(/Monsaraz Castle/g, 'Centro Histórico de Évora');
  str = str.replace(/Castelo de Monsaraz/g, 'Centro Histórico de Évora');
  str = str.replace(/蒙萨拉斯城堡/g, '埃武拉历史中心');
  
  obj = JSON.parse(str);

  // Update specific fields
  if (obj.hero) {
    obj.hero.rating = "4.5";
    obj.hero.reviewCount = "5,589";
  }
  
  if (obj.basicInfo) {
    if (isZh) {
      obj.basicInfo.addressValue = "Praça do Giraldo, Jardim Diana, 7000-661 Évora, 葡萄牙";
      obj.basicInfo.plusCodeValue = "H3CR+86 埃武拉葡萄牙";
      obj.basicInfo.typeValue = "旅游胜地";
    } else {
      obj.basicInfo.addressValue = "Praça do Giraldo, Jardim Diana, 7000-661 Évora, Portugal";
      obj.basicInfo.plusCodeValue = "H3CR+86 Évora, Portugal";
      obj.basicInfo.typeValue = "Tourist Attraction";
    }
  }

  if (obj.mapSection) {
    if (isZh) {
      obj.mapSection.subtitle = "Praça do Giraldo, Jardim Diana, 7000-661 Évora, 葡萄牙";
    } else {
      obj.mapSection.subtitle = "Praça do Giraldo, Jardim Diana, 7000-661 Évora, Portugal";
    }
  }

  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

updateJson('src/messages/zh.json', true);
updateJson('src/messages/en.json', false);
console.log('Done');