# pos-offline

# About OPOS

this system is a point of sale system that is built to work both online and offline . the front end made with _**react.js**_  and packed with _**webpack.js**_ . written in _**es6**_ utilizing _**react-boilerplate**_ for the frontend file structure and basic configurations and _**material-ui**_ as its basic ui components . alongside a local store that is based on _**redux**_ with a _**redux-saga**_ as its asynchronouse actions layer , which uses _**pouchdb.js**_ as a local database that can be synced on demand.

# The Routes
>the routes apearing on the `leftDrawer` menu, are stated in the `/data.js` file . 
## creating a new Route
  `npm run generate route` or `yarn run generate route` , follow the instructions afterward .
  >more informations can be found in
   [`react-boilerplate/react-boilerplate`](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/commands.md)
##pos Routes
  the `routes.js` file has the navigation and dependencies injection necessary for each route.
  go read it to know more about what routes are available for you to enable in the `data.js` file.
### notes to take when adding a new route
1. if they are not in `data.js` they wont apear in the `leftDrawer` menu.
  
2. the menu id should follow `app.pages.{routename}` convention, -*you should observe the previous routes*- . and thats because you will need to add a translation using that id in the `translations` folder locales (en.json, ar.json). for that route name to be modified in multiple languages .
3. the reason why the routes are stated in the `data.js` file . is because later on the allowed routes for users may vary . and that information will have to be moved to its own storage . either in the user object you get after login or some other place.  

# Bussiness logic 
>here i'll segment the bussiness logic relative to app interfaces 
  ## login
    user should login if he has an account ... pretty straight forward right ? nope. atleast in its final form . the point of sale should verify if the user is authorized to login from that tenant or not . 
  ## register
    this interface should be seperated into two new main interfaces 
    1. crud for users (the actual employees)
    2. crud for the customers (the customers)
    >both of these interfaces have pretty common features . your job to make it as dry(dont repeat yourself) as possible.
  ## dashboard
    you should revise with the project manager aka abu fares on what should apear in this interface . 
  ## checkout
    ### 1. `checkoutBench/index.js`
       no desc provided revise the code.
    ### 2. `paymentModal/index.js`
    no desc provided revise the code.
    ### 3. `invoiceReport/index.js`
    no desc provided revise the code.
  ## Products management 
    `productsManagement/index.js` this is the container that has the two previously mentioned components . what you need to understand is . any action that affects the global state of the app should be made as a function here . then passed to the corresponding component of the child components . ooh 
    and go read the file to know exactly how it propagates actions . 
   ### 1. `items/index.js`
      > 1. now this component will include barcode into its search as soon as it gets implemented to the system . 
      > 2. this component is redundunt (has a lot of shared code with the component `checkoutBench/index.js` . work your way into making it dry . > 3. if the products size is less than 7 . it will display them in 2 columns rather than 7 . (can you make it responsive friendly pls?)
      > 4.there is no paging whatsoever . if you have 1000 products they will be rendered . after making the generic component shared between `items.js` and `checkoutBench.js` go for making the products lazy load  . 
    
  ### 2. `productsModal/index.js`
    it has forms . to create/edit the product . your role is to comeup with a mechanism to validate those forms .   
# Install Requirements

to run this project you need to have your package manager of choice out of _**npm/yarn**_ while yarn is the one used during the early development of this project . thats it.
## installation

 1. first you need the project files . 

    `$ git clone http://path-to-this-repo@github.com`
    

 2. install the packages . and wait for the webpack dll to build
 
    `$ npm i` or `$ yarn` _whatever suits you ..._

 3. start the project for a first test run
	- for development 
		 `$ npm run start` or `$ yarn start` 
	- for production
	 	 `$ npm run start-prod` or `$ yarn start-prod` 



## what you need to know before attempting to collaborate in this project is :
  > ***Attention***: there are thre places where your expertise may vary 
  >  yet you can distribute loads according to what you already know . and 
  >  what you're willing to learn. but it all comes down to being fluent in Js 
  >  and mainly es6, hence because this project was written  by it. when you need something concerning the app structure and how it works . consult [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), for material-ui tho,most of the components if not all use  [`material-ui @0.20.1`](https://v0.material-ui.com/#/components/list), read that to know how their components api works. hence _am not using their `withStyles`_ thingy and i manipulate the styles mainly from `/global-styles.js` file .
 
 1. React.js (components , pureComponents , lifecycle , Composed Components ,Hoc)
 2. react router v3. (and if you're free you can tinker how to update to v4 without breaking the universe)
 3. Redux & Redux-saga (containers , enhancers)
 4. PouchDb (map/reduce ? , mongo-find) (how indexing work?) (how sync work) (why cant we edit) (how to avoide conflicts)

## Files Structure 

 >For basic structure . see [`react-boilerplate/react-boilerplate`](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md) documentation.
 
 ### how i go over the components and how they should look like in the near future 
 

 - all the presentation components are in `app/components` directory
 - all the containers _(components that have logic and pass data)_ are in `app/containers`.
 - idealy components that are contained by a container should be in a folder carrying its name . for example a container with the name `Auth` contains components from `app/components/Auth` directory. when you see any inconsistancies with this rule . make an effort to apply it .  

 

## How localization work

### 1. react-intl
#### making a localized component 
	you can only give the localization ability to a component in two ways 
	
 1. by injecting a prop with the name `intl` using the _HOC_ `injectIntl` like this :
	 ```javascript
		 import React from 'react';
		 import {injectIntl} from 'react-intl';
		class MyComponent extends React.Component {
			render(){
				const {intl} =this.props
				return (intl.formatMessage({id:'message.key.in.locale.json.file'}));
			}
		}
		export injectIntl(MyComponent);
	```
2. by using `react-intl`  [_built-in components_](https://github.com/yahoo/react-intl/wiki/Components)
#### example:
```javascript
		 import React from 'react';
		 import {FormattedMessage} from 'react-intl';
		class MyComponent extends React.Component {
			render(){
				const {intl} =this.props
				return(
					<FormattedMessage id='message.key.in.locale.json.file' />
				);
			}
		}
		export (MyComponent);
```
### 2. mui rtl
>by default mui is configured to convert render its components in `RTL` . this means that all the css rules you give to any component through react . will flip the right and left of that css . for example . if you give an element 
`style={{right:0}}` the output will be `style={{left:0}}` .
so watchout . further enhancements could be made . like working on two project configurations where we compile a special version for bidirectional  or ltr only languages.
### 3. adding a custom language
see [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate/blob/98f5c0e5bc54a5540466515e38dea9e9cb752019/docs/js/i18n.md) translations docs. 

## How database sync work

### 1.pouchdb
### 2.storage
### 3.basic flow
## base page
### how its working 
### how it should work



