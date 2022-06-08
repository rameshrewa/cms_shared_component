import React, { Fragment, memo } from "react";

// components
import Carousel from "react-bootstrap/Carousel";

// utils
import parser from "html-react-parser";

// constants
const itemsKey = "data", idKey = "slide_id"/*, titleKey = "slide_title"*/, contentKey = "slide_content", srcKey = "media_url", altKey = "alt";

const HFNTab = ({
  data = null,
  classname = "",
  sliderclassname = "",
  contentclassname = "",
  controls = null,
  fade = null,
  indicatorlabels = [],
  indicators = null,
  interval = 5000,
  keyboard = null,
  nexticon = "",
  nextlabel = "",
  onSelect = null,
  onSlid = null,
  onSlide = null,
  pause = "",
  previcon = "",
  prevlabel = "",
  slide = null,
  touch = null,
  variant = null,
  wrap = true
}) => {

  return (
    <Fragment>
      {data?.[itemsKey]?.length ? (
        <Carousel
          className={classname || ""}
          controls={controls === false ? false : true}
          fade={fade === false ? false : true}
          indicatorLabels={Array.isArray(indicatorlabels) ? indicatorlabels : []}
          indicators={indicators === false ? false : true}
          interval={Number.isInteger(parseInt(interval)) ? interval : 5000}
          keyboard={keyboard === false ? false : true}
          nextIcon={nexticon ? parser(nexticon) : (<span aria-hidden="true" className="carousel-control-next-icon" />)}
          nextLabel={nextlabel || "Next"}
          onSelect={onSelect || null}
          onSlid={onSlid || null}
          onSlide={onSlide || null}
          pause={pause === false ? false : "hover"}
          prevIcon={previcon ? parser(previcon) : (<span aria-hidden="true" className="carousel-control-prev-icon" />)}
          prevLabel={prevlabel || "Previous"}
          slide={slide === false ? false : true}
          touch={touch === false ? false : true}
          variant={variant === "" ? "" : "dark"}
          wrap={wrap === false ? false : true}
        >
          {data[itemsKey].map((item, index) => (item?.[idKey] ? (
            <Carousel.Item key={item[idKey]} className={sliderclassname || ""} interval={item.interval || Number.isInteger(parseInt(interval)) ? interval : 5000} >
              <img className="d-block w-100" src={item[srcKey]} alt={item[altKey]} />
              {
                item.caption ? (
                  <Carousel.Caption className={contentclassname || ""} >
                    <div dangerouslySetInnerHTML={{ __html: item[contentKey] }}></div>
                  </Carousel.Caption>
                ) : null
              }
            </Carousel.Item>
          ) : (<Fragment key={index} />)
          ))}
        </Carousel>
      ) : null}
    </Fragment>
  );
};

export default memo(HFNTab);
