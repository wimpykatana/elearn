import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Header />
                ini content
                <Footer />
            </div>
        )
    }
}
  
export default Home;
