import 'react-toolbox/lib/commons.scss';
import '../styles/_theme.scss';
import React from 'react';
import Header from './Header';
import { Layout, Panel } from 'react-toolbox';

const PageLayout = (props) => {
    return (
        <Layout>
            <Panel>
                <Header />
                {React.cloneElement(props.children, props)}
            </Panel>
        </Layout>
    );
};

export default PageLayout;