import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Drawer, Card, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import authActions from "../redux/auth/actions";
import { Redirect } from 'react-router-dom';

import AddProject from './AddProject';

const { getProject } = authActions;

const Home = (props) => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const { token, posts } = props.auth;
  const { getProject } = props
  useEffect(() => {
    if (token !== null) {
      getProject(token);
    }
  }, [getProject, token]);

  if (token === null) {
    return (<Redirect to="/login" />)
  } else {
    return (
      <section className="home-layout">
        <header className="header">
          <div className="header-container">
            <div className="container flex-x align-center">
              <div className="header-logo flex-1">
                <NavLink to="/home">LOGO</NavLink>
              </div>
              <div className="header-logo">
                <Button type="primary" size="large" onClick={() => setOpenDrawer(true)}>Add Project</Button>
              </div>
            </div>
          </div>
        </header>
        <Drawer title="Add Project"
          bodyStyle={{ paddingBottom: 80 }}
          visible={openDrawer}
          onClose={() => setOpenDrawer(false)}
          width={720}>
          <AddProject />
        </Drawer>
        <main className="main-content">
          <Row gutter={16} style={{padding: "20px"}}> 
          {
            posts.map(d => (
              <Col span={6}>
                  <Card 
                  key={d.id}
                  title={d.id} 
                  bordered={false} 
                  cover={<img alt="example" src={'https://aiot-nodejs.herokuapp.com/'+ d.attachment} />}
                  style={{ width: 300 }}>
                    <p>{d.description}</p>
                    <p>{d.title}</p>
                    <p>{d.type === 0 ? 'OneTime' : 'Hourly'}</p>
                  </Card>
              </Col>
              )) 
            }
          </Row>
        </main>
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    auth: {
      loader: state.auth.loader,
      token: state.auth.token,
      posts: state.auth.posts,
    }
  };
};

export default compose(connect(mapStateToProps, { getProject }))(Home)
