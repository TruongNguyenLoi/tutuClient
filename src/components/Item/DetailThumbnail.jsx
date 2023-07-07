import React from "react";

function DetailsThumbnail(props) {
    const { images, tab, myRef } = props;
    return (
      <div className="thumb u-img-fluid" ref={myRef}>
        {images.map((img, index) => (
          <img alt="" src={`${img}`} style={{ width: '64px', height: '64px', objectFit: 'cover' }} key={index} onClick={() => tab(index)} />
        ))}
      </div>
    );
}

export default DetailsThumbnail;
