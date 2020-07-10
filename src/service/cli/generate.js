'use strict';
const fs = require(`fs`).promises;
const chalk = require('chalk');
const {getRandomInt, shuffle, getPictureFileName, readContent} = require(`../utils.js`);
const { read } = require('fs');

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_TITLES_PATH = `../data/titles.txt`;
const FILE_SENTENCES_PATH = `../data/sentences.txt`;
const FILE_CATEGORIES_PATH = `../data/categories.txt`;


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


const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const [count] = args;
    const countOffer = (!isNaN(Number.parseInt(count, 10)) && count > 0 && count <= 1000) ? Number.parseInt(count, 10) : DEFAULT_COUNT; 
    const content = JSON.stringify(generateOffers(countOffer, sentences, titles, categories));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`)); 
    }
    catch (err) {
      console.error(chalk.red(`Can't write data to file`))
    }
  }
};
