import React from 'react'
import { Image } from 'react-bootstrap';

export default function CoverPhoto( {children} ) {
    return (
        <>
            <div className="imgBackground d-flex justify-content-center w-100">
                <div className="coverImgWrap col-4 col-md-2" >
                    <Image src="https://i.pinimg.com/564x/38/dc/ef/38dcefece911a1c610c7eefa7b2ada42.jpg" alt="Car Wallpaper" />
                </div>
                <div className="coverImgWrap col-4 col-md-2" >
                    <Image src="https://i.pinimg.com/564x/55/d3/c8/55d3c8baeb0bb5388899decb77c82114.jpg" alt="Car Wallpaper" />
                </div>
                <div className="coverImgWrap col-4 col-md-2" >
                    <Image src="https://i.pinimg.com/564x/39/f6/7a/39f67a7e5ede2e3c002884b89070aa5d.jpg" alt="Car Wallpaper" />
                </div>
                <div className="coverImgWrap col-2 d-none d-md-block" >
                    <Image src="https://i.pinimg.com/564x/ad/ce/66/adce66fdc0cd514302946ef300c3a727.jpg" alt="Car Wallpaper" />
                </div>
                <div className="coverImgWrap col-2 d-none d-md-block" >
                    <Image src="https://i.pinimg.com/564x/38/72/3a/38723a1b40c5912b4224e3378a0eef8b.jpg" alt="Car Wallpaper" />
                </div>
                <div className="coverImgWrap col-2 d-none d-md-block" >
                    <Image src="https://i.pinimg.com/564x/07/13/ec/0713ecbc760bdff55021678bf00e8012.jpg" alt="Car Wallpaper" />
                </div>
            </div>
            {children}
            <style jsx>{`
        .site-container{
          background-color: black;
          z-index: -1
        }

        .imgBackground{
          position: absolute;
          height: 90vh;
          z-index: 0;
          opacity: 0.6;
        }
        .coverImgWrap{
          position: relative;
          overflow: hidden;
          padding: 0;
          content: '';
        }

        .coverImgWrap img{
          width: auto;
          height: 100%;
          position: absolute;
          transition: transform 1s;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
    `}</style>
        </>
    )
}
