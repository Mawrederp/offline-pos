import React from 'react';
import { cyan500, cyan600, pink500, pink600, purple500, purple600, orange500, orange600 } from 'material-ui/styles/colors';
import InfoBox from '../../components/dashboard/InfoBox';
import NewOrders from '../../components/dashboard/NewOrders';
import MonthlySales from '../../components/dashboard/MonthlySales';
import BrowserUsage from '../../components/dashboard/BrowserUsage';
import RecentlyProducts from '../../components/dashboard/RecentlyProducts';
import Data from '../../data';
import PageBase from '../../components/PageBase';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <PageBase
        navigation=""
        noWrapContent
        loading={this.state.loading}
      >
        <div className="row" style={{ marginTop: 50 }}>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={'thumb_up'}
              color={cyan600}
              iconColor={cyan500}
              title="عمليات الشراءالناجحة"
              value="0"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={'shopping_cart'}
              color={pink600}
              iconColor={pink500}
              title="الربح الكلي"
              value="0"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={'face'}
              color={orange600}
              iconColor={orange500}
              title="الزبائن الجدد"
              value="0"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={'assessment'}
              color={purple600}
              iconColor={purple500}
              title="عدد عمليات البيع"
              value="0"
            />
          </div>

        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <NewOrders data={Data.dashBoardPage.newOrders} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
            <MonthlySales data={Data.dashBoardPage.monthlySales} />
          </div>
        </div>

        <div className="row">
          {/* <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">*/}
          {/* <BrowserUsage data={Data.dashBoardPage.browserUsage} />*/}
          {/* </div>*/}
          {/* <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">*/}
          {/* <RecentlyProducts data={Data.dashBoardPage.recentProducts} />*/}
          {/* </div>*/}
        </div>
      </PageBase>
    );
  }
}

export default DashboardPage;
