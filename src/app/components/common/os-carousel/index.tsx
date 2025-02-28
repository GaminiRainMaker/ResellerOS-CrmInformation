/* eslint-disable react/no-unstable-nested-components */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { Carousel, CarouselProps } from '../antd/Carousel';

const CustomPrevArrow = ({ onClick }: any) => (
  <Button onClick={onClick} style={{ position: 'absolute', top: '50%', left: '0', zIndex: '1', color: 'black' }}>
    <LeftOutlined />
  </Button>
);

const CustomNextArrow = ({ onClick }: any) => (
  <Button onClick={onClick} style={{ position: 'absolute', top: '50%', right: '0', zIndex: '1', color: 'black' }}>
    <RightOutlined />
  </Button>
);

const OSCarousel: FC<CarouselProps> = () => (
  <Carousel prevArrow={<CustomPrevArrow />} nextArrow={<CustomNextArrow />} />
);

export default OSCarousel;
