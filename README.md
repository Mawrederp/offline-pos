# pos-offline

# About OPOS

this system is a point of sale system that is built to work both online and offline . the front end made with _**react.js**_  and packed with _**webpack.js**_ . written in _**es6**_ utilizing _**react-boilerplate**_ for the frontend file structure and basic configurations and _**material-ui**_ as its basic ui components . alongside a local store that is based on _**redux**_ with a _**redux-saga**_ as its asynchronouse actions layer , which uses _**pouchdb.js**_ as a local database that can be synced on demand.


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




