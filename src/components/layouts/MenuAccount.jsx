import { Link } from 'react-router-dom';

function MenuAccount() {
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link
                  data-toggle="collapse"
                  data-parent="#accordian"
                  to="/account/member"
                >
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  Update User
                </Link>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link
                  data-toggle="collapse"
                  data-parent="#accordian"
                  to="account/product"
                >
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  My Products
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAccount;
