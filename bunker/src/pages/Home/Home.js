// This page can be accessed by anyone including guests

import React, { Component } from "react";

//Components
import SearchFilterBar from './components/SearchFilterBar';
import ListingBase from './components/ListingBase';
import { Divider, Grid, Segment } from 'semantic-ui-react'

// Backend functionalities
import { withFirebase } from '../../server/Firebase/index';

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
            <SearchFilterBar/>
                <Segment>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <ListingBase />
                        </Grid.Column>
                        <Grid.Column>
                            insert maps here
                        </Grid.Column>                    
                    </Grid>
                    <Divider vertical></Divider>
                </Segment>
            </div>
        );
    }
}


export default withFirebase(HomePage)
