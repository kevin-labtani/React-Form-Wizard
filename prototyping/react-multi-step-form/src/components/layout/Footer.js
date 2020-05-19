import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-hu-grey">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-7 col-lg-4 offset-lg-8 mt-3 mb-3">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "35%" }}
              >
                35%
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
