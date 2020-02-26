import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import Listuser from '../Component/dashboard/user';

const brandDanger = getStyle('--danger')

var data1 = [0,30,10,10,47,90,200,90,80,90,100,0,30,10,10,47,90,200,90,80,90,55,11,25,67,68,23,100,20,26,60];

const mainChart = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28','29','30','31'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandDanger, 10),
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    }
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-danger">
              <CardBody className="">
                <div>Published Video</div>
                <div className="text-value">9.823</div>
                
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-success">
              <CardBody className="">
                <div>Published Article</div>
                <div className="text-value">9.823</div>
                
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-primary">
              <CardBody className="">
                <div>Total Certification</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-warning">
              <CardBody className="">
                <div>User Get Certification</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-info">
              <CardBody className="">
                <div>Published Thesis</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-info">
              <CardBody className="">
                <div>Published Thesis</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-danger">
              <CardBody className="">
                <div>Total User</div>
                <div className="text-value">9.823</div>
                
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-primary">
              <CardBody className="">
                <div>User Online</div>
                <div className="text-value">9.823</div>
                
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-success">
              <CardBody className="">
                <div>New User</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-warning">
              <CardBody className="">
                <div>Page View</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-info">
              <CardBody className="">
                <div>Facebook</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white bg-danger">
              <CardBody className="">
                <div>Instagram</div>
                <div className="text-value">9.823</div>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Listuser />
        
      </div>
    );
  }
}

export default Dashboard;
