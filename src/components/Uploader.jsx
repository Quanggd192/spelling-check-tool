import React, { useState } from "react";

class Uploader extends React.Component {
  state = {
    file: null,
    base64URL: "",
    src: "",
  };
  getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      reader.onloadend = () => {
        this.setState({
          src: reader.result,
        });
      };
      console.log(fileInfo);
    });
  };

  handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        this.props.onUploadImage(result);
        this.setState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0],
    });
  };

  render() {
    return (
      <div>
        <input
          className="upload-button"
          type="file"
          name="file"
          onChange={this.handleFileInputChange}
        />
        <br />
        <img className="upload-image" src={this.state.src} />
      </div>
    );
  }
}

export default Uploader;
