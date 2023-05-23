import React from 'react'
import './style.css'
import {Carousel} from 'react-bootstrap';
import img_1 from '../../Source/Images/Slider/1.webp'
import img_2 from '../../Source/Images/Slider/2.jpg'
import img_3 from '../../Source/Images/Slider/3.jpeg'

const Slider = () => {
    return (
        <>
            <div className='row slider'>
                <Carousel
                 controls={true}
                 fade
                 data-aos="fade-zoom-in" data-aos-offset="100" data-aos-easing="ease-in-sine" data-aos-duration="300"
                 >
                    <Carousel.Item className='itemImg'>
                        <img
                            className="d-block w-100 simg"
                            src={img_3}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 simg"
                            src={img_1}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 simg"
                            src={img_2}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

        </>
    )
}

export default Slider