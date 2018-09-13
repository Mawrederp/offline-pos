import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  *, ::before, ::after {
      box-sizing: content-box;
  }

  html {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  input[type="number"],input.num-input{
    direction: ltr !important;
  }
  
  body{
  }
  html[dir="rtl"] .material-icons {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
  body, h1, h2, h3, h4, h5, h6 {
    font-size: 15px;
    margin: 0;
    line-height: 24px;
  }

  body {
    margin: 0;
    background-color: #F5F5F5;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  body::-webkit-scrollbar, *::-webkit-scrollbar {
      width: 0.8em;
      height: 0.8em;
  }

  body::-webkit-scrollbar-track, *::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  body::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  body::-webkit-scrollbar {
      width: 1em;
  }

  a {
    color: #ff4081;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .m-b-15 {
    margin-bottom: 15px
  }

  .menu-text-color svg, .card-open-close-icon svg {
    color: #ffffff !important;
  }

  .lightTheme .open-views-menu .menu-text-color svg,
  .lightTheme .views-menu .menu-text-color svg {
    color: #717171 !important;
  }

  #header-close-tabs .close-tab:hover > div::after {
      content: 'X';
      position: absolute;
      color: white;
      top: -4px;
      right: 10px;
      -webkit-transform:scale(1.3, 1.0);
      -moz-transform:scale(1.3, 1.0);
      -ms-transform:scale(1.3, 1.0);
      -o-transform:scale(1.3, 1.0);
      transform: scale(1.3,1.0);
      font-weight: 100;
      cursor: default;
  }

  .lightTheme #header-close-tabs .close-tab:hover > div::after {
      color: #717171;
  }

  .list-item > div > div {
    margin-left: 0px !important;
    padding: 16px 16px 16px 50px !important;
    
  }

  .open-views.list-item span:nth-last-child(2) {
    color: transparent !important;
  }

  .open-views.list-item:hover span:nth-last-child(2) {
    color: #ffffff !important;
    cursor: default;
  }

  .lightTheme .open-views.list-item:hover span:nth-last-child(2) {
    color: #717171 !important;
  }

  .list-item span {
    color: #ffffff !important;
  }

  .darkTheme .list-item svg {
    fill: rgb(117, 117, 117) !important;
  }

  .darkTheme .list-item span {
    color: rgb(117, 117, 117) !important;
  }

  .darkTheme .list-item.selected span {
    color: #ffffff !important;
  }

  .lightTheme .list-item svg {
    fill: rgb(113, 113, 113) !important;
  }

  .lightTheme .list-item span {
    color: rgb(113, 113, 113) !important;
  }

  .lightTheme .list-item.selected span {
    color: #ffffff !important;
  }

  .blueTheme .list-item svg {
    fill: rgb(192, 223, 245) !important;
  }

  .blueTheme .list-item span {
    color: rgb(192, 223, 245) !important;
  }

  .blueTheme .list-item.selected span {
    color: #ffffff !important;
  }

  .grayTheme .list-item svg {
    fill: rgb(233, 233, 234) !important;
  }

  .grayTheme .list-item span {
    color: rgb(233, 233, 234) !important;
  }

  .grayTheme .list-item.selected span {
    color: #ffffff !important;
  }

  .darkBlueTheme .list-item svg {
    fill: rgb(180, 188, 200) !important;
  }

  .darkBlueTheme .list-item span {
    color: rgb(180, 188, 200) !important;
  }

  .darkBlueTheme .list-item.selected span {
    color: #ffffff !important;
  }

  .transition-animation-enter {
    opacity: 0.01;
  }

  .transition-animation-enter.transition-animation-enter-active {
    opacity: 1;
    transition: opacity 100ms ease-in;
  }

  h3 {
      font-size: 1.25em;
      line-height: 1.4;
      margin-top: 1em;
      margin-bottom: 16px;
      font-weight: 400;
  }

  #header-close-tabs {
    overflow-x: hidden !important;
  }

  #header-close-tabs:hover  {
    overflow-x: auto !important;
  }

  @media screen and (max-width: 768px) {
    #header-close-tabs, .header-apps {
      display: none !important;
    }
  }

  #login-form input {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  /* Image Gallery */
  .app-header {
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .play-button {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 60px;
    width: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
  }

  .play-button:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  .play-button:after {
    content: "";
    display: block;
    position: absolute;
    top: 16.5px;
    left: 40px;
    margin: 0 auto;
    border-style: solid;
    border-width: 12.5px 0 12.5px 20px;
    border-color: transparent transparent transparent rgba(255, 255, 255, 1);
  }

  .close-video::before {
    content: '✖';
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    padding: 20px;
    z-index: 1;
    line-height: .7;
    display: block;
    color: #fff;
  }

  .video-wrapper {
    position: relative;
    padding: 33.35% 0; /* 16:9 */
    height: 0;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .app .image-gallery,
  .app-sandbox {
    margin: 0 auto;
    width: 65%;
    transition: all 1s ease;
  }


  @media (max-width: 1320px) {
    .app-sandbox-content {
      padding: 0 20px;
    }
  }

  .app-sandbox {
    margin: 40px auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .app-buttons li {
    display: block;
  }

  @media (max-width: 768px) {

    .app-header {
      font-size: 20px;
    }

    .app-buttons li {
      display: block;
      margin: 10px 0;
    }

    .app-buttons li + li {
      padding: 0;
    }

    .play-button {
      height: 40px;
      width: 65px;
    }

    .play-button:after {
      top: 11px;
      left: 27px;
      border-width: 8.5px 0 8.5px 12px;
    }

    .close-video::before {
      font-size: 16px;
      padding: 15px;
    }
  }

  @media (max-width: 1024px) {
    .app .image-gallery,
    .app-sandbox {
      width: 100%;
    }
  }

  .app-interval-input-group {
    display: table;
  }

  .app-interval-label {
    display: table-cell;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 3px solid #ccc;
    border-right: none;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .app-interval-input {
    -webkit-appearance: none;
    display: table-cell;
    margin: 0;
    padding: 9px;
    border-radius: 5px;
    font-size: 14px;
    border: 3px solid #ccc;
    background: #fff;
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  input.app-interval-input {
    width: 65px;
  }

  .app-checkboxes {
    margin-top: 10px;
  }

  .app-checkboxes li {
    display: block;
  }

  .left-drawner > div {
    overflow: hidden !important;
  }

  .open-views-menu > div > div {
      max-height: 200px;
      overflow-y: auto;
  }

  .open-views-menu.desktop-browser > div > div {
      overflow-y: hidden;
  }

  .open-views-menu.desktop-browser > div > div:hover {
    overflow-y: auto;
  }

  .views-menu > div > div {
      overflow-y: auto;
  }

  .views-menu.desktop-browser > div > div {
      overflow-y: hidden;
  }

  .views-menu.desktop-browser > div > div:hover {
      overflow-y: auto;
  }

  .list-item {
    height: 48px;
    opacity: 1.0;
    transition: height 100ms 0ms, opacity 100ms 0ms; !important;

  }
  .list-item.hide {
    transition: height 200ms 200ms, opacity 100ms 0ms; !important;
    height: 0px;
    opacity: 0.0;
  }

  .layout-boxed {
      box-sizing: border-box;
      max-width: 1200px;
      margin: 0 auto;
  }

  .layout-boxed .left-drawner > div {
    left: auto !important;
  }
  .left-drawner  .material-icons:first-child{
    right:-20px !important;
  }
  
  .left-drawner .drawer-toolbar .material-icons{
    right:0px !important;
    width:100%;
  }

  .left-drawner.close div {
    display: none;
  }

  .main-container {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }

  .header span.material-icons,
  .cart span.material-icons{
    width:100%;
  
  }
  .left-drawer *:not(.drawer-toolbar) span.material-icons{
    right:-24px;
  }

  .monthly-sales .recharts-label-list text {
    fill: #ffffff;
  }


.mainButtonMatrix {
    background-color: #eee;
    height: 100%;
    width: 75%;
}

.sideButtonMatrix {
    background-color: #eee;
    height: 100%;
    width: 25%;
}

.buttons {
    display: flex;
    height: 70%;
    width: 100%;
}

.screen {
    width: 100%;
    background-color: white;
    color: #9E9E9E;
    font-weight: 100;
}

.buttonRow {
    width: 100%;
    display: flex;
}
    
.buttonRow .material-icons{
  margin-right: -13px
}

.screenSpaceLine {
    width: 100%;
    height: 32%;
}

.screenMainLine {
    height: 36%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 8.5vh;
    overflow: hidden;
    padding: 0 2%;
}

.screenSecondLine {
    height: 32%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 5vh;
    padding: 0 2%;
}
.m-b-5{
  margin-bottom:5px !important;
}
.cart .search-box{
  height:48px !important;
}
.search-box input {
  margin : 0px 0px 0px 0px !important;
}
.cart .search-box label{
  top:18px !important;
}

.cart div.search-box > div:nth-child(2){
  bottom:9px !important;
}
.screen.payment:hover{
  background-color:#eee;
}

.text-center{
  text-align:center !important;
}

.text-center input{
  text-align:center ;
}

.payment-value{
  vertical-align:sup;
  padding:10px;
  padding-bottom:0px;
  margin-bottom:1px;
  background-color:#fafafa
}

.payment-value.selected{

}

//cart list
.header-item{
  padding: 0px;
  height: 3vh;
  vertical-align: super;
}
.cart-state .header-item{
  height:5vh;
}
//products/items grid
.items-tile>div:nth-child(2) {
  height: 87px !important;
}

.items-tile-title{
  line-height: 10px;
  padding: 2px;
  margin: 2px;
  text-indent: 12px;
}

.items-tile{
  cursor:pointer;
}

input[type=number].no-spinners::-webkit-inner-spin-button, 
input[type=number].no-spinners::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`;
