'use strict';
const fs = require(`fs`);
const {getRandomInt, shuffle, getPictureFileName} = require(`../utils.js`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};


const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = (!isNaN(Number.parseInt(count, 10)) && count > 0 && count <= 1000) ? Number.parseInt(count, 10) : DEFAULT_COUNT; 
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(`${FILE_NAME}`, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file`);
      }
      return console.info(`Operation success. File created.`);
    });

  }
};
