import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="p-5 width-50-center">

        {/* <div
          style={{
            float: "left",
            fontFamily: "Arial",
            fontSize: "12pt",
            color: "#fff",
            backgroundColor: "white",
            width: 150,
            height: 50,
            padding: 3,
            verticalAlign: "top"
          }}
        >
          <a href="http://ssscompanies.com/">
            <img
              src="http://www.ssccompanies.com/wp-content/uploads/ssc-mail-logo.jpg"
              style={{ maxWidth: "100%" }}
              alt="SSC Companies Logo"
            />
          </a>
        </div> */}
                <table align="center">
            <tbody>
              <tr>
                <td style={{ fontSize: 24, fontWeight: "bold" }}>
                  BNB Movies
                </td>
              </tr>

              <tr>
                <td style={{ color: "#c4a95f" }}>
                  Phone:{" "}
                  <span
                    style={{ textDecoration: "none", color: "#1b1464" }}
                  >
                    01-992880988
                  </span>{" "}
                  | Mobile:{" "}
                  <span
                    style={{ textDecoration: "none", color: "#1b1464" }}
                  >
                    9868721004
                  </span>{" "}
                </td>
              </tr>
              <tr>
                <td style={{ color: "#c4a95f" }}>
                  Address:{" "}
                  <a
                    href="https://goo.gl/maps/LEd2QSFT14U2"
                    style={{
                      textDecoration: "none",
                      color: "#1b1464",
                      paddingBottom: 25
                    }}
                    target="_blank"
                  >
7th Floor Civil Mall, Sundhara, <br />
 Kathmandu, Nepal
                  </a>
                </td>
              </tr>
              <tr>
                <td valign="top">
                  <a
                    href="http://www.bnbmovies.com"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    www.bnbmovies.com
                  </a>
                </td>
              </tr>
              <tr>
                {/* Social Icons found here: https://www.flaticon.com/packs/social-media-color */}
                <td>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      height: 15
                    }}
                  >
                    <li style={{ display: "inline-block", marginTop: 15 }}>
                      <a href="#">
                        <img
                          src="http://www.ssccompanies.com/wp-content/uploads/rrss_fb.png"
                          style={{ width: 25 }}
                          alt="Become friends on Facebook."
                        />
                      </a>
                    </li>
                    <li style={{ display: "inline-block" }}>
                      <a href="#">
                        <img
                          src="http://www.ssccompanies.com/wp-content/uploads/rrss_ig.png"
                          style={{ width: 25 }}
                          alt="Follow us on Instagram!"
                        />
                      </a>
                    </li>
                    <li style={{ display: "inline-block" }}>
                      <a href="#">
                        <img
                          src="http://www.ssccompanies.com/wp-content/uploads/rrss_in.png"
                          style={{ width: 25 }}
                          alt="Connected with me on LinkedIn!"
                        />
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default Contact;
