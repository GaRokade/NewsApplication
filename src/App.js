import React, { Component } from "react";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";
import News from "./components/News.js";
import Sports from "./components/sports.js";
import General from "./components/General.js";
import Home from "./components/Home.js";
import Science from "./components/Science.js";
import Newsh from "./components/Newsh.js";
import Entertain from "./components/Entertain.js";
import Technology from "./components/Technology.js";
//import News setProgress={this.setProgress} from './components/News setProgress={this.setProgress}'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom';
export default class App extends Component {
  pageSize = 5;
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <>
        <div>
          <BrowserRouter>
            <Navbar />
            <LoadingBar
              height={3}
              color="#f11946"
              progress={this.state.progress}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    setProgress={this.setProgress}
                    pageSize={this.pageSize}
                    country="in"
                    category="home"
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <News
                    setProgress={this.setProgress}
                    pageSize={this.pageSize}
                    country="in"
                    category="home"
                  />
                }
              />
              <Route
                path="/business"
                className="nav-link acrive"
                element={
                  <News
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="business"
                    country="in"
                    category="business"
                  />
                }
              />
              <Route
                path="/sports"
                element={
                  <Sports
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="sports"
                    country="in"
                    category="sports"
                  />
                }
              />
              <Route
                path="/science"
                element={
                  <Science
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="science"
                    country="in"
                    category="science"
                  />
                }
              />
              <Route
                path="/technology"
                element={
                  <Technology
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="technology"
                    country="in"
                    category="technology"
                  />
                }
              />
              <Route
                path="/general"
                element={
                  <General
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="general"
                    country="in"
                    category="general"
                  />
                }
              />
              <Route
                path="/health"
                element={
                  <Newsh
                    setProgress={this.setProgress}
                    pageSize={5}
                    // key="health"
                    // country="in"
                    // category="health"
                  />
                }
              />
              <Route
                path="/entertainment"
                element={
                  <Entertain
                    setProgress={this.setProgress}
                    pageSize={5}
                    key="entertainment"
                    country="in"
                    category="entertainmen"
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </>
    );
  }
}
