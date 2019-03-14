import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { orange600, cyan600, purple600, red300 } from 'material-ui/styles/colors';

const data = {
  menus: [
    { id: 'app.pages.dashboard', text: 'الرئيسية', icon: <FontIcon className="material-icons">home</FontIcon>, url: '/', index: 0 },
    { id: 'app.pages.checkout', text: 'تخليص الحسابات', icon: <FontIcon className="material-icons">payment</FontIcon>, url: '/checkout', index: 0 },
    // { id: 'OpenRegistry', text: 'فتح الصندوق', icon: <FontIcon className="material-icons">assessment</FontIcon>, url: '/open-registry', index: 0 },
    // { id: 'closeRegistry', text: 'اغلاق الصندوق', icon: <FontIcon className="material-icons">assessment</FontIcon>, url: '/close-registry', index: 0 },
    { id: 'app.pages.productsManagement', text: 'ادارة الاصناف', icon: <FontIcon className="material-icons">store</FontIcon>, url: '/products-management', index: 0 },
     { id: 'app.pages.historyManager', text: 'ادارة التاريخ', icon: <FontIcon className="material-icons">history</FontIcon>, url: '/history-manager', index: 0 },
  ],
  dashBoardPage: {
    recentProducts: [
      { id: 1, title: 'Samsung Galaxy S7', text: 'Samsung Galaxy S7 G930F 32GB Factory Unlocked GSM Smartphone International Version (Gold)' },
      { id: 2, title: 'Sony Xperia XZ', text: 'Sony Xperia XZ - Unlocked Smartphone - 32GB - Platinum (US Warranty)' },
      { id: 3, title: 'ACER R240HY 23.8-Inch', text: 'Acer R240HY bidx 23.8-Inch IPS HDMI DVI VGA (1920 x 1080) Widescreen Monitor' },
      { id: 4, title: 'Dell 15.6-Inch Gaming123 Laptop', text: 'Dell 15.6-Inch Gaming Laptop (6th Gen Intel Quad-Core i5-6300HQ Processor up to 3.2GHz, 8GB DDR3, 256GB SSD, Nvidia GeForce GTX 960M, Windows 10)' },
      { id: 5, title: 'Dell 15.6-Inch Gaming 321', text: 'Dell 15.6-Inch Gaming Laptop (6th Gen Intel Quad-Core i5-6300HQ Processor up to 3.2GHz, 8GB DDR3, 256GB SSD, Nvidia GeForce GTX 960M, Windows 10)' },
      { id: 6, title: 'Dell 15.6-Inch Gaming 12Laptop', text: 'Dell 15.6-Inch Gaming Laptop (6th Gen Intel Quad-Core i5-6300HQ Processor up to 3.2GHz, 8GB DDR3, 256GB SSD, Nvidia GeForce GTX 960M, Windows 10)' },
    ],
    monthlySales: [
      { name: 'Jan', uv: 1800 },
      { name: 'Feb', uv: 2000 },
      { name: 'Mar', uv: 2780 },
      { name: 'Apr', uv: 2000 },
      { name: 'May', uv: 3000 },
      { name: 'Jun', uv: 3700 },
    ],
    newOrders: [
      { name: 'Jan', 'New Orders': 3908 },
      { name: 'Feb', 'New Orders': 3490 },
      { name: 'Mar', 'New Orders': 4800 },
      { name: 'Apr', 'New Orders': 2400 },
      { name: 'May', 'New Orders': 4500 },
      { name: 'Jun', 'New Orders': 7890 },
    ],
    browserUsage: [
      { name: 'التفاح', value: 900, color: orange600, icon: <FontIcon className="material-icons">chevron_right</FontIcon> },
      { name: 'الحليب', value: 700, color: purple600, icon: <FontIcon className="material-icons">chevron_right</FontIcon> },
      { name: 'الخبز', value: 600, color: cyan600, icon: <FontIcon className="material-icons">chevron_right</FontIcon> },
      { name: 'البضائع الاخرى', value: 1000, color: red300, icon: <FontIcon className="material-icons">chevron_right</FontIcon> },

    ],

  },
  currencies: [
    'ريال',
    '$',
    '€',
    '£',
  ],
  products: [
    {
      "_id": "5b4823485a2b463948165a43",
      "index": 0,
      "guid": "0a0f1f71-5fe0-405a-91c0-834f2dc136d0",
      "isActive": false,
      "price": "$2,458.48",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 37,
      "eyeColor": "green",
      "title": "product",
      "company": "DENTREX",
      "SKU": 2828232520293739
    },
    {
      "_id": "5b4823485768186930f8fdca",
      "index": 1,
      "guid": "ddd2b519-51ca-45eb-b21e-20b215b86a22",
      "isActive": false,
      "price": "$3,259.53",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 23,
      "eyeColor": "blue",
      "title": "product",
      "company": "PATHWAYS",
      "SKU": 3821212022232832
    },
    {
      "_id": "5b48234879e6e22938a5d998",
      "index": 2,
      "guid": "dd6fb65a-64aa-4723-a4f3-f3d738facd77",
      "isActive": true,
      "price": "$3,279.54",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 21,
      "eyeColor": "brown",
      "title": "product",
      "company": "OZEAN",
      "SKU": 2528323239364031
    },
    {
      "_id": "5b4823482cca2f3a2fcd6bda",
      "index": 3,
      "guid": "38606d1e-7cc3-48c7-ad0d-cd480fc12c88",
      "isActive": true,
      "price": "$3,800.14",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 36,
      "eyeColor": "brown",
      "title": "product",
      "company": "SULTRAX",
      "SKU": 2535303625263025
    },
    {
      "_id": "5b4823485ff20f38c9140c69",
      "index": 4,
      "guid": "3632a25c-3bdd-493c-87d1-3b31c2f18596",
      "isActive": true,
      "price": "$2,416.60",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 36,
      "eyeColor": "green",
      "title": "product",
      "company": "ZYTREK",
      "SKU": 3120262440303421
    },
    {
      "_id": "5b482348be8df4705ad6271c",
      "index": 5,
      "guid": "ce7c0cce-f1c1-48ed-a160-8c57126f0f6b",
      "isActive": true,
      "price": "$2,760.93",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 20,
      "eyeColor": "blue",
      "title": "product",
      "company": "ANOCHA",
      "SKU": 2431282928312623
    },
    {
      "_id": "5b48234835c852855f013085",
      "index": 6,
      "guid": "5a250e62-9b4b-4a66-be59-3e0f597e8045",
      "isActive": true,
      "price": "$1,598.14",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 27,
      "eyeColor": "brown",
      "title": "product",
      "company": "NEUROCELL",
      "SKU": 3437283037253629
    },
    {
      "_id": "5b482348d6a1e5521e8e7334",
      "index": 7,
      "guid": "985f2464-6c6d-4a14-ac07-189daa3fe991",
      "isActive": true,
      "price": "$1,958.64",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 35,
      "eyeColor": "green",
      "title": "product",
      "company": "titleGEN",
      "SKU": 3635303120252522
    },
    {
      "_id": "5b4823485c130f117b27ad83",
      "index": 8,
      "guid": "ce719740-d50d-401c-a40d-ac016774fda7",
      "isActive": false,
      "price": "$2,624.59",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 25,
      "eyeColor": "brown",
      "title": "product",
      "company": "GENMOM",
      "SKU": 3826332922392833
    },
    {
      "_id": "5b482348beef8b02caefe6b1",
      "index": 9,
      "guid": "2bc8a354-2aa5-433f-a284-dcdf45f86ef0",
      "isActive": true,
      "price": "$3,013.90",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 27,
      "eyeColor": "brown",
      "title": "product",
      "company": "COMDOM",
      "SKU": 2830312036323929
    },
    {
      "_id": "5b4823482e284d0c9b4b83d1",
      "index": 10,
      "guid": "955555cd-5603-4c4e-a39a-c3374bfbcdee",
      "isActive": false,
      "price": "$2,200.45",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 40,
      "eyeColor": "brown",
      "title": "product",
      "company": "GADTRON",
      "SKU": 2932363032302931
    },
    {
      "_id": "5b482348198bd6f2dff8206d",
      "index": 11,
      "guid": "4bc1f2c6-a946-4b30-bbdf-8bd5d4958984",
      "isActive": false,
      "price": "$3,221.50",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 40,
      "eyeColor": "blue",
      "title": "product",
      "company": "JAMNATION",
      "SKU": 3626343422203440
    },
    {
      "_id": "5b48234845b25bb5a0e60825",
      "index": 12,
      "guid": "8b08f463-e263-4bc3-893a-beba567e69a0",
      "isActive": false,
      "price": "$1,075.72",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 37,
      "eyeColor": "brown",
      "title": "product",
      "company": "QUINTITY",
      "SKU": 2727253123382126
    },
    {
      "_id": "5b4823483a1eeeffc4059fc2",
      "index": 13,
      "guid": "e7daa0b8-5405-4bf0-ae6c-b8834fff9e01",
      "isActive": false,
      "price": "$2,531.43",
      "img": "https://loremflickr.com/320/240/vegetable",
      "age": 22,
      "eyeColor": "brown",
      "title": "product",
      "company": "XLEEN",
      "SKU": 2838393529283923
    }
  ]
};

export default data;
