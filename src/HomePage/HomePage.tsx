import React from "react";

const HomePageComponent: React.FC = () => {
  return (
    <div className="row pt-2 pb-2">
      <div className="col-sm">
        <div className="media">
          <img
            src="https://via.placeholder.com/200"
            className="align-self-center mr-3"
            alt="place holder"
          />
          <div className="media-body">
            <h5 className="mt-0">Center-aligned media</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <p className="mb-0">
              Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
              eu leo. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus.
            </p>
          </div>
        </div>
        <div className="media mt-3">
          <div className="media-body">
            <h5 className="mt-0">Center-aligned media</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <p className="mb-0">
              Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
              eu leo. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/200"
            className="align-self-center mr-3"
            alt="place holder"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
