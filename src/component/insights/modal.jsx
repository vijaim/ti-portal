import React from 'react'
import Modal from 'react-bootstrap/Modal'
import AddBusiness from '../shared-components/add-business'
// import CopyCode from '../shared-components/copy-code'

const ModalContent = (props) => {
  return (
    <Modal className="modal fade" show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="modal-content border-0 rounded-0">
        <div className="modal-body">
          <h2 className="fw-bold h4 mb-40 text-center" id="addBusinessModalLabel">Add your business</h2>
          <AddBusiness onClick={props.onClick} className="btn btn-primary d-block mt-20 w-100" buttonTitle="Continue" />
          {/* <CopyCode /> */}
        </div>
      </div>
    </Modal>
  )
}

export default ModalContent