import React, { useState } from 'react';
// import { ReactSVG } from 'react-svg';
import icon1 from '../../../../assets/image/benefints/icon1.svg';
import icon2 from '../../../../assets/image/benefints/icon2.svg';
import icon3 from '../../../../assets/image/benefints/icon3.svg';
import icon4 from '../../../../assets/image/benefints/icon4.svg';
import icon5 from '../../../../assets/image/benefints/icon5.svg';
import icon6 from '../../../../assets/image/benefints/icon6.svg';
import icon7 from '../../../../assets/image/benefints/icon7.svg';
import icon8 from '../../../../assets/image/benefints/icon8.svg';
import icon9 from '../../../../assets/image/benefints/icon9.svg';
import icon10 from '../../../../assets/image/benefints/icon10.svg';
import icon11 from '../../../../assets/image/benefints/icon11.svg';
import icon12 from '../../../../assets/image/benefints/icon12.svg';
import icon13 from '../../../../assets/image/benefints/icon13.svg';
import icon14 from '../../../../assets/image/benefints/icon14.svg';
import icon15 from '../../../../assets/image/benefints/icon15.svg';
import icon16 from '../../../../assets/image/benefints/icon16.svg';
import icon17 from '../../../../assets/image/benefints/icon17.svg';

const arrImg = [{ src: icon1, active: false }, { src: icon2, active: false }, { src: icon3, active: false },
  { src: icon4, active: false }, { src: icon5, active: false }, { src: icon6, active: false }, {
    src: icon7,
    active: false,
  },
  { src: icon8, active: false }, { src: icon9, active: false }, { src: icon10, active: false }, {
    src: icon11,
    active: false,
  }, { src: icon12, active: false },
  { src: icon13, active: false }, { src: icon14, active: false }, { src: icon15, active: false }, {
    src: icon16,
    active: false,
  }, { src: icon17, active: false }];
const Benefits = ({ save }) => {
  const [images, setImages] = useState(arrImg);
  const toggleClick = (i, active) => {
    const newArray = images.map((el, index) => {
      if (index === i) el.active = !active;
      return el;
    });
    setImages(newArray);
    save({ benefits: newArray.filter((item) => item.active) });
  };
  return (
    <div className="wizard__icon-select">
      {images.length > 0 && images.map((el, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={el.src + index + 2}
          onClick={() => toggleClick(index, el.active)}
          className={`wizard__icon-item ${el.active ? 'active' : 'def'}`}
        >
          <img src={el.src} alt="img" />
        </div>
      ))}
    </div>
  );
};

export default Benefits;
