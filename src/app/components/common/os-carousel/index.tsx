/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {CarouselProps, Carousel} from '../antd/Carousel';

const SampleNextArrow = (props: any) => {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '15px',
        lineHeight: '1.5715',
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
};

const SamplePrevArrow = (props: any) => {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '15px',
        lineHeight: '1.5715',
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};

const OSCarousel: FC<CarouselProps> = (props) => (
  <>
    <SampleNextArrow />
    <Carousel />
    <SamplePrevArrow />
  </>
);

export default OSCarousel;
