import React from 'react'

function Navigation({back, fwd}) {
  return (
    <div className="row">
      <div className="col-10 offset-1 col-lg-8 offset-lg-2 my-3">
        <div className="row">
          <div className="col-6">
            <button className="btn btn-danger rounded-circle" onClick={back}>
              <i className="fas fa-arrow-up" />
            </button>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-primary rounded-circle" onClick={fwd}>
              <i className="fas fa-arrow-down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation
