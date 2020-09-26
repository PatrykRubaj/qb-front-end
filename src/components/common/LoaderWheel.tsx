import React from "react";
import "./LoaderWheel.css";

interface Props {
  title: string;
  description: string;
}

const WarningDialog: React.FC<Props> = (props: Props) => {
  const { title, description } = props;

  return (
    <div className="row pt-2 pb-2 justify-content-center">
      <div className="col-sm-12 col-md-5 justify-content-center">
        <div className="mt-4 loader" style={{ margin: "0 auto" }}></div>
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default WarningDialog;
