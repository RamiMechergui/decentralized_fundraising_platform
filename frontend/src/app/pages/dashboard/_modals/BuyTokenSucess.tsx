import { useState } from 'react'
import React from 'react'
import {FC} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import {KTSVG} from '../../../../_metronic/helpers'

const BuyTokenSucess : FC = ({}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Token Sucessfully purchase </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-dark'>Your Are Done!</h2>
      </div>

      <div className='mb-0'>
        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTSVG
            path='/media/icons/duotune/general/gen044.svg'
            className='svg-icon-2tx svg-icon-warning me-4'
          />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'> Congratulations on completing the process! </h4>
              <div className='fs-6 text-gray-600'>
                We are delighted to inform you that your demand is completely filled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { BuyTokenSucess };