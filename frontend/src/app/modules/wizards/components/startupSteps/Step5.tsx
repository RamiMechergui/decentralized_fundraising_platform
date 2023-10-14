import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const Step5: FC = () => {
  return (
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
  )
}

export {Step5}
