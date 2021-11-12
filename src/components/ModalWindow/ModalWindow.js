import React from 'react';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';

const ModalWindow = (props) => {
  const { displayModal, setDisplayModal, confirmDataUpload } = props;
  return (
    <>
      <div className={`cover ${displayModal ? 'display' : 'hide'}`} />
      <div className="modal">
        <div className={`modal_wrap ${displayModal ? 'display' : 'hide'}`}>
          <div className="modal_icon">
            <i className="icon-exclamation" />
          </div>
          <div className="modal_text">
            <span>
              Stage 1 Upload Fee.
            </span>
            <span>
              This action cannot be undone once submitted.
            </span>
            <span>The Stage Upload Fee will be deducted from your NEAR account balance.</span>
          </div>
          <div className="modal_btn">
            <CustomBtn label="Back" handleClick={() => { setDisplayModal(false); }} customClass="modal_btn_item back" />
            <CustomBtn label="Confirm" handleClick={() => confirmDataUpload()} customClass="modal_btn_item confirm" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalWindow;
