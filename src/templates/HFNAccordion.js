import React, { Fragment } from "react";

// components
import Accordion from "react-bootstrap/Accordion";

// constants
const itemsKey = "data", idKey = "panel_id", headerKey = "label", contentKey = "content", defaultActiveKey = "default", flushKey = "flush"/*, keepOpenKey = "keepOpen"*/;

const HFNAccordian = ({
  data = null,
  classname = "",
  accordianclassname = "",
  headerclassname = "",
  contentclassname = ""
}) => {
  
  return (
    <Fragment>
      {data?.[itemsKey]?.length ? (
        <Accordion className={classname} defaultActiveKey={data[defaultActiveKey]?.toString() ?? null} flush={data[flushKey] || false}/* alwaysOpen={data[keepOpenKey] || false}*/ >
          {data[itemsKey].map((item, index) => (item?.[idKey] ? (
            <Accordion.Item key={item[idKey]} className={accordianclassname} eventKey={item[idKey]?.toString()}>
              <Accordion.Header className={headerclassname}>
                <div dangerouslySetInnerHTML={{ __html: item[headerKey] || "" }} />
              </Accordion.Header>
              <Accordion.Body className={contentclassname}>
                <div dangerouslySetInnerHTML={{ __html: item[contentKey] || "" }} />
              </Accordion.Body>
            </Accordion.Item>
          ) : (<Fragment key={index} />)
          ))}
        </Accordion>
      ) : null}
    </Fragment>
  );
};

export default HFNAccordian;
