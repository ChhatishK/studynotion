import React from 'react'
import IconBtn from './IconBtn'

const ConfirmModal = ({modalData}) => {
  return (
    <div>
        <div>
            <p>
                {modalData.text1}
            </p>
            <p>
                {modalData.text2}
            </p>

            <div>
                <IconBtn
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />

                <IconBtn
                    onClick={modalData?.btn2Handler}
                    text={modalData?.btn2Text}
                >

                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal