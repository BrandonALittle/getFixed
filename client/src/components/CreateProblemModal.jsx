import React from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%'
  }
};

class CreateProblemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      name: '',
      description: '',
      dropzoneView: true,
      cloudinaryUrl: ''
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.closeMainModal();
  }

  handleDrop(files) {
    const req = request.post('/api/cloudinaryUpload');
    req.attach('problemImage', files[0]);
    req.then(result => {
      console.log(result);
      this.setState({
        dropzoneView: false,
        cloudinaryUrl: result.body.secure_url
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.closeModal();
    request
      .post('/api/problemUpload')
      .send({ name: this.state.name, description: this.state.description, image: this.state.cloudinaryUrl})
      .then(result => console.log(result));
  }

  render(){
    return(
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Create a Problem"
        >
          <div>
            <h2>Create a Problem</h2>
            <button style={{marginLeft: "90%"}} onClick={this.closeModal}>X</button>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text"
                    placeholder="Title of Your Problem"
                  />
                  <input
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}
                    type="text"
                    placeholder="Enter a Description of Your Problem"
                  />
                  <div>
                    {
                    this.state.dropzoneView ?
                    <div>
                      <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.handleDrop}
                        style={{border: "dashed"}}
                      >
                        <p>Drop an image or click a file to upload</p>
                      </Dropzone>
                    </div> : 
                    <div>
                      <p>File has been submitted. Thank you</p>
                    </div>
                    }
                  </div>
                  <button onClick={this.handleSubmit}>Submit your Problem</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateProblemModal;