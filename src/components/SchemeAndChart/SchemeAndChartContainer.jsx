import React from "react";
import SchemeContainer from "./Scheme/SchemeContainer";
import ChartContainer from "./Chart/ChartContainer";
import {connect,} from 'react-redux';
import * as axios from "axios";
import {setEquipsDbData,} from "../../redux/schemeAndChart-reducer";
import Loader from "../Common/Loader/Loader";

class SchemeAndChartContainer extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:8000/api/equipments').then((response) => {
      this.props.setCvValvesAC(response.data);
    });
  }

  render() {
    return (
      <>
        {/*{this.props.isFetching ? <Loader /> : null}*/}
        <Loader />
        <div>
          <SchemeContainer/>
          <ChartContainer/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.schemeAndChart.isFetching,
});
const mapDispatchToProps = {
  setCvValvesAC: setEquipsDbData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemeAndChartContainer);