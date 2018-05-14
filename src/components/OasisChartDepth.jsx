import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import charts from './../store/selectors/charts';

import {Line} from 'react-chartjs-2';
import {tooltipContainer} from './OasisChart';
import BigNumber from 'bignumber.js';

const propTypes = PropTypes && {
  depthChartLabels: PropTypes.array.isRequired,
  depthChartValues: PropTypes.shape({
    buy: PropTypes.array.isRequired,
    sell: PropTypes.array.isRequired,
  }).isRequired,
  depthChartTooltips: PropTypes.shape({
    buy: PropTypes.object.isRequired,
    sell: PropTypes.object.isRequired,
  }).isRequired,
  tradingPair: PropTypes.shape({
    baseToken: PropTypes.string.isRequired,
    quoteToken: PropTypes.string.isRequired,
  }).isRequired,
};
const defaultProps = {};

export class OasisChartDepth extends PureComponent {
  render() {
    return (
      <Line
        data={{
          labels: this.props.depthChartLabels,
          datasets: [{
            label: 'Buy',
            data: this.props.depthChartValues.buy,
            backgroundColor: 'rgba(38, 166, 154, 0.2)',
            borderColor: 'rgba(38, 166, 154, 1)',
            borderWidth: 3,
            // fill: false,
            pointStyle: 'circle',
            pointRadius: 3,
            pointBorderWidth: 1,
            pointBorderColor: '#1ABC9C',
            pointBackgroundColor: '#1ABC9C',
            hoverBackgroundColor: '#1ABC9C',
            hoverBorderColor: '#1ABC9C',
            hoverBorderWidth: 5,
            steppedLine: true,
            invertedStep: true,
          },
          {
            label: 'Sell',
            data: this.props.depthChartValues.sell,
            backgroundColor: 'rgba(239, 83, 80, 0.2)',
            borderColor: '#EF5350',
            borderWidth: 3,
            // fill: false,
            pointStyle: 'circle',
            pointRadius: 3,
            pointBorderWidth: 1,
            pointBorderColor: '#EF5350',
            pointBackgroundColor: '#EF5350',
            hoverBackgroundColor: '#EF5350',
            hoverBorderColor: '#EF5350',
            hoverBorderWidth: 5,
            steppedLine: true,
          }],
        }}
        options={{
          layout: {
            padding: 5,
          },
          tooltips: {
            enabled: false,
            mode: 'index',
            position: 'nearest',
            custom: (tooltip) => {
              const tooltipEl = tooltipContainer(tooltip, document.getElementsByClassName("chartjs-render-monitor")[0]);
              if (tooltipEl && tooltip.body) {
                const price = tooltip.dataPoints[0].xLabel;
                let type = null;
                let quoteAmount = null;
                let baseAmount = null;
                let typeIndex = 0;
                tooltip.dataPoints.forEach((object, key) => {
                  if (object.y === tooltip.caretY) {
                    typeIndex = key;
                  }
                });
                [type, quoteAmount] = tooltip.body[typeIndex].lines[0].split(': ');
                if (type === 'Sell') {
                  quoteAmount = this.props.depthChartTooltips.sell[price].quote;
                  baseAmount = this.props.depthChartTooltips.sell[price].base;
                } else {
                  quoteAmount = this.props.depthChartTooltips.buy[price].quote;
                  baseAmount = this.props.depthChartTooltips.buy[price].base;
                }

                tooltipEl.innerHTML =
                  `<div class="row-custom-tooltip">
                    <span class="left">Price</span>
                    <span class="right">${new BigNumber(price).toFormat(4)}</span>
                  </div>
                  <div class="row-custom-tooltip middle">
                    <span class="left">SUM(${this.props.tradingPair.quoteToken})</span>
                    <span class="right">${quoteAmount}</span>
                  </div>
                  <div class="row-custom-tooltip">
                    <span class="left">SUM(${this.props.tradingPair.baseToken})</span>
                    <span class="right">${baseAmount}</span>
                  </div>`;

                tooltipEl.style.opacity = 1;
              }
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            xAxes: [{
              display: false,
            }],
          },
        }}
      />
    );
  }
}

export function mapStateToProps(state, props) {
  return {
    depthChartLabels: charts.depthChartLabels(state, props),
    depthChartValues: charts.depthChartValues(state, props),
    depthChartTooltips: charts.depthChartTooltips(state, props),
  };
}

export function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

OasisChartDepth.displayName = 'OasisChartDepth';
OasisChartDepth.propTypes = propTypes;
OasisChartDepth.defaultProps = defaultProps;
export default connect(mapStateToProps)(OasisChartDepth);
